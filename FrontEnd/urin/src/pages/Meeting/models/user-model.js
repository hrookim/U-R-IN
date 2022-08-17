/* eslint-disable */
class UserModel {
  id;
  connectionId;
  audioActive;
  videoActive;
  screenShareActive;
  nickname;
  streamManager;
  type; // 'remote' | 'local'

  constructor() {
    this.id = 0;
    this.nickname = "";
    this.type = "local";
    this.connectionId = "";
    this.videoActive = true;
    this.audioActive = true;
    this.screenShareActive = false;
    this.streamManager = null;
  }

  isAudioActive() {
    return this.audioActive;
  }

  isVideoActive() {
    return this.videoActive;
  }

  isScreenShareActive() {
    return this.screenShareActive;
  }

  getId() {
    return this.id;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getStreamManager() {
    return this.streamManager;
  }

  isLocal() {
    return this.type === "local";
  }

  isRemote() {
    return this.type !== "local";
  }

  setId(id) {
    this.id = id;
  }

  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive;
  }

  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }

  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive;
  }

  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  setType(type) {
    if (type === "local" || type === "remote") {
      this.type = type;
    }
  }
}

export default UserModel;
