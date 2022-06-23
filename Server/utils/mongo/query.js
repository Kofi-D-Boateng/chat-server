"use strict";
import bcrypt from "bcrypt";
import { dbConnection } from "../../config/database/mongodb.js";
import { CONFIG } from "../../config/config.js";
import { MongoInvalidArgumentError } from "mongodb";
import { user } from "../../structs/mongo/users.js";

const getUser = async ({ username: username, password: password }) => {
  try {
    const userRef = user;
    await dbConnection.connect();
    console.log("Connected to db....");
    const GETDB = dbConnection.db(CONFIG.MONGO_DB_NAME);
    if (!GETDB.databaseName === CONFIG.MONGO_DB_NAME) {
      throw new Error(MongoInvalidArgumentError);
    }
    const USER = GETDB.collection(CONFIG.USERS_COLLECTION);

    if (USER.collectionName !== CONFIG.USERS_COLLECTION) {
      throw new Error(MongoInvalidArgumentError);
    }

    const SEARCH = await USER.findOne({ username: username });
    if (!SEARCH) {
      return user;
    }

    userRef.key = SEARCH.key;
    userRef.password = SEARCH.password;
    userRef.username = SEARCH.username;

    const PWCHECK = await bcrypt.compare(password, user.password);

    if (PWCHECK) {
      return userRef;
    }
  } catch (error) {
    console.log(error);
    return user;
  }
};

const addNewUser = async ({
  email: email,
  username: username,
  password: password,
  dob: dob,
}) => {
  try {
    console.log(user);
    let userRef = user;
    await dbConnection.connect();
    console.log("Connected to db....");
    const GETDB = dbConnection.db(CONFIG.MONGO_DB_NAME);
    if (!GETDB.databaseName === CONFIG.MONGO_DB_NAME) {
      throw new Error(MongoInvalidArgumentError);
    }
    const USER = GETDB.collection(CONFIG.USERS_COLLECTION);
    const length = await USER.countDocuments();

    if (USER.collectionName !== CONFIG.USERS_COLLECTION) {
      throw new Error(MongoInvalidArgumentError);
    }
    const SEARCH = await USER.find({
      $or: [{ email: email }, { username: username }],
    }).toArray();

    if (SEARCH.length > 0) {
      SEARCH.forEach((s) => {
        if (s.username === username) {
          throw new Error("Username is taken.");
        }
        if (s.email === email) {
          throw new Error("Email is taken.");
        }
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      CONFIG.PASSWORD_SALT_ROUNDS
    );
    userRef.key = length;
    userRef.username = username;
    userRef.email = email;
    userRef.password = hashedPassword;
    userRef.createdAt = new Date().toISOString();
    userRef.dob = dob;
    await USER.insertOne(userRef).catch(() => {
      throw new Error(`Failed to insert`);
    });
    userRef = user;
    return { wasSuccessful: true, msg: "done" };
  } catch (error) {
    if (error.message === "Email is taken") {
      return { wasSuccessful: false, msg: "Email is taken." };
    } else if (error.message === "Username is taken.") {
      return { wasSuccessful: false, msg: "Username is taken." };
    } else {
      return { wasSuccessful: false, msg: error.message };
    }
  }
};

export { getUser, addNewUser };
