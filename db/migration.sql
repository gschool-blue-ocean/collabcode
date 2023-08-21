-- Resets all the tables 
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;

CREATE TABLE teachers (
    ta_id SERIAL PRIMARY KEY,
    ta_email TEXT,
    ta_password TEXT,
    ta_name TEXT,
    ta_refreshToken TEXT
);

CREATE TABLE students (
    st_id SERIAL PRIMARY KEY,
    st_email TEXT,
    st_password TEXT,
    st_name TEXT,
    st_refreshToken TEXT,
    st_comments TEXT,
    st_scheduled BOOL
);

CREATE TABLE interviews (
    in_id SERIAL PRIMARY KEY,
    ta_id INT REFERENCES teachers(ta_id),
    st_id INT REFERENCES students(st_id),
    in_date DATE,
    in_time TIME,
    in_completed BOOL
);
