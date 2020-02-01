import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Button, Form, Icon, Input, Layout } from "antd";

const { Header, Content } = Layout;

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

class NewChat extends React.Component {
  constructor() {
    super();

    this.state = {
      chatText: "",
      phoneNumber: ""
    };
  }

  handleTextChange = e => {
    this.setState({ chatText: e.target.value });
  };

  handlePhoneNumberChange = e => {
    this.setState({ phoneNumber: e.target.value });
  };

  handleSubmit = e => {
    const { onSubmit, signedInUserId } = this.props;
    const { chatText, phoneNumber } = this.state;
    e.preventDefault();
    const result = fetcher(
      `/api/createChat${`?sender=${signedInUserId}&message=${chatText}&receiver=${phoneNumber}`}`
    );
    result.then(result2 => {
      console.log(result2);
      this.setState({ chatText: "", phoneNumber: "" });
      onSubmit(result2.chatId, result2.updatedUser);
    });
  };

  render() {
    const { chatText } = this.state;
    return (
      <>
        <Header style={{ background: "#fff", padding: 0 }}>New</Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item>
              <Input
                onChange={this.handlePhoneNumberChange}
                prefix={
                  <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="tel"
              />
            </Form.Item>
            <Form.Item>
              <Input
                type="text"
                size="large"
                value={chatText}
                style={{ width: "65%", marginRight: "3%" }}
                onChange={this.handleTextChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </>
    );
  }
}

NewChat.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string.isRequired
};

export default withRouter(NewChat);
