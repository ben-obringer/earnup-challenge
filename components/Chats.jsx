import React from "react";
import PropTypes from "prop-types";
import { Avatar, List } from "antd";

export default function Chats({ chats, onChatClicked }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={chats}
      renderItem={chat => {
        const newestMessageIndex = chat.messages.length - 1;
        const newestMessage = chat.messages[newestMessageIndex];
        const fromOtherUser = newestMessage.sender === chat.otherUser.id;
        const description = fromOtherUser
          ? newestMessage.message
          : `You: ${newestMessage.message}`;
        return (
          <List.Item onClick={() => onChatClicked(chat.id)}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{chat.otherUser.name}</a>}
              description={description}
            />
          </List.Item>
        );
      }}
    />
  );
}

Chats.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChatClicked: PropTypes.func.isRequired
};
