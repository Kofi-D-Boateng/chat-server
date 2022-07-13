"use strict";

import { addNewUser } from "../utils/mongo/query.js";

const createNewUser = async (req, res) => {
  const { username, email, password, dob } = req.body;
  if (
    username.trim().length <= 0 ||
    email.trim().length <= 0 ||
    password.trim().length <= 0 ||
    dob.trim().length <= 0
  ) {
    res.status(400);
  }
  const result = await addNewUser({
    email: email,
    dob: dob,
    password: password,
    username: username,
  });
  if (result.wasSuccessful) {
    res.status(200).json(result.msg);
  } else if (
    result.msg === "Email is taken" ||
    result.msg === "Username is taken"
  ) {
    res.status(401).json(result.msg);
  } else {
    res.status(400).json(result.msg);
  }
};

export default createNewUser;
