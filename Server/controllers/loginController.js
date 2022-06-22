"use strict";
import { randomBytes } from "crypto";
import { getUser } from "../utils/query.js";
import { CONFIG } from "../config/config.js";

const _LoginUser = async (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username.trim().length == 0 ||
    password.trim().length == 0
  ) {
    res.status(401).json();
    return;
  }

  const foundUser = await getUser({ username: username, password: password });

  if (foundUser.username.trim().length <= 0) {
    res.status(401).json();
    return;
  }

  const token = randomBytes(12).toString(CONFIG.TOKEN_STRING_FORMAT);
  res
    .status(200)
    .json({ token: token, key: foundUser.key, username: foundUser.username });
};

export default _LoginUser;
