import React from "react";
import { Layout } from "antd";
import Chat from "../components/Chat";
import Chats from "../components/Chats";
import NewChat from "../components/NewChat";
import SignInForm from "../components/SignInForm";
import StartChatButton from "../components/StartChatButton";

const { Sider } = Layout;

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      chatId: null,
      signedInUserId: null,
      signedInUser: null,
      startChatButtonClicked: false
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  createUser = user => {
    const result = fetcher(
      `/api/createUser${`?phoneNumber=${user.phoneNumber}&username=${user.username}`}`
    );
    result.then(result2 =>
      this.setState({ signedInUser: result2, signedInUserId: user.phoneNumber })
    );
  };

  fetchUser = () => {
    const { signedInUserId } = this.state;
    if (signedInUserId) {
      const result = fetcher(`/api/users${`?id=${signedInUserId}`}`);
      result.then(result2 => this.setState({ signedInUser: result2 }));
    }
  };

  onChatClicked = chatId => {
    this.setState({ chatId, startChatButtonClicked: false });
  };

  onStartChatButtonClicked = () => {
    this.setState({ chatId: null, startChatButtonClicked: true });
  };

  onNewChatSubmitted = (chatId, updateduser) => {
    this.setState({
      chatId,
      signedInUser: updateduser,
      startChatButtonClicked: false
    });
  };

  render() {
    const {
      chatId,
      signedInUser,
      signedInUserId,
      startChatButtonClicked
    } = this.state;
    const chats = signedInUser ? signedInUser.chats : [];

    return !signedInUserId ? (
      <SignInForm onSubmit={this.createUser} />
    ) : (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          theme="light"
        >
          <StartChatButton onClick={this.onStartChatButtonClicked} />
          <Chats chats={chats} onChatClicked={this.onChatClicked} />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          {chatId && (
            <Chat
              chat={chats.find(chat => chat.id === chatId)}
              signedInUserId={signedInUserId}
              refetch={this.fetchUser}
            />
          )}
          {startChatButtonClicked && (
            <NewChat
              onSubmit={this.onNewChatSubmitted}
              signedInUserId={signedInUserId}
              refetch={this.fetchUser}
            />
          )}
        </Layout>
      </Layout>
    );
  }
}
