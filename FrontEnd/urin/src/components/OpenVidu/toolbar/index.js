/* eslint-disable */
import React, { Component } from "react";
// import "./index.css";

import { Grid, Tooltip, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import RateReviewIcon from "@mui/icons-material/RateReview";

const logo = require("../../../assets/images/openvidu_logo.png");

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <div id="toolBar">
        <div id="navSessionInfo">
          {this.props.sessionId && (
            <div id="titleContent">
              <span id="session-title">{mySessionId}</span>
            </div>
          )}
        </div>

        <div className="buttonsContent d-flex justify-content-center">
          <IconButton
            color="inherit"
            className="navButton"
            id="navMicButton"
            onClick={this.micStatusChanged}
          >
            {localUser !== undefined && localUser.isAudioActive() ? (
              <MicIcon />
            ) : (
              <MicOffIcon color="secondary" />
            )}
          </IconButton>

          <IconButton
            color="inherit"
            className="navButton"
            id="navCamButton"
            onClick={this.camStatusChanged}
          >
            {localUser !== undefined && localUser.isVideoActive() ? (
              <VideocamIcon />
            ) : (
              <VideocamOffIcon color="secondary" />
            )}
          </IconButton>

          <IconButton
            color="inherit"
            className="navButton"
            onClick={this.screenShare}
          >
            {localUser !== undefined && localUser.isScreenShareActive() ? (
              <PictureInPictureIcon />
            ) : (
              <ScreenShareIcon />
            )}
          </IconButton>

          {localUser !== undefined && localUser.isScreenShareActive() && (
            <IconButton onClick={this.stopScreenShare} id="navScreenButton">
              <StopScreenShareIcon color="secondary" />
            </IconButton>
          )}

          <IconButton
            color="secondary"
            className="navButton"
            onClick={this.leaveSession}
            id="navLeaveButton"
          >
            <PowerSettingsNewIcon />
          </IconButton>

          <IconButton color="inherit" id="navChatButton">
            {this.props.showNotification && <div id="point" className="" />}
            <Tooltip title="Feedback">
              <RateReviewIcon />
            </Tooltip>
          </IconButton>

          <IconButton color="inherit" id="navChatButton">
            {this.props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswerIcon />
            </Tooltip>
          </IconButton>
        </div>
      </div>
    );
  }
}
