import { getUser } from "../../cache";

export default (req, res) => {
  const { id } = req.query;

  const user = getUser(id);
  res.status(200).json(user);
};
