"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config;
const secret = "somesecret1234";

const jwt_verify = async (authToken) => {
  try {
    const isValid = jwt.verify(authToken, secret);
    if (isValid) {
      return {
        passed: true,
        data: isValid,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      passed: false,
    };
  }
};

const jwt_sign = async (token) => {
  const payload = {
    token: token,
    expiresIn: "10800000",
  };
  return jwt.sign(payload, secret, { expiresIn: "10800000" });
};

module.exports = {
  jwt_verify,
  jwt_sign,
};
