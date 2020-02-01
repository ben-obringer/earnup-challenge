import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import { Avatar, Button, Form, Input, Layout, Tooltip, Comment } from "antd";
import moment from "moment";

const { Header, Content } = Layout;

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

class Chat extends React.Component {
  constructor() {
    super();

    this.state = {
      chatText: ""
    };
  }

  handleTextChange = e => {
    this.setState({ chatText: e.target.value });
  };

  handleSubmit = e => {
    const { chat, refetch, signedInUserId } = this.props;
    const { chatText } = this.state;
    e.preventDefault();
    const result = fetcher(
      `/api/chats${`?id=${chat.id}&sender=${signedInUserId}&message=${chatText}`}`
    );
    result.then(() => {
      this.setState({ chatText: "" });
      refetch();
    });
  };

  render() {
    const { chat } = this.props;
    const { chatText } = this.state;

    return (
      <>
        <Header style={{ background: "#fff", padding: 0 }}>
          {chat.otherUser.name}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {chat.messages.map((message, index) => (
            <Comment
              key={index}
              author={message.sender}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              content={<p>{message.message}</p>}
              datetime={
                <Tooltip
                  title={moment(message.timestamp).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  <span>{moment(message.timestamp).fromNow()}</span>
                </Tooltip>
              }
            />
          ))}

          <Form layout="inline" onSubmit={this.handleSubmit}>
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

Chat.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    otherUser: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  refetch: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string.isRequired
};

export default withRouter(Chat);
