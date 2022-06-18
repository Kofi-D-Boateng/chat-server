"use strict";
import { jwt_sign } from "../utils/jwt.js";
import { randomBytes } from "crypto";
import { getLogin } from "../utils/query.js";

const login = async (req, res) => {
  const { email, password } = req.body.user;

  if (email.trim().length == 0 || password.trim().length == 0) {
    res.json({ status: 204 });
    return;
  }

  const callData = await getLogin({ email: email, password: password });

  if (callData === null) {
    res.json({
      status: 401,
    });
    return;
  }

  const token = randomBytes(12).toString("base64");
  const signedToken = await jwt_sign(token);
  const expiresIn = 10800;
  res.json({
    status: 200,
    token: signedToken,
    expiresIn: expiresIn,
    user_first: callData.userFirst,
    user_last: callData.userLast,
    doc_first: callData.docFirst,
    doc_last: callData.docLast,
    doc_title: callData.docTitle,
    injury: callData.injury,
    appt_time: callData.apptTime,
    room: callData.roomID,
  });
};

export default login;
