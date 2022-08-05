/* eslint-disable */
import React, { Component } from "react";

export default class FeedbackComponent extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const styleFeedback = { display: this.props.feedbackDisplay };
    return <div style={styleFeedback}>feedback</div>;
  }
}
