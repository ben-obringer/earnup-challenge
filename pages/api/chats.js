import { updateChat } from "../../cache";

export default (req, res) => {
  const { id, sender, message } = req.query;

  const chat = updateChat(id, sender, message);

  res.status(200).json(chat);
};
