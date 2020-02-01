import { createChat, getUser } from "../../cache";

export default (req, res) => {
  const { sender, receiver, message } = req.query;

  const newChatId = createChat(sender, receiver, message);

  const user = getUser(sender);

  res.status(200).json({ chatId: newChatId, updatedUser: user });
};
