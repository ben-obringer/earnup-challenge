import moment from "moment";
import NodeCache from "node-cache";

const users = new NodeCache();
const chats = new NodeCache();

function addChatToUser(id, chatId) {
  const user = users.get(id);
  user.chats.push(chatId);
  users.set(id, user);
  console.log("addChatToUser", id, users.get(id));
  return users.get(id);
}

export function getChats(userId, chatIds) {
  return chatIds.map(id => {
    const chat = chats.get(id);
    chat.otherUser = users.get(
      userId === chat.user1Id ? chat.user2Id : chat.user1Id
    );
    return chat;
  });
}

export function getUser(userId) {
  if (!users.has(userId)) {
    return null;
  }

  const user = users.get(userId);
  user.chats = getChats(user.id, user.chats);
  return user;
}

export function createUser(phoneNumber, name) {
  users.set(phoneNumber, { id: phoneNumber, name, chats: [] });
  console.log("createUser", users.get(phoneNumber));
  return users.get(phoneNumber);
}

export function createChat(sender, receiver, message) {
  const key = chats.getStats().keys + 1;
  console.log("key", key);
  chats.set(key, {
    id: key,
    user1Id: sender,
    user2Id: receiver,
    messages: [
      {
        sender,
        receiver,
        timestamp: moment.now(),
        message
      }
    ]
  });
  addChatToUser(sender, key);
  createUser(receiver, "");
  addChatToUser(receiver, key);
  return key;
}

export function updateChat(id, sender, message) {
  console.log("updateChat", "id", id);
  const chat = chats.get(id);
  console.log("updateChat", "chat", chat);
  chat.messages.push({
    sender,
    message,
    timestamp: moment.now()
  });
  chats.set(id, chat);
  return chats.get(id);
}
