import bcrypt from "bcrypt";
import createAccessToken from "../Utility/jwtGenerator.js";
import express from "express";
import pool from "../db.js";
import {
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from "../Utility/jwtGenerator.js";

const router = express.Router();

//register for admin account
router.post("/register/admin", async (req, res) => {
  try {
    const { ad_email, ad_password, ad_name } = req.body;

    const user = await pool.query("SELECT * FROM admins WHERE ad_email = $1;", [
      ad_email,
    ]);

    if (user.rows.length !== 0) {
      res.status(402).send("Admin already exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bycryptPassWord = await bcrypt.hash(ad_password, salt);

    const newUser = await pool.query(
      "INSERT INTO admins(ad_email, ad_password, ad_name) VALUES ($1, $2, $3) RETURNING *",
      [ad_email, bycryptPassWord, ad_name]
    );

    res.status(200).json({
      message: "Admin account created successfully!",
      type: "success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error...");
  }
});

//register for teacher account
router.post("/register/teacher", async (req, res) => {
  try {
    const { ta_email, ta_password, ta_name } = req.body;

    const user = await pool.query(
      `SELECT * FROM teachers WHERE ta_email = $1;`,
      [ta_email]
    );

    if (user.rows.length !== 0) {
      res.status(402).send("Teacher already exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bycryptPassWord = await bcrypt.hash(ta_password, salt);

    const newUser = await pool.query(
      "INSERT INTO teachers(ta_email, ta_password, ta_name) VALUES ($1, $2, $3) RETURNING *",
      [ta_email, bycryptPassWord, ta_name]
    );

    res.status(200).json({
      message: "teacher account created successfully!",
      type: "success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error...");
  }
});

// register student
router.post("/register/student", async (req, res) => {
  try {
    const { st_email, st_password, st_name } = req.body;

    const user = await pool.query(
      `SELECT * FROM students WHERE st_email = $1;`,
      [st_email]
    );

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bycryptPassWord = await bcrypt.hash(st_password, salt);

    const newUser = await pool.query(
      "INSERT INTO students(st_email, st_password, st_name) VALUES ($1, $2, $3) RETURNING *",
      [st_email, bycryptPassWord, st_name]
    );

    res.status(200).json({
      message: "student account created successfully!",
      type: "success",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error...");
  }
});

//sign in for admin
router.post("/signIn/admin", async (req, res) => {
  try {
    const { ad_email, ad_password } = req.body;

    const user = await pool.query("SELECT * FROM admins WHERE ad_email = $1;", [
      ad_email,
    ]);

    if (user.rows.length < 1) {
      return res.status(404).send("User not found...");
    }

    const validPassword = await bcrypt.compare(
      ad_password,
      user.rows[0].ad_password
    );

    if (!validPassword) {
      res.status(500).send("Incorrect password");
    }
    //create a token if the password is correct
    //they use "const accessToken = createAccessToken(...)"
    //we need to create a token here
    const accessToken = createAccessToken(user.rows[0]);
    const refreshToken = createRefreshToken(user.rows[0]);

    //UPDATE owners SET age = 30 WHERE name = 'Jane';
    const insertToken = await pool.query(
      `UPDATE admins SET ad_refreshToken = $1 WHERE ad_email = $2;`,
      [refreshToken, ad_email]
    );
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
  } catch (error) {
    res.status(500).send("Error signing in...");
  }
});

//sign in for teacher
router.post("/signIn/teacher", async (req, res) => {
  try {
    const { ta_email, ta_password } = req.body;

    const user = await pool.query(
      "SELECT * FROM teachers WHERE ta_email = $1;",
      [ta_email]
    );

    if (user.rows.length < 1) {
      return res.status(404).send("User not found...");
    }

    const validPassword = await bcrypt.compare(
      ta_password,
      user.rows[0].ta_password
    );

    if (!validPassword) {
      res.status(500).send("Incorrect password");
    }
    //create a token if the password is correct
    //they use "const accessToken = createAccessToken(...)"
    //we need to create a token here
    const accessToken = createAccessToken(user.rows[0]);
    const refreshToken = createRefreshToken(user.rows[0]);

    //UPDATE owners SET age = 30 WHERE name = 'Jane';
    const insertToken = await pool.query(
      `UPDATE teachers SET ta_refreshToken = $1 WHERE ta_email = $2;`,
      [refreshToken, ta_email]
    );
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
  } catch (error) {
    res.status(500).send("Error signing in...");
  }
});

//sign in for student
router.post("/signIn/student", async (req, res) => {
  try {
    const { st_email, st_password } = req.body;

    const user = await pool.query(
      "SELECT * FROM students WHERE st_email = $1;",
      [st_email]
    );

    if (user.rows.length < 1) {
      return res.status(404).send("User not found...");
    }

    const validPassword = await bcrypt.compare(
      st_password,
      user.rows[0].st_password
    );

    if (!validPassword) {
      res.status(500).send("Incorrect password");
    }
    //create a token if the password is correct
    //they use "const accessToken = createAccessToken(...)"
    //we need to create a token here
    const accessToken = createAccessToken(user.rows[0]);
    const refreshToken = createRefreshToken(user.rows[0]);

    //UPDATE owners SET age = 30 WHERE name = 'Jane';
    const insertToken = await pool.query(
      `UPDATE students SET st_refreshToken = $1 WHERE st_email = $2;`,
      [refreshToken, st_email]
    );
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
  } catch (error) {
    res.status(500).send("Error signing in...");
  }
});
//Sign out request??
router.post("/logout", (_req, res) => {
  res.clearCookie("refreshToken").send("logged out successfully");
  // res.send("Logged out successfully");
});

export default router;
