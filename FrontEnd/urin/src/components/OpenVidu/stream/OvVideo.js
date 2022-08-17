/* eslint-disable */
import React, { Component } from "react";
import face from "./face";
import teachable from "./teachable";
import * as tmPose from "@teachablemachine/pose";

const URL = "https://teachablemachine.withgoogle.com/models/Rafr6YSIZ/";

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

  startDetection = async() => {
    const modelURL = `${URL}model.json`;
    const metadataURL = `${URL}metadata.json`;

    // eslint-disable-next-line no-undef
    const model = Object.freeze(await tmPose.load(modelURL, metadataURL));

    setInterval(async() => {
      await face(this.videoRef);
      // TODO : teachable machine의 모델을 불러오는 것을 mount 시점 혹은 setInterval 전에 불러서 1번만 불러온다
      // tmPose.load로 불러온 model은 파라미터로 전달
      await teachable(this.videoRef, model);
    }, 2000)
  };

  render() {
    return (
      <>
        <video
          autoPlay={true}
          id={"video-" + this.props.user.getStreamManager().stream.streamId}
          ref={this.videoRef}
          muted={this.props.mutedSound}
        />
        {this.props.isInterviewee ? (
          <button onClick={this.startDetection}>face</button>
        ) : null}
      </>
    );
  }
}
