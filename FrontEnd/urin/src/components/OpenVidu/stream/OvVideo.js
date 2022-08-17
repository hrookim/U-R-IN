/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import face from "./face";
import teachable from "./teachable";
import * as tmPose from "@teachablemachine/pose";

const URL = "https://teachablemachine.withgoogle.com/models/J2X70C2So/";

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.REACT_APP_BACK_BASE_URL = process.env.REACT_APP_BACK_BASE_URL;
    this.videoRef = React.createRef();
    this.state = {
      isDetectioning: false,
      face: [],
      pose: [],
    };
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

  componentDidUpdate(prevProps) {
    if (this.props.isInterviewing !== prevProps.isInterviewing) {
      if (this.props.isInterviewing === true) {
        this.startDetection();
      } else {
        this.stopDetection();
      }
    }
  }

  startDetection = async () => {
    console.log("this.props", this.props);
    if (
      (this.props.intervieweeId === this.props.user.id) ===
      this.props.localUser.id
    ) {
      console.log("감지시작");
      const modelURL = `${URL}model.json`;
      const metadataURL = `${URL}metadata.json`;

      const model = Object.freeze(await tmPose.load(modelURL, metadataURL));
      this.state.isDetectioning = true;

      setInterval(async () => {
        if (this.state.isDetectioning) {
          const faceResult = await face(this.videoRef);
          const tmResult = await teachable(this.videoRef, model);
          if (faceResult !== null) {
            this.state.face.push(faceResult);
          }
          this.state.pose.push(tmResult);
        }
      }, 1000);
    }
  };

  stopDetection = () => {
    this.state.isDetectioning = false;
    if (
      (this.props.intervieweeId === this.props.user.id) ===
      this.props.localUser.id
    ) {
      console.log("저장된 faceAPI 결과:", this.state.face);
      console.log("저장된 TM 결과:", this.state.pose);

      const { meetingId } = this.props;
      axios
        .put(
          `${this.REACT_APP_BACK_BASE_URL}meeting/${meetingId}/analysis`,
          {
            faceDataList: this.state.face,
            poseDataList: this.state.pose,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(() => {})
        .catch((err) => {
          alert("서버에 데이터를 전달하지 못했습니다.");
          console.log(err);
        });
    }
    this.state.face = [];
    this.state.pose = [];
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
      </>
    );
  }
}
