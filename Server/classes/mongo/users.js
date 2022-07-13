"use strict";

export class User {
  constructor(key, username, email, password, createdAt, dob) {
    this.key = key;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.dob = dob;
  }
}

export const user = {
  key: 0,
  username: "",
  email: "",
  password: "",
  createdAt: "",
  dob: "",
};
