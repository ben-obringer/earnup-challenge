import { createUser, getUser } from "../../cache";

export default (req, res) => {
  const { username, phoneNumber } = req.query;

  console.log(getUser(phoneNumber));
  const user = getUser(phoneNumber) || createUser(phoneNumber, username);

  res.status(200).json(user);
};
