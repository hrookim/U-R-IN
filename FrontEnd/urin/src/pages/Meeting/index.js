/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

import UserModel from "./models/user-model";
import ChatComponent from "../../components/OpenVidu/chat";
import DialogExtensionComponent from "../../components/OpenVidu/dialog-extension";
import FeedbackComponent from "../../components/OpenVidu/feedback";
import StreamComponent from "../../components/OpenVidu/stream";
import ToolbarComponent from "../../components/OpenVidu/toolbar";

// import "./index.css";
import Dropdown from "react-bootstrap/Dropdown";

var localUser = new UserModel();

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.REACT_APP_BACK_BASE_URL = process.env.REACT_APP_BACK_BASE_URL;
    this.OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL;
    this.OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET;
    this.hasBeenUpdated = false;
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      title: this.props.study.title,
      myuserId: this.props.member.id,
      // myuserId: Math.floor(Math.random() * 100),
      myNickname: this.props.member.nickname,
      studyId: Number(this.props.params.studyId),
      isLeader: false,
      sessionId: "sessionA",
      meetingId: undefined,
      //
      session: undefined,
      localUser: undefined,
      subscribers: [],
      feedbackDisplay: "none",
      currentVideoDevice: undefined,
      intervieweeId: 0,
      intervieweeNickname: "",
      isInterviewing: false,
      isSomeoneShareScreen: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleFeedback = this.toggleFeedback.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.interviewModeChanged = this.interviewModeChanged.bind(this);
  }

  // 마운트 관련 행동
  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    this.leaveSession();
  }

  onbeforeunload(event) {
    event.preventDefault();
    this.leaveSession();
  }

  // Method 리스트
  joinSession() {
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
      }
    );
  }

  connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            "There was an error getting the token:",
            error.code,
            error.message
          );
          alert("There was an error getting the token:", error.message);
        });
    }
  }

  connect(token) {
    this.state.session
      .connect(token, {
        id: this.state.myuserId,
        nickname: this.state.myNickname,
      })
      .then(() => {
        this.connectWebCam();
        this.subscribeToInterviewModeChanged();
        this.subscribeToInterviewingChanged();
        this.subscribeToUserChanged();
        this.subscribeToStreamDestroyed();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x360",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setId(this.state.myuserId);
    localUser.setNickname(this.state.myNickname);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    // this.sendSignalUserChanged({
    //   isScreenShareActive: localUser.isScreenShareActive(),
    // });

    this.setState({
      currentVideoDevice: videoDevices[0],
      localUser: localUser,
    });
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            id: this.state.localUser.getId(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    if (this.state.isLeader) {
      this.state.subscribers.map((sub) => {
        mySession.forceDisconnect(sub.streamManager.stream.connection);
      });
    }
    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      sessionId: "sessionA",
      myuserId: 0,
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
    this.endMeeting();
  }

  // 면접모드 전환
  // 면접모드: {intervieweeId: userId}
  // 일반모드: {intervieweeId: 0}
  interviewModeChanged(intervieweeId, intervieweeNickname) {
    console.log("interviewee: ", intervieweeNickname);
    if (intervieweeId === 0) {
      this.toggleFeedback("none");
    } else {
      this.toggleFeedback("block");
    }
    this.setState({
      intervieweeId: intervieweeId,
      intervieweeNickname: intervieweeNickname,
    });
    this.sendSignalinterviewModeChanged({
      intervieweeId: intervieweeId,
      intervieweeNickname: intervieweeNickname,
    });
  }

  interviewingChanged(current) {
    this.setState({ isInterviewing: !current });
    console.log("isInterviewing: ", !current);
    this.sendSignalinterviewingChanged({ isInterviewing: !current });
  }

  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const data = event.stream.connection.data.split("%")[0];
      newUser.setId(JSON.parse(data).id);
      newUser.setNickname(JSON.parse(data).nickname);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
    });
  }

  subscribeToInterviewModeChanged() {
    this.state.session.on("signal:interviewModeChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", data);
          this.setState(data);
          if (data.intervieweeId === 0) {
            this.toggleFeedback("none");
          } else {
            this.toggleFeedback("block");
          }
        }
      });
    });
  }

  subscribeToInterviewingChanged() {
    this.state.session.on("signal:interviewingChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", data);
          this.setState(data);
        }
      });
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.id !== undefined) {
            user.setId(data.id);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            // TODO: 화면공유 한명만 가능하게
            user.setScreenShareActive(data.isScreenShareActive);
            this.checkSomeoneShareScreen();
          }
        }
      });
      this.setState({
        subscribers: remoteUsers,
      });
    });
  }

  sendSignalinterviewModeChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "interviewModeChanged",
    };
    this.state.session.signal(signalOptions);
  }

  sendSignalinterviewingChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "interviewingChanged",
    };
    this.state.session.signal(signalOptions);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  screenShare() {
    if (!this.state.intervieweeId) {
      const videoSource =
        navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
      const publisher = this.OV.initPublisher(
        undefined,
        {
          videoSource: videoSource,
          publishAudio: localUser.isAudioActive(),
          publishVideo: localUser.isVideoActive(),
          mirror: false,
        },
        (error) => {
          if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
            this.setState({ showExtensionDialog: true });
          } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
            alert("Your browser does not support screen sharing");
          } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
            alert("You need to enable screen sharing extension");
          } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
            alert("You need to choose a window or application to share");
          }
        }
      );

      publisher.once("accessAllowed", () => {
        this.state.session.unpublish(localUser.getStreamManager());
        localUser.setStreamManager(publisher);
        this.state.session.publish(localUser.getStreamManager()).then(() => {
          localUser.setScreenShareActive(true);
          this.setState({ localUser: localUser }, () => {
            this.sendSignalUserChanged({
              isScreenShareActive: localUser.isScreenShareActive(),
            });
          });
        });
      });
    }
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    // return true if at least one passes the test
    const isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    this.setState({ isSomeoneShareScreen: isScreenShared });
    // const openviduLayoutOptions = {
    //   maxRatio: 3 / 2,
    //   minRatio: 9 / 16,
    //   fixedRatio: isScreenShared,
    //   bigClass: "OV_big",
    //   bigPercentage: 0.8,
    //   bigFixedRatio: false,
    //   bigMaxRatio: 3 / 2,
    //   bigMinRatio: 9 / 16,
    //   bigFirst: true,
    //   animate: true,
    // };
    // this.layout.setLayoutOptions(openviduLayoutOptions);
  }

  toggleFeedback(property) {
    let displayF = property;

    if (displayF === undefined) {
      displayF = this.state.feedbackDisplay === "none" ? "block" : "none";
    }
    if (displayF === "block") {
      this.setState({ feedbackDisplay: displayF });
    } else if (displayF === "none") {
      this.setState({ feedbackDisplay: displayF });
    } else {
      console.log("feedback", displayF);
      this.setState({ feedbackDisplay: displayF });
    }
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }

  render() {
    const {
      myuserId,
      myNickname,
      meetingId,
      localUser,
      subscribers,
      intervieweeId,
      intervieweeNickname,
      isInterviewing,
      isSomeoneShareScreen,
      feedbackDisplay,
      messageReceived,
      showExtensionDialog,
      title,
    } = this.state;

    return (
      <>
        <div
          className="container-fluid p-3"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div className="row" style={{ height: "100%", width: "100%" }}>
            {/* 왼쪽 영역 */}
            <div className="col-9" style={{ height: "100%" }}>
              {/* 면접 모드바 */}
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "10%" }}
              >
                {/* 버튼1: 면접모드 일반모드 전환 */}
                <Dropdown style={{ marginRight: "5px" }}>
                  <Dropdown.Toggle id="dropdown-basic">
                    {!!intervieweeId ? "면접모드" : "일반모드"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ minWidth: "100%" }}>
                    <Dropdown.Item
                      as="button"
                      onClick={() => {
                        !!intervieweeId
                          ? this.interviewModeChanged(0, "")
                          : this.interviewModeChanged(myuserId, myNickname);
                      }}
                    >
                      {!!intervieweeId ? "일반모드" : "면접모드"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* 버튼2: 지원자 전환 */}
                {!!intervieweeId && (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        color: "black",
                        borderColor: "white",
                        backgroundColor: "white",
                      }}
                    >
                      지원자: {intervieweeNickname}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ minWidth: "100%" }}>
                      {localUser !== undefined &&
                        localUser.getStreamManager() !== undefined &&
                        [localUser, ...subscribers]
                          .filter((user) => {
                            return user.id !== intervieweeId;
                          })
                          .map((user, i) => (
                            <Dropdown.Item
                              as="button"
                              key={i}
                              onClick={() =>
                                this.interviewModeChanged(
                                  user.id,
                                  user.nickname
                                )
                              }
                            >
                              {user.nickname}
                            </Dropdown.Item>
                          ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>

              {/* 비디오 영역 */}
              <div
                className="row mx-auto justify-content-center align-items-center"
                style={Object.assign(
                  {},
                  {
                    height: "80%",
                    maxWidth: "100%",
                  },
                  isSomeoneShareScreen || !!intervieweeId
                    ? { aspectRatio: "16/12" }
                    : { aspectRatio: "16/9" }
                )}
              >
                {localUser !== undefined &&
                  localUser.getStreamManager() !== undefined &&
                  [localUser, ...subscribers].map((user, i) => (
                    <StreamComponent
                      key={i}
                      user={user}
                      intervieweeId={intervieweeId}
                      isInterviewing={isInterviewing}
                      isSomeoneShareScreen={isSomeoneShareScreen}
                      streamId={user.streamManager.stream.streamId}
                      interviewingChanged={(current) => {
                        this.interviewingChanged(current);
                      }}
                    />
                  ))}
              </div>

              {/* 툴바 영역 */}
              <div
                className="toolBar d-flex justify-content-center align-items-center"
                style={{ height: "10%" }}
              >
                <ToolbarComponent
                  localUser={localUser}
                  intervieweeId={intervieweeId}
                  showNotification={messageReceived}
                  camStatusChanged={this.camStatusChanged}
                  micStatusChanged={this.micStatusChanged}
                  screenShare={this.screenShare}
                  stopScreenShare={this.stopScreenShare}
                  leaveSession={this.leaveSession}
                />
              </div>
            </div>

            {/* 오른쪽 영역 */}
            <div className="col-3" style={{ height: "100%" }}>
              {/* 피드백 영역 */}
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div style={!!intervieweeId ? { height: "50%" } : {}}>
                    <FeedbackComponent
                      meetingId={meetingId}
                      localUser={localUser}
                      isInterviewing={isInterviewing}
                      intervieweeId={intervieweeId}
                      intervieweeNickname={intervieweeNickname}
                      feedbackDisplay={feedbackDisplay}
                    />
                  </div>
                )}

              {/* 채팅창 영역 */}
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div
                    className="OT_root OT_publisher"
                    style={
                      !!intervieweeId ? { height: "50%" } : { height: "100%" }
                    }
                  >
                    <ChatComponent
                      user={localUser}
                      messageReceived={this.checkNotification}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        <DialogExtensionComponent
          showDialog={showExtensionDialog}
          cancelClicked={this.closeDialogExtension}
        />
      </>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.getSessionId(this.state.studyId)
      .then((sessionId) => this.createSession(sessionId))
      .then((sessionId) => this.createToken(sessionId))
      .then((token) => this.createMeeting(token));

    // Back에 요청 X
    // return this.createSession(this.state.sessionId).then((sessionId) =>
    //   this.createToken(sessionId)
    // );
  }

  getSessionId(studyId) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.REACT_APP_BACK_BASE_URL + `studies/${studyId}/meeting`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          this.setState(response.data);
          resolve(response.data.sessionId);
        })
        .catch((error) => {
          console.error(error);
          // 1. 토큰 만료된 경우
          window.close();
          // 2. 스터디원이 아닌 사람이 URL을 치고 들어온 경우
          location.replace(location.origin);
        });
    });
  }

  createMeeting(token) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          this.REACT_APP_BACK_BASE_URL +
            `studies/${this.state.studyId}/meeting`,
          { isConnected: true, sessionId: this.state.sessionId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response) => {
          this.setState(response.data);
          resolve(token);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  endMeeting() {
    return new Promise((resolve, reject) => {
      axios
        .put(
          this.REACT_APP_BACK_BASE_URL +
            `studies/${this.state.studyId}/meeting/${this.state.meetingId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(() => {})
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setTimeout(function () {
            window.close();
          }, 1000);
        });
    });
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                this.OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify(
        this.state.isLeader ? { role: "MODERATOR" } : {}
      );
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

// redux store => props로 전달
const mapStateToProps = (state) => ({
  member: state.member,
  study: state.study,
});

// redux store => dispatch 할 함수들 위치
const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Meeting));
