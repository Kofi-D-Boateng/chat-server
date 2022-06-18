"use strict";
const pool = require("../config/database");
const { jwt_sign } = require("../utils/jwt");
const crypto = require("crypto");
const { getLogin } = require("../utils/query");
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

  const token = crypto.randomBytes(12).toString("base64");
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

module.exports = {
  login,
};
