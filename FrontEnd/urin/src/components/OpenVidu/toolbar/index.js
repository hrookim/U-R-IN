/* eslint-disable */
import React, { Component } from "react";
import "./index.css";

import { IconButton, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import CancelIcon from "@mui/icons-material/Cancel";
export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
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
    const { localUser, intervieweeId } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          className="navButton"
          onClick={this.micStatusChanged}
          sx={{
            width: "120px",
            borderRadius: "30px",
            color: "black",
            borderColor: "rgba(0,0,0,0.3)",
            margin: "5px",

            "&:hover": {
              width: "120px",
              borderRadius: "30px",
              color: "black",
              borderColor: "rgba(0,0,0,0.3)",
              backgroundColor: "rgba(0,0,0,0.04)",
              margin: "5px",
            },
          }}
        >
          {localUser !== undefined && localUser.isAudioActive() ? (
            <MicIcon />
          ) : (
            <MicOffIcon sx={{ color: "red" }} />
          )}
          <span className="font-40 font-sm" style={{ marginLeft: "10px" }}>
            마이크
          </span>
        </Button>

        {localUser !== undefined && localUser.isVideoActive() ? (
          <Button
            variant="outlined"
            className="navButton"
            onClick={this.camStatusChanged}
            sx={{
              width: "120px",
              borderRadius: "30px",
              color: "black",
              borderColor: "rgba(0,0,0,0.3)",
              margin: "5px",

              "&:hover": {
                width: "120px",
                borderRadius: "30px",
                color: "black",
                borderColor: "rgba(0,0,0,0.3)",
                backgroundColor: "rgba(0,0,0,0.04)",
                margin: "5px",
              },
            }}
          >
            <VideocamIcon />
            <span className="font-40 font-sm" style={{ marginLeft: "10px" }}>
              비디오
            </span>
          </Button>
        ) : (
          <Button
            variant="outlined"
            className="navButton"
            onClick={this.camStatusChanged}
            sx={{
              width: "120px",
              borderRadius: "30px",
              color: "black",
              borderColor: "rgba(0,0,0,0.3)",
              margin: "5px",
              "&:hover": {
                width: "120px",
                borderRadius: "30px",
                color: "black",
                borderColor: "rgba(0,0,0,0.3)",
                backgroundColor: "rgba(0,0,0,0.04)",
                margin: "5px",
              },
            }}
          >
            <VideocamOffIcon sx={{ color: "red" }} />
            <span className="font-40 font-sm" style={{ marginLeft: "10px" }}>
              비디오
            </span>
          </Button>
        )}

        {!intervieweeId ? (
          localUser !== undefined && localUser.isScreenShareActive() ? (
            <>
              <Button
                variant="outlined"
                className="navButton"
                onClick={this.screenShare}
                sx={{
                  width: "130px",
                  borderRadius: "30px",
                  color: "black",
                  borderColor: "rgba(0,0,0,0.3)",
                  margin: "5px",
                  "&:hover": {
                    width: "130px",
                    borderRadius: "30px",
                    color: "black",
                    borderColor: "rgba(0,0,0,0.3)",
                    backgroundColor: "rgba(0,0,0,0.04)",
                    margin: "5px",
                  },
                }}
              >
                <PictureInPictureIcon />
                <span
                  className="font-40 font-sm"
                  style={{ marginLeft: "10px" }}
                >
                  화면 변경
                </span>
              </Button>

              <Button
                variant="outlined"
                className="navButton"
                onClick={this.stopScreenShare}
                sx={{
                  width: "100px",
                  borderRadius: "30px",
                  color: "black",
                  borderColor: "rgba(0,0,0,0.3)",
                  margin: "5px",

                  "&:hover": {
                    width: "100px",
                    borderRadius: "30px",
                    color: "black",
                    borderColor: "rgba(0,0,0,0.3)",
                    backgroundColor: "rgba(0,0,0,0.04)",
                    margin: "5px",
                  },
                }}
              >
                <StopScreenShareIcon sx={{ color: "red" }} />
                <span
                  className="font-40 font-sm"
                  style={{ marginLeft: "10px" }}
                >
                  중지
                </span>
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              className="navButton"
              onClick={this.screenShare}
              sx={{
                width: "100px",
                borderRadius: "30px",
                color: "black",
                borderColor: "rgba(0,0,0,0.3)",
                margin: "5px",

                "&:hover": {
                  width: "100px",
                  borderRadius: "30px",
                  color: "black",
                  borderColor: "rgba(0,0,0,0.3)",
                  backgroundColor: "rgba(0,0,0,0.04)",
                  margin: "5px",
                },
              }}
            >
              <ScreenShareIcon />
              <span className="font-40 font-sm" style={{ marginLeft: "10px" }}>
                공유
              </span>
            </Button>
          )
        ) : null}

        <IconButton onClick={this.leaveSession} sx={{ color: "red" }}>
          <CancelIcon fontSize="large" />
        </IconButton>
      </div>
    );
  }
}
