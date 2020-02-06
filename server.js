import express from "express";
import next from "next";

import { createChat, createUser, getUser, updateChat } from "./cache";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/chats", (req, res) => {
    const { id, sender, message } = req.query;

    const chat = updateChat(id, sender, message);

    res.status(200).json(chat);
  });

  server.get("/api/createChat", (req, res) => {
    const { sender, receiver, message } = req.query;

    const newChatId = createChat(sender, receiver, message);

    const user = getUser(sender);

    res.status(200).json({ chatId: newChatId, updatedUser: user });
  });

  server.get("/api/createUser", (req, res) => {
    const { username, phoneNumber } = req.query;

    const user = getUser(phoneNumber) || createUser(phoneNumber, username);

    res.status(200).json(user);
  });

  server.get("/api/users", (req, res) => {
    const { id } = req.query;

    const user = getUser(id);
    res.status(200).json(user);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
