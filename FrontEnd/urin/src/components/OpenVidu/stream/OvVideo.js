/* eslint-disable */
import React, { Component } from "react";
import * as faceapi from "face-api.js";
// import "./index.css";

const MODEL_URL = "/models";

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log("PROPS: ", this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        "signal:userChanged",
        (event) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        }
      );
    }
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  // AI 관련 함수
  // video는 this.videoRef.current
  startExpressDetection = () => {
    this.run(this.videoRef);
  };

  async run(videoRef) {
    console.log(videoRef);
    await faceapi.nets.ssdMobilenetv1.load(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.load(MODEL_URL);
    await faceapi.nets.faceExpressionNet.load(MODEL_URL);
    await faceapi.nets.tinyFaceDetector.load(MODEL_URL);

    const result = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    console.log(result);
  }

  render() {
    return (
      <>
        <video
          autoPlay={true}
          id={"video-" + this.props.user.getStreamManager().stream.streamId}
          ref={this.videoRef}
          muted={this.props.mutedSound}
        />
        <button onClick={this.startExpressDetection}>face</button>
      </>
    );
  }
}
