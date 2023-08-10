// import dependencies
import express from 'express';
import dotenv from 'dotenv';
import pg from 'pg';
import cors from 'cors';
import { param, body, validationResult } from 'express-validator';

// initialize app by invoking express
const app = express();

// configure environment variables
dotenv.config();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

// initialize data pool
const { Pool } = pg;
const pool = new Pool({ connectionString: DATABASE_URL });

// middleware
app.use(express.static('dist'), express.json(), cors());

/*----- 'admins' table routes -----*/

// GET ALL - secured by not reading request object
app.get(
    '/admins',
    async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT * FROM admins;'
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// GET ONE - secured by validating id
app.get(
    '/admins/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'SELECT * FROM admins WHERE ad_id = $1',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// POST ONE - secured by sanitizing body
app.post(
    '/admins',
    body('ad_email').isEmail().blacklist(';').escape(),
    body('ad_password').blacklist(';').escape(),
    body('ad_name').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { ad_email, ad_password, ad_name } = req.body;

        // attempt pool query
        try {
            const results = await pool.query(
                'INSERT INTO admins (ad_email, ad_password, ad_name) VALUES ($1, $2, $3) RETURNING *',
                [ad_email, ad_password, ad_name]
            );
            if (results.rowCount < 1) {
                res.status(500).send('Unable to POST to /admins'); return;
            } else {
                res.status(201).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// PUT ONE - secured by validating id and sanitizing body
app.put(
    '/admins/:id',
    params('id').isInt(),
    body('ad_email').isEmail().blacklist(';').escape(),
    body('ad_password').blacklist(';').escape(),
    body('ad_name').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { ad_email, ad_password, ad_name } = req.body;
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'UPDATE admins SET ad_email = $1, ad_password = $2, ad_name = $3 WHERE ad_id = $4 RETURNING *',
                [ad_email, ad_password, ad_name, id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// DELETE ONE - secured by validating id
app.delete(
    '/admins/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'DELETE FROM admins WHERE ad_id = $1 RETURNING *',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);


/*----- 'teachers' table routes -----*/

// GET ALL - secured by not reading request object
app.get(
    '/teachers',
    async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT * FROM teachers;'
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// GET ONE - secured by validating id
app.get(
    '/teachers/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'SELECT * FROM teachers WHERE ta_id = $1',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// POST ONE - secured by sanitizing body
app.post(
    '/teachers',
    body('ta_email').isEmail().blacklist(';').escape(),
    body('ta_password').blacklist(';').escape(),
    body('ta_name').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { ta_email, ta_password, ta_name } = req.body;

        // attempt pool query
        try {
            const results = await pool.query(
                'INSERT INTO teachers (ta_email, ta_password, ta_name) VALUES ($1, $2, $3) RETURNING *',
                [ta_email, ta_password, ta_name]
            );
            if (results.rowCount < 1) {
                res.status(500).send('Unable to POST to /teachers'); return;
            } else {
                res.status(201).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// PUT ONE - secured by validating id and sanitizing body
app.put(
    '/teachers/:id',
    params('id').isInt(),
    body('ta_email').isEmail().blacklist(';').escape(),
    body('ta_password').blacklist(';').escape(),
    body('ta_name').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { ta_email, ta_password, ta_name } = req.body;
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'UPDATE teachers SET ta_email = $1, ta_password = $2, ta_name = $3 WHERE ta_id = $4 RETURNING *',
                [ta_email, ta_password, ta_name, id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// DELETE ONE - secured by validating id
app.delete(
    '/teachers/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'DELETE FROM teachers WHERE ta_id = $1 RETURNING *',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

/*----- 'students' table routes -----*/

// GET ALL - secured by not reading request object
app.get(
    '/students',
    async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT * FROM students;'
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// GET ONE - secured by validating id
app.get(
    '/students/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'SELECT * FROM teachers WHERE st_id = $1',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// POST ONE - secured by sanitizing body
app.post(
    '/students',
    body('st_email').isEmail().blacklist(';').escape(),
    body('st_password').blacklist(';').escape(),
    body('st_name').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { st_email, st_password, st_name } = req.body;

        // attempt pool query
        try {
            const results = await pool.query(
                'INSERT INTO students (st_email, st_password, st_name) VALUES ($1, $2, $3) RETURNING *',
                [st_email, st_password, st_name]
            );
            if (results.rowCount < 1) {
                res.status(500).send('Unable to POST to /students'); return;
            } else {
                res.status(201).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// PUT ONE - secured by validating id and sanitizing body
app.put(
    '/students/:id',
    params('id').isInt(),
    body('st_email').isEmail().blacklist(';').escape(),
    body('st_password').blacklist(';').escape(),
    body('st_name').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { st_email, st_password, st_name } = req.body;
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'UPDATE students SET st_email = $1, st_password = $2, st_name = $3 WHERE st_id = $4 RETURNING *',
                [st_email, st_password, st_name, id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// DELETE ONE - secured by validating id
app.delete(
    '/students/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'DELETE FROM students WHERE st_id = $1 RETURNING *',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

/*----- 'interviews' table routes -----*/

// GET ALL - secured by not reading request object
app.get(
    '/interviews',
    async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT * FROM interviews;'
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// GET ONE - secured by validating id
app.get(
    '/interviews/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'SELECT * FROM interviews WHERE in_id = $1',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// POST ONE - secured by validating body numeric values and sanitizing body text
app.post(
    '/interviews',
    body('ta_id').isInt(),
    body('st_id').isInt(),
    body('in_date').isDate(),
    body('in_time').isTime(),
    body('in_completed').isBoolean(),
    body('in_comments').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { ta_id, st_id, in_date, in_time, in_completed, in_comments } = req.body;

        // attempt pool query
        try {
            const results = await pool.query(
                'INSERT INTO interviews (ta_id, st_id, in_date, in_time, in_completed, in_comments) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [ta_id, st_id, in_date, in_time, in_completed, in_comments]
            );
            if (results.rowCount < 1) {
                res.status(500).send('Unable to POST to /interviews'); return;
            } else {
                res.status(201).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// PUT ONE - secured by validating id, validating body numeric values and sanitizing body text
app.put(
    '/interviews/:id',
    params('id').isInt(),
    body('ta_id').isInt(),
    body('st_id').isInt(),
    body('in_date').isDate(),
    body('in_time').isTime(),
    body('in_completed').isBoolean(),
    body('in_comments').blacklist(';').escape(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { ta_id, st_id, in_date, in_time, in_completed, in_comments } = req.body;
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'UPDATE interviews SET ta_id = $1, st_id = $2, in_date = $3, in_time = $4, in_completed = $5, in_comments = $6 WHERE in_id = $7 RETURNING *',
                [ta_id, st_id, in_date, in_time, in_completed, in_comments, id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

// DELETE ONE - secured by validating id
app.delete(
    '/interviews/:id',
    param('id').isInt(),
    async (req, res) => {
        // validation result
        if (!validationResult(req).isEmpty) {
            res.status(400).send(
                "Validator caught the following error(s):",
                validationResult(req).array()
            ); return;
        }

        // destruct required info
        const { id } = req.params;

        // attempt pool query
        try {
            const results = await pool.query(
                'DELETE FROM interviews WHERE in_id = $1 RETURNING *',
                [id]
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }

        // error handling
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

/*----- 'chat' table routes -----*/

// GET ALL - secured by not reading request object
app.get(
    '/chat',
    async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT * FROM chat;'
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

/*----- 'runtime' table routes -----*/

// GET ALL - secured by not reading request object
app.get(
    '/runtime',
    async (req, res) => {
        try {
            const results = await pool.query(
                'SELECT * FROM runtime;'
            );
            if (results.rowCount < 1) {
                res.status(404).send('Resource not found'); return;
            } else {
                res.status(200).json(results.rows); return;
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send('Server caught the following error:', error.message); return;
        }
    }
);

/*----- Listener -----*/
app.listen(PORT, () => {
    console.log('Server running on port', PORT, 'with connection URL', DATABASE_URL);
});


