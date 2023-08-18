/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import pg from "pg";
import cors from "cors";
import { param, body, query, validationResult } from "express-validator";
import jwtAuthRouter from "../server/Routes/jwtAuth.js";
import cookieParser from "cookie-parser";
import http from "http";
// import ws from 'ws'
import { WebSocketServer } from "ws";

// initialize app by invoking express
const app = express();
const corsOptions = {
  origin: [
    "https://collab-code-static.onrender.com",
    "https://collab-code.onrender.com",
    "https://collabcode.onrender.com/api/auth/refresh_token/teacher",
    "https://collab-code.onrender.com/api/auth/protected/teacher",
    "http://localhost:5173",
    "https://collab-code.onrender.com/api/auth/protected/student"
  ], // You can specify the allowed origins here
  credentials: true, // This is important for allowing credentials
};


//middleware for the local environment
app.use(cors(corsOptions));

// configure environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// initialize data pool
const { Pool } = pg;
const pool = new Pool({ connectionString: DATABASE_URL });

// middleware live environment
app.use(
  express.static("dist"),
  express.json(),
  cors(corsOptions),
  cookieParser()
);

const server = http.createServer(app);

// forward any ‘/api/auth’ to our ./routes/jwtAuth.js file
app.use("/api/auth", jwtAuthRouter);
// /*----- 'admins' table routes -----*/

// // GET ALL - secured by not reading request object
// app.get("/admins", async (req, res) => {
//   try {
//     const results = await pool.query("SELECT * FROM admins;");
//     if (results.rowCount < 1) {
//       res.status(404).send("Resource not found");
//       return;
//     } else {
//       res.status(200).json(results.rows);
//       return;
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server caught the following error: " + error.message);
//     return;
//   }
// });

// // GET ONE - secured by validating id
// app.get("/admins/:id", param("id").isInt(), async (req, res) => {
//   // validation result
//   if (!validationResult(req).isEmpty) {
//     res
//       .status(400)
//       .send(
//         "Validator caught the following error(s): " +
//           validationResult(req).array()
//       );
//     return;
//   }

//   // destruct required info
//   const { id } = req.params;

//   // attempt pool query
//   try {
//     const results = await pool.query("SELECT * FROM admins WHERE ad_id = $1", [
//       id,
//     ]);
//     if (results.rowCount < 1) {
//       res.status(404).send("Resource not found");
//       return;
//     } else {
//       res.status(200).json(results.rows);
//       return;
//     }
//   } catch (error) {
//     // error handling
//     console.error(error.message);
//     res.status(500).send("Server caught the following error: " + error.message);
//     return;
//   }
// });

// // POST ONE - secured by sanitizing body
// app.post(
//   "/admins",
//   body("ad_email").blacklist(";").escape(),
//   body("ad_password").blacklist(";").escape(),
//   body("ad_name").blacklist(";").escape(),
//   async (req, res) => {
//     // validation result
//     if (!validationResult(req).isEmpty) {
//       res
//         .status(400)
//         .send(
//           "Validator caught the following error(s): " +
//             validationResult(req).array()
//         );
//       return;
//     }

//     // destruct required info
//     const { ad_email, ad_password, ad_name } = req.body;

//     // remove null values
//     if (!ad_email || !ad_password || !ad_name) {
//       res
//         .status(400)
//         .send("PUT request requires ad_email, ad_password, ad_name");
//       return;
//     }

//     // attempt pool query
//     try {
//       const results = await pool.query(
//         "INSERT INTO admins (ad_email, ad_password, ad_name) VALUES ($1, $2, $3) RETURNING *",
//         [ad_email, ad_password, ad_name]
//       );
//       if (results.rowCount < 1) {
//         res.status(500).send("Unable to POST to /admins");
//         return;
//       } else {
//         res.status(201).json(results.rows);
//         return;
//       }
//     } catch (error) {
//       // error handling
//       console.error(error.message);
//       res
//         .status(500)
//         .send("Server caught the following error: " + error.message);
//       return;
//     }
//   }
// );

// // PUT ONE - secured by validating id and sanitizing body
// app.put(
//   "/admins/:id",
//   param("id").isInt(),
//   body("ad_email").blacklist(";").escape(),
//   body("ad_password").blacklist(";").escape(),
//   body("ad_name").blacklist(";").escape(),
//   async (req, res) => {
//     // validation result
//     if (!validationResult(req).isEmpty) {
//       res
//         .status(400)
//         .send(
//           "Validator caught the following error(s): " +
//             validationResult(req).array()
//         );
//       return;
//     }

//     // destruct required info
//     const { ad_email, ad_password, ad_name } = req.body;
//     const { id } = req.params;

//     // remove null values
//     if (!ad_email || !ad_password || !ad_name) {
//       res
//         .status(400)
//         .send("PUT request requires ad_email, ad_password, ad_name");
//       return;
//     }

//     // attempt pool query
//     try {
//       const results = await pool.query(
//         "UPDATE admins SET ad_email = $1, ad_password = $2, ad_name = $3 WHERE ad_id = $4 RETURNING *",
//         [ad_email, ad_password, ad_name, id]
//       );
//       if (results.rowCount < 1) {
//         res.status(404).send("Resource not found");
//         return;
//       } else {
//         res.status(200).json(results.rows);
//         return;
//       }
//     } catch (error) {
//       // error handling
//       console.error(error.message);
//       res
//         .status(500)
//         .send("Server caught the following error: " + error.message);
//       return;
//     }
//   }
// );

// // DELETE ONE - secured by validating id
// app.delete("/admins/:id", param("id").isInt(), async (req, res) => {
//   // validation result
//   if (!validationResult(req).isEmpty) {
//     res
//       .status(400)
//       .send(
//         "Validator caught the following error(s): " +
//           validationResult(req).array()
//       );
//     return;
//   }

//   // destruct required info
//   const { id } = req.params;

//   // attempt pool query
//   try {
//     const results = await pool.query(
//       "DELETE FROM admins WHERE ad_id = $1 RETURNING *",
//       [id]
//     );
//     if (results.rowCount < 1) {
//       res.status(404).send("Resource not found");
//       return;
//     } else {
//       res.status(200).json(results.rows);
//       return;
//     }
//   } catch (error) {
//     // error handling
//     console.error(error.message);
//     res.status(500).send("Server caught the following error: " + error.message);
//     return;
//   }
// });

/*----- 'teachers' table routes -----*/

// GET ALL - secured by not reading request object
app.get("/teachers", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM teachers;");
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// GET ONE - secured by validating id
app.get("/teachers/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "SELECT * FROM teachers WHERE ta_id = $1",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// POST ONE - secured by sanitizing body
app.post(
  "/teachers",
  body("ta_email").blacklist(";").escape(),
  body("ta_password").blacklist(";").escape(),
  body("ta_name").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { ta_email, ta_password, ta_name } = req.body;

    // remove null values
    if (!ta_email || !ta_password || !ta_name) {
      res
        .status(400)
        .send("PUT request requires ta_email, ta_password, ta_name");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "INSERT INTO teachers (ta_email, ta_password, ta_name) VALUES ($1, $2, $3) RETURNING *",
        [ta_email, ta_password, ta_name]
      );
      if (results.rowCount < 1) {
        res.status(500).send("Unable to POST to /teachers");
        return;
      } else {
        res.status(201).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// PUT ONE - secured by validating id and sanitizing body
app.put(
  "/teachers/:id",
  param("id").isInt(),
  body("ta_email").blacklist(";").escape(),
  body("ta_password").blacklist(";").escape(),
  body("ta_name").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { ta_email, ta_password, ta_name } = req.body;
    const { id } = req.params;

    // remove null values
    if (!ta_email || !ta_password || !ta_name) {
      res
        .status(400)
        .send("PUT request requires ta_email, ta_password, ta_name");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "UPDATE teachers SET ta_email = $1, ta_password = $2, ta_name = $3 WHERE ta_id = $4 RETURNING *",
        [ta_email, ta_password, ta_name, id]
      );
      if (results.rowCount < 1) {
        res.status(404).send("Resource not found");
        return;
      } else {
        res.status(200).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// DELETE ONE - secured by validating id
app.delete("/teachers/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "DELETE FROM teachers WHERE ta_id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

/*----- 'students' table routes -----*/

// GET ALL - secured by not reading request object
app.get("/students", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM students;");
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// GET ONE - secured by validating id
app.get("/students/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "SELECT * FROM students WHERE st_id = $1",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// POST ONE - secured by sanitizing body
app.post(
  "/students",
  body("st_email").blacklist(";").escape(),
  body("st_password").blacklist(";").escape(),
  body("st_name").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { st_email, st_password, st_name } = req.body;

    // remove null values
    if (!st_email || !st_password || !st_name) {
      res
        .status(400)
        .send("PUT request requires st_email, st_password, st_name");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "INSERT INTO students (st_email, st_password, st_name) VALUES ($1, $2, $3) RETURNING *",
        [st_email, st_password, st_name]
      );
      if (results.rowCount < 1) {
        res.status(500).send("Unable to POST to /students");
        return;
      } else {
        res.status(201).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// PUT ONE - secured by validating id and sanitizing body
app.put(
  "/students/:id",
  param("id").isInt(),
  body("st_email").blacklist(";").escape(),
  body("st_password").blacklist(";").escape(),
  body("st_name").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { st_email, st_password, st_name } = req.body;
    const { id } = req.params;

    // remove null values
    if (!st_email || !st_password || !st_name) {
      res
        .status(400)
        .send("PUT request requires st_email, st_password, st_name");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "UPDATE students SET st_email = $1, st_password = $2, st_name = $3 WHERE st_id = $4 RETURNING *",
        [st_email, st_password, st_name, id]
      );
      if (results.rowCount < 1) {
        res.status(404).send("Resource not found");
        return;
      } else {
        res.status(200).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// DELETE ONE - secured by validating id
app.delete("/students/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "DELETE FROM students WHERE st_id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

/*----- 'interviews' table routes -----*/

// GET ALL - secured by sanitizing query
app.get(
  "/interviews",
  query("ta_id").blacklist(";").escape(),
  query("st_id").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct teacher id and student id from query
    const { ta_id, st_id } = req.query;
    // if a teacher id exists, but not a student id, GET ALL interviews by teacher id
    if (ta_id) {
      try {
        const results = await pool.query(
          "SELECT * FROM interviews WHERE ta_id = $1;",
          [ta_id]
        );
        if (results.rowCount < 1) {
          res.status(404).send("Resource not found");
          return;
        } else {
          res.status(200).json(results.rows);
          return;
        }
      } catch (error) {
        console.error(error.message);
        res
          .status(500)
          .send("Server caught the following error: " + error.message);
        return;
      }
    }
    // if a student id exists, but not a teacher id, GET ALL interviews by student id
    else if (st_id) {
      try {
        const results = await pool.query(
          "SELECT * FROM interviews WHERE st_id = $1;",
          [st_id]
        );
        if (results.rowCount < 1) {
          res.status(404).send("Resource not found");
          return;
        } else {
          res.status(200).json(results.rows);
          return;
        }
      } catch (error) {
        console.error(error.message);
        res
          .status(500)
          .send("Server caught the following error: " + error.message);
        return;
      }
    }
    // if neither exist, GET ALL normally
    else {
      try {
        const results = await pool.query("SELECT * FROM interviews;");
        if (results.rowCount < 1) {
          res.status(404).send("Resource not found");
          return;
        } else {
          res.status(200).json(results.rows);
          return;
        }
      } catch (error) {
        console.error(error.message);
        res
          .status(500)
          .send("Server caught the following error: " + error.message);
        return;
      }
    }
  }
);

// GET ONE - secured by validating id
app.get("/interviews/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "SELECT * FROM interviews WHERE in_id = $1",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// POST ONE - secured by validating body numeric values and sanitizing body text
app.post(
  "/interviews",
  body("ta_id").isInt(),
  body("st_id").isInt(),
  body("in_date").isDate(),
  body("in_time").isTime(),
  body("in_completed").isBoolean(),
  body("in_comments").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { ta_id, st_id, in_date, in_time, in_completed, in_comments } =
      req.body;

    // remove null values
    if (
      !ta_id ||
      !st_id ||
      !in_date ||
      !in_time ||
      in_completed === undefined
    ) {
      res
        .status(400)
        .send(
          "POST request requires ta_id, st_id, in_date, in_time, in_completed"
        );
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "INSERT INTO interviews (ta_id, st_id, in_date, in_time, in_completed, in_comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [ta_id, st_id, in_date, in_time, in_completed, in_comments]
      );
      if (results.rowCount < 1) {
        res.status(500).send("Unable to POST to /interviews");
        return;
      } else {
        res.status(201).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// PUT ONE - secured by validating id, validating body numeric values and sanitizing body text
app.put(
  "/interviews/:id",
  param("id").isInt(),
  body("ta_id").isInt(),
  body("st_id").isInt(),
  body("in_date").isDate(),
  body("in_time").isTime(),
  body("in_completed").isBoolean(),
  body("in_comments").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { ta_id, st_id, in_date, in_time, in_completed, in_comments } =
      req.body;
    const { id } = req.params;

    // remove null values
    if (
      !ta_id ||
      !st_id ||
      !in_date ||
      !in_time ||
      in_completed === undefined
    ) {
      res
        .status(400)
        .send(
          "PUT request requires ta_id, st_id, in_date, in_time, in_completed"
        );
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "UPDATE interviews SET ta_id = $1, st_id = $2, in_date = $3, in_time = $4, in_completed = $5, in_comments = $6 WHERE in_id = $7 RETURNING *",
        [ta_id, st_id, in_date, in_time, in_completed, in_comments, id]
      );
      if (results.rowCount < 1) {
        res.status(404).send("Resource not found");
        return;
      } else {
        res.status(200).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// DELETE ONE - secured by validating id
app.delete("/interviews/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "DELETE FROM interviews WHERE in_id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

/*----- 'chat' table routes -----*/

// GET ALL - secured by not reading request object
app.get("/chat", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM chat;");
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// GET ONE - secured by validating id
app.get("/chat/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query("SELECT * FROM chat WHERE chat_id = $1", [
      id,
    ]);
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// POST ONE - secured by validating body numeric values and sanitizing body text
app.post(
  "/chat",
  body("chat_sender_name").blacklist(";").escape(),
  body("chat_time").isTime(),
  body("chat_message").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { chat_sender_name, chat_time, chat_message } = req.body;

    // remove null values
    if (!chat_sender_name || !chat_time || !chat_message) {
      res
        .status(400)
        .send(
          "POST request requires chat_sender_name, chat_time, chat_message"
        );
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "INSERT INTO chat (chat_sender_name, chat_time, chat_message) VALUES ($1, $2, $3) RETURNING *",
        [chat_sender_name, chat_time, chat_message]
      );
      if (results.rowCount < 1) {
        res.status(500).send("Unable to POST to /chat");
        return;
      } else {
        res.status(201).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// PUT ONE - secured by validating id, validating body numeric values and sanitizing body text
app.put(
  "/chat/:id",
  param("id").isInt(),
  body("chat_sender_name").blacklist(";").escape(),
  body("chat_time").isTime(),
  body("chat_message").blacklist(";").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { chat_sender_name, chat_time, chat_message } = req.body;
    const { id } = req.params;

    // remove null values
    if (!chat_sender_name || !chat_time || !chat_message) {
      res
        .status(400)
        .send("PUT request requires chat_sender_name, chat_time, chat_message");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "UPDATE chat SET chat_sender_name = $1, chat_time = $2, chat_message = $3 WHERE chat_id = $4 RETURNING *",
        [chat_sender_name, chat_time, chat_message, id]
      );
      if (results.rowCount < 1) {
        res.status(404).send("Resource not found");
        return;
      } else {
        res.status(200).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// DELETE ONE - secured by validating id
app.delete("/chat/:id", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "DELETE FROM chat WHERE chat_id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

/*----- 'runtime' table routes -----*/

// GET ALL - secured by not reading request object
app.get("/runtime", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM runtime;");
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// GET ONE - secured by validating id
app.get("/runtime", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "SELECT * FROM runtime WHERE runtime_id = $1",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

// POST ONE - secured by using escape() on body text components
app.post(
  "/runtime",
  body("in_id").isInt(),
  body("runtime_input").escape(),
  body("runtime_output").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { in_id, runtime_input, runtime_output } = req.body;

    // remove null values
    if (!in_id) {
      res.status(400).send("POST request requires in_id");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "INSERT INTO runtime (in_id, runtime_input, runtime_output) VALUES ($1, $2, $3)",
        [in_id, runtime_input, runtime_output]
      );
      if (results.rowCount < 1) {
        res.status(500).send("Unable to POST to /runtime");
        return;
      } else {
        res.status(201).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// PUT ONE - secured by validating incoming id and using escape() on body text components
app.put(
  "/runtime/:id",
  param("id").isInt(),
  body("in_id").isInt(),
  body("runtime_input").escape(),
  body("runtime_output").escape(),
  async (req, res) => {
    // validation result
    if (!validationResult(req).isEmpty) {
      res
        .status(400)
        .send(
          "Validator caught the following error(s): " +
          "Validator caught the following error(s): " +
            validationResult(req).array()
        );
      return;
    }

    // destruct required info
    const { in_id, runtime_input, runtime_output } = req.body;
    const { id } = req.params;

    // remove null values
    if (!in_id) {
      res.status(400).send("POST request requires in_id");
      return;
    }

    // attempt pool query
    try {
      const results = await pool.query(
        "UPDATE runtime SET in_id = $1, runtime_input = $2, runtime_output = $3 WHERE runtime_id = $4 RETURNING *",
        [in_id, runtime_input, runtime_output, id]
      );
      if (results.rowCount < 1) {
        res.status(404).send("Resource not found");
        return;
      } else {
        res.status(200).json(results.rows);
        return;
      }
    } catch (error) {
      // error handling
      console.error(error.message);
      res
        .status(500)
        .send("Server caught the following error: " + error.message);
      return;
    }
  }
);

// DELETE ONE - secured by validating id
app.delete("/runtime", param("id").isInt(), async (req, res) => {
  // validation result
  if (!validationResult(req).isEmpty) {
    res
      .status(400)
      .send(
        "Validator caught the following error(s): " +
        "Validator caught the following error(s): " +
          validationResult(req).array()
      );
    return;
  }

  // destruct required info
  const { id } = req.params;

  // attempt pool query
  try {
    const results = await pool.query(
      "DELETE FROM runtime WHERE runtime_id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount < 1) {
      res.status(404).send("Resource not found");
      return;
    } else {
      res.status(200).json(results.rows);
      return;
    }
  } catch (error) {
    // error handling
    console.error(error.message);
    res.status(500).send("Server caught the following error: " + error.message);
    return;
  }
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", (err) => {
    console.error('[server] Error:', err);
  });

  ws.addEventListener('message', (e) => {
    // on receive, broadcast message to all clients
    wss.clients.forEach((client) => {
      client.send(e.data);
    });
  })

  ws.send("console.log('hello world!');")
});

/*----- Listener -----*/
server.listen(PORT, () => {
  console.log("API/JWT and WebSocket server running, port:", PORT);
});
