import bcrypt from "bcrypt";
import createAccessToken from "../Utility/jwtGenerator.js";
import express from "express";
import pool from "../db.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import dotenv from "dotenv";
import transporter from "../Utility/email.js";
import { NotesTemplate } from "../Utility/email.js";
//IMPORTING MIDDLEWARE FOR VALIDATION
import {
  validStudentInfo,
  // validAdminInfo,
  validTeacherInfo,
} from "../middlewares/validInfo.js";
//IMPORTING PROTECTED FROM PROTECTED
import {
  studentUser,
  // adminUser,
  teacherUser,
} from "../middlewares/protected.js";
//IMPORTING TOKEN CREATION
import {
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} from "../Utility/jwtGenerator.js";

dotenv.config();
const router = express.Router();

//register for teacher account SUCCESSFUL
router.post("/register/teacher", validTeacherInfo, async (req, res) => {
  try {
    const { ta_email, ta_password, ta_name, ta_code } = req.body;
    //POST in postman under  http://localhost:8000/api/auth/register/teacher
    //THEN VERIFY under http://localhost:8000/teachers NOTE refreshToken is null

    if (ta_code !== process.env.TEACHER_CODE) {
      return res.status(400).send("Incorrect Teacher code ...");
    }

    const newTeacher = await pool.query(
      `SELECT * FROM teachers WHERE ta_email = $1;`,
      [ta_email]
    );

    if (newTeacher.rows.length !== 0) {
      return res.status(402).send("Teacher already exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bycryptPassWord = await bcrypt.hash(ta_password, salt);

    await pool.query(
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

// register student SUCCESSFUL
router.post("/register/student", validStudentInfo, async (req, res) => {
  try {
    const { st_email, st_password, st_name, st_scheduled } = req.body;

    const newStudent = await pool.query(
      `SELECT * FROM students WHERE st_email = $1;`,
      [st_email]
    );

    if (newStudent.rows.length !== 0) {
      return res.status(402).send("Student already exists");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bycryptPassWord = await bcrypt.hash(st_password, salt);

    await pool.query(
      "INSERT INTO students(st_email, st_password, st_name, st_scheduled) VALUES ($1, $2, $3, $4) RETURNING *",
      [st_email, bycryptPassWord, st_name, st_scheduled]
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

//sign in for teacher SUCCESSFUL
router.post("/signIn/teacher", validTeacherInfo, async (req, res) => {
  try {
    const { ta_email, ta_password } = req.body;

    const teacher = await pool.query(
      "SELECT * FROM teachers WHERE ta_email = $1;",
      [ta_email]
    );
    if (teacher.rows.length < 1) {
      return res.status(404).send("User not found...");
    }
    bcrypt.compare(
      ta_password,
      teacher.rows[0].ta_password,
      async (err, result) => {
        if (result) {
          const accessToken = createAccessToken(teacher.rows[0].ta_id);
          const refreshToken = createRefreshToken(teacher.rows[0].ta_id);
          await pool.query(
            `UPDATE teachers SET ta_refreshToken = $1 WHERE ta_email = $2;`,
            [refreshToken, ta_email]
          );
          sendRefreshToken(res, refreshToken);
          sendAccessToken(req, res, accessToken);
        } else {
          console.error(err);
          return res.status(500).send("Incorrect password");
        }
      }
    );
  } catch (error) {
    res.status(500).send("Error signing in...");
  }
});

//sign in for student SUCCESSFUL
router.post("/signIn/student", validStudentInfo, async (req, res) => {
  try {
    const { st_email, st_password } = req.body;

    const student = await pool.query(
      "SELECT * FROM students WHERE st_email = $1;",
      [st_email]
    );
    if (student.rows.length < 1) {
      return res.status(404).send("User not found...");
    }
    bcrypt.compare(
      st_password,
      student.rows[0].st_password,
      async (err, result) => {
        if (result) {
          const accessToken = createAccessToken(student.rows[0].st_id);
          const refreshToken = createRefreshToken(student.rows[0].st_id);
          await pool.query(
            `UPDATE students SET st_refreshToken = $1 WHERE st_email = $2;`,
            [refreshToken, st_email]
          );
          sendRefreshToken(res, refreshToken);
          sendAccessToken(req, res, accessToken);
        } else {
          console.error(err);
          return res.status(500).send("Incorrect password");
        }
      }
    );
  } catch (error) {
    res.status(500).send("Error signing in...");
  }
});

//Sign out request TEST THIS OUT THROUGH THE APPLICATION TAB
router.post("/logout", (req, res) => {
  //Shouldn't we take a request object to log out the user?
  res.clearCookie("refreshtoken");
  return res.json({
    message: "Logged out successfully! 🤗",
    type: "success",
  });
});

// Refresh Token request for student HMM NEEDING TO REWORK THIS WITH CLIENT SIDE DATA AS WELL
router.post("/refresh_token/student", async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    // if we don't have a refresh token, return error
    if (!refreshtoken)
      return res.status(500).json({
        message: "No refresh token! 🤔",
        type: "error",
      });
    // if we have a refresh token, you have to verify it
    let id;
    try {
      id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
    } catch (error) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });
    }
    // if the refresh token is invalid, return error
    if (!id)
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });
    // if the refresh token is valid, check if the user exists
    const user = await pool.query("SELECT * FROM students WHERE st_id = $1;", [
      id,
    ]);
    // if the user doesn't exist, return error
    if (!user)
      return res.status(500).json({
        message: "User doesn't exist! 😢",
        type: "error",
      });
    // if the user exists, check if the refresh token is correct. return error if it is incorrect.
    if (user.rows[0].st_refreshtoken !== refreshtoken) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });
    }
    // if the refresh token is correct, create the new tokens
    const accessToken = createAccessToken(user.rows[0].st_id);
    const refreshToken = createRefreshToken(user.rows[0].st_id);
    // update the refresh token in the database
    const insertToken = await pool.query(
      `UPDATE students SET st_refreshToken = $1 WHERE st_email = $2;`,
      [refreshToken, user.rows[0].st_email]
    );
    // send the new tokes as response
    sendRefreshToken(res, refreshToken);

    return res.json({
      message: "Refreshed successfully! 🤗",
      type: "success",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error refreshing token!",
      error,
    });
  }
});

// Refresh Token request for teacher HMM NEEDING TO REWORK THIS WITH CLIENT SIDE DATA AS WELL
router.post("/refresh_token/teacher", async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    // if we don't have a refresh token, return error
    if (!refreshtoken)
      return res.status(500).json({
        message: "No refresh token! 🤔",
        type: "error",
      });
    // if we have a refresh token, you have to verify it
    let id;
    try {
      id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
    } catch (error) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });
    }
    // if the refresh token is invalid, return error
    if (!id)
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });
    // if the refresh token is valid, check if the user exists
    const user = await pool.query("SELECT * FROM teachers WHERE ta_id = $1;", [
      id,
    ]);
    // if the user doesn't exist, return error
    if (!user)
      return res.status(500).json({
        message: "User doesn't exist! 😢",
        type: "error",
      });
    // if the user exists, check if the refresh token is correct. return error if it is incorrect.
    if (user.rows[0].ta_refreshtoken !== refreshtoken) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error",
      });
    }
    // if the refresh token is correct, create the new tokens
    const accessToken = createAccessToken(user.rows[0].ta_id);
    const refreshToken = createRefreshToken(user.rows[0].ta_id);
    // update the refresh token in the database
    const insertToken = await pool.query(
      `UPDATE teachers SET ta_refreshToken = $1 WHERE ta_email = $2;`,
      [refreshToken, user.rows[0].ta_email]
    );
    // send the new tokes as response
    sendRefreshToken(res, refreshToken);

    return res.json({
      message: "Refreshed successfully! 🤗",
      type: "success",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error refreshing token!",
      error,
    });
  }
});

// // Refresh Token request for admin
// router.post("/refresh_token/admin", async (req, res) => {
//   try {
//     const { refreshtoken } = req.cookies;
//     // if we don't have a refresh token, return error
//     if (!refreshtoken)
//       return res.status(500).json({
//         message: "No refresh token! 🤔",
//         type: "error",
//       });
//     // if we have a refresh token, you have to verify it
//     let id;
//     try {
//       id = verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET).id;
//     } catch (error) {
//       return res.status(500).json({
//         message: "Invalid refresh token!",
//         type: "error",
//       });
//     }
//     // if the refresh token is invalid, return error
//     if (!id)
//       return res.status(500).json({
//         message: "Invalid refresh token!",
//         type: "error",
//       });
//     // if the refresh token is valid, check if the user exists
//     const user = await pool.query("SELECT * FROM admins WHERE ad_id = $1;", [
//       id,
//     ]);
//     // if the user doesn't exist, return error
//     if (!user)
//       return res.status(500).json({
//         message: "User doesn't exist! 😢",
//         type: "error",
//       });
//     // if the user exists, check if the refresh token is correct. return error if it is incorrect.
//     if (user.rows[0].ad_refreshtoken !== refreshtoken) {
//       return res.status(500).json({
//         message: "Invalid refresh token!",
//         type: "error",
//       });
//     }
//     // if the refresh token is correct, create the new tokens
//     const accessToken = createAccessToken(user.rows[0].ad_id);
//     const refreshToken = createRefreshToken(user.rows[0].ad_id);
//     // update the refresh token in the database
//     const insertToken = await pool.query(
//       `UPDATE admins SET ad_refreshToken = $1 WHERE ad_email = $2;`,
//       [refreshToken, user.rows[0].ad_email]
//     );
//     // send the new tokes as response
//     sendRefreshToken(res, refreshToken);

//     return res.json({
//       message: "Refreshed successfully! 🤗",
//       type: "success",
//       accessToken,
//     });
//   } catch (error) {
//     res.status(500).json({
//       type: "error",
//       message: "Error refreshing token!",
//       error,
//     });
//   }
// });

router.get("/protected/student", studentUser, async (req, res) => {
  try {
    // if user exists in the request, send the data
    if (req.user) {
      return res.json({
        message: "You are logged in! 🤗",
        type: "success",
        user: req.user,
      });
    }
    // if user doesn't exist, return error
    return res.status(500).json({
      message: "You are not logged in! 😢",
      type: "error",
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error getting protected route!",
      error,
    });
  }
});

// router.get("/protected/admin", adminUser, async (req, res) => {
//   try {
//     // if user exists in the request, send the data
//     if (req.user) {
//       return res.json({
//         message: "You are logged in! 🤗",
//         type: "success",
//         user: req.user,
//       });
//     }
//     // if user doesn't exist, return error
//     return res.status(500).json({
//       message: "You are not logged in! 😢",
//       type: "error",
//     });
//   } catch (error) {
//     res.status(500).json({
//       type: "error",
//       message: "Error getting protected route!",
//       error,
//     });
//   }
// });

router.get("/protected/teacher", teacherUser, async (req, res) => {
  try {
    // if user exists in the request, send the data
    if (req.user) {
      return res.json({
        message: "You are logged in! 🤗",
        type: "success",
        user: req.user,
      });
    }
    // if user doesn't exist, return error
    return res.status(500).json({
      message: "You are not logged in! 😢",
      type: "error",
    });
  } catch (error) {
    res.status(500).json({
      type: "error",
      message: "Error getting protected route!",
      error,
    });
  }
});


router.post("/sendEmail", async (req, res) => {
  const { email, name, input, notes } = req.body

  const mainlOptions = NotesTemplate(email, name, input, notes);
  transporter.sendMail(mainlOptions, (err) => {
    if(err) {
      return res.status(500).json({
        message: "Error Sending email!",
        type: "error",
      })
    }
  })
})

export default router;
