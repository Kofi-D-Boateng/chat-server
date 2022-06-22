"use strict";
import jwt from "jsonwebtoken";
import { CONFIG } from "../config/config.js";

const jwt_verify = async (authToken) => {
  try {
    const isValid = jwt.verify(authToken, CONFIG.JWT_SECRET);
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
  return jwt.sign(payload, CONFIG.JWT_SECRET);
};

export { jwt_verify, jwt_sign };
