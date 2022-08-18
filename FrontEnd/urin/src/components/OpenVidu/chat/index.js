/* eslint-disable */
import React, { Component } from "react";
import "./index.css";

import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
          createdAt: data.createdAt,
        });

        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log(this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const now = new Date();
        let nowMinute = now.getMinutes();
        let nowHour = now.getHours();
        let createdAt;
        if (nowMinute < 10) {
          nowMinute = `0${nowMinute}`;
        }
        if (nowHour >= 12) {
          if (nowHour > 12) {
            nowHour -= 12;
          }
          createdAt = `오후 ${nowHour}:${nowMinute}`;
        } else {
          createdAt = `오전 ${nowHour}:${nowMinute}`;
        }

        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
          createdAt: createdAt,
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  render() {
    return (
      <div id="chatComponent">
        <div className="font-md font-70 cc-title">채팅</div>
        <div className="message-wrap" ref={this.chatScroll}>
          {this.state.messageList.map((data, i) => (
            <div
              key={i}
              id="remoteUsers"
              className={
                "message" +
                (data.connectionId !== this.props.user.getConnectionId()
                  ? " left"
                  : " right")
              }
            >
              <div className="msg-detail">
                <div className="msg-info">
                  <p className="font-xs font-50"> {data.nickname}</p>
                </div>
                <div className="msg-content">
                  <p className="text font-xs font-30">{data.message}</p>
                  <span className="font-xxs font-30">{data.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="messageInput">
          <input
            placeholder="메시지를 입력하세요."
            id="chatInput"
            className="font-xs font-30"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyPress={this.handlePressKey}
          />
          <IconButton size="small" id="sendButton" onClick={this.sendMessage}>
            <SendIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  }
}
