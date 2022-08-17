/* eslint-disable */
import React, { Component } from "react";
import OvVideoComponent from "./OvVideo";
import "./index.css";

import { IconButton } from "@mui/material";

import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mutedSound: false,
    };
    this.toggleSound = this.toggleSound.bind(this);
    this.interviewingChanged = this.interviewingChanged.bind(this);
  }

  interviewingChanged(current) {
    this.props.interviewingChanged(current);
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  render() {
    const { mutedSound } = this.state;
    const {
      user,
      localUser,
      meetingId,
      intervieweeId,
      isInterviewing,
      isSomeoneShareScreen,
    } = this.props;
    const { id, nickname } = user;
    const isInterviewee = intervieweeId === id;
    let layout = "col-4";
    if (!isSomeoneShareScreen && !intervieweeId) {
      layout = "col-6";
    }
    if (isSomeoneShareScreen && user.screenShareActive) {
      layout = "order-first";
    }
    if (!!intervieweeId && isInterviewee) {
      layout = "order-first";
    }

    return (
      <div className={"video-container p-1 " + layout}>
        <div className="video-wrapper" style={{ display: "grid" }}>
          <div className="nickname">
            <span id="nickname">{nickname}</span>
          </div>

          {isInterviewee && (
            <div className="upper-right d-flex align-items-center">
              <button
                className="interview-button btn btn-sm btn-light fw-semibold rounded-pill px-3 mx-2"
                onClick={() => {
                  this.interviewingChanged(isInterviewing);
                }}
                disabled={localUser.id !== intervieweeId}
              >
                {isInterviewing ? "면접종료" : "면접시작"}
              </button>
              {/* TODO: 타이머 */}
              <span className="timer mx-2">타이머</span>
            </div>
          )}

          {user !== undefined && user.getStreamManager() !== undefined ? (
            <>
              <OvVideoComponent
                user={user}
                localUser={localUser}
                meetingId={meetingId}
                isInterviewee={isInterviewee}
                intervieweeId={intervieweeId}
                isInterviewing={isInterviewing}
                mutedSound={mutedSound}
              />

              <div>
                {!user.isLocal() && (
                  <IconButton id="volumeButton" onClick={this.toggleSound}>
                    {mutedSound ? (
                      <VolumeOffIcon color="secondary" />
                    ) : (
                      <VolumeUpIcon />
                    )}
                  </IconButton>
                )}
              </div>

              <div id="statusIcons">
                {!user.isVideoActive() ? (
                  <div id="camIcon">
                    <VideocamOffIcon id="statusCam" />
                  </div>
                ) : null}

                {!user.isAudioActive() ? (
                  <div id="micIcon">
                    <MicOffIcon id="statusMic" />
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
