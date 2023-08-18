/* eslint-disable no-undef */
import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db.js";
const { verify } = pkg;
dotenv.config();

const studentUser = async (req, res, next) => {
  // get the token from the header
  const token = req.headers.token;
  // if we don't have a token, return error
  if (!token) {
    return res.status(500).json({
      message: "No token! 🤔",
      type: "error",
    });
  }
  // if we have a token, you have to verify it
  let id;
  try {
    id = verify(token, process.env.SECRET_KEY).id;
  } catch (error) {
    return res.status(500).json({
      message: "Invalid token!",
      type: "error",
    });
  }
  // if the token is invalid, return error
  if (!id) {
    return res.status(500).json({
      message: "Invalid token! 🤔",
      type: "error",
    });
  }
  // if the token is valid, check if the user exists
  const user = await pool.query("SELECT * FROM students WHERE st_id = $1;", [
    id,
  ]);
  // if the user doesn't exist, return error
  if (!user) {
    return res.status(500).json({
      message: "User doesn't exist! 😢",
      type: "error",
    });
  }
  // if the user exists, we'll add a new field "user" to the request
  req.user = user.rows[0];
  // call the next middleware
  next();
};

const adminUser = async (req, res, next) => {
  // get the token from the header
  const token = req.headers.token;
  // if we don't have a token, return error
  if (!token) {
    return res.status(500).json({
      message: "No token! 🤔",
      type: "error",
    });
  }
  // if we have a token, you have to verify it
  let id;
  try {
    id = verify(token, process.env.SECRET_KEY).id;
  } catch (error) {
    return res.status(500).json({
      message: "Invalid token!",
      type: "error",
    });
  }
  // if the token is invalid, return error
  if (!id) {
    return res.status(500).json({
      message: "Invalid token! 🤔",
      type: "error",
    });
  }
  // if the token is valid, check if the user exists
  const user = await pool.query("SELECT * FROM admins WHERE ad_id = $1;", [id]);
  // if the user doesn't exist, return error
  if (!user) {
    return res.status(500).json({
      message: "User doesn't exist! 😢",
      type: "error",
    });
  }
  // if the user exists, we'll add a new field "user" to the request
  req.user = user.rows[0];
  // call the next middleware
  next();
};

const teacherUser = async (req, res, next) => {
  // get the token from the header
  const token = req.headers.token;
  // if we don't have a token, return error
  if (!token) {
    return res.status(500).json({
      message: "No token! 🤔",
      type: "error",
    });
  }
  // if we have a token, you have to verify it
  let id;
  try {
    id = verify(token, process.env.SECRET_KEY).id;
  } catch (error) {
    return res.status(500).json({
      message: "Invalid token!",
      type: "error",
    });
  }
  // if the token is invalid, return error
  if (!id) {
    return res.status(500).json({
      message: "Invalid token! 🤔",
      type: "error",
    });
  }
  // if the token is valid, check if the user exists
  const user = await pool.query("SELECT * FROM teachers WHERE ta_id = $1;", [
    id,
  ]);
  // if the user doesn't exist, return error
  if (!user) {
    return res.status(500).json({
      message: "User doesn't exist! 😢",
      type: "error",
    });
  }
  // if the user exists, we'll add a new field "user" to the request
  req.user = user.rows[0];
  // call the next middleware
  next();
};

export default studentUser;
export { adminUser, teacherUser, studentUser };
