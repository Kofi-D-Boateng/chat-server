"use strict";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

const jwt_verify = async (authToken) => {
  try {
    const isValid = jwt.verify(authToken, config.JWT_SECRET);
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
    expiresIn: config.EXPIRESIN,
  };
  return jwt.sign(payload, config.JWT_SECRET);
};

export { jwt_verify, jwt_sign };
