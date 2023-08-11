-- Resets all the tables 

DROP TABLE IF EXISTS runtime;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS admins;

CREATE TABLE admins (
    ad_id SERIAL PRIMARY KEY,
    ad_email TEXT,
    ad_password TEXT,
    ad_name TEXT,
    ad_refreshToken TEXT
);

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
    st_refreshToken TEXT
);

CREATE TABLE interviews (
    in_id SERIAL PRIMARY KEY,
    ta_id INT REFERENCES teachers(ta_id),
    st_id INT REFERENCES students(st_id),
    in_date DATE,
    in_time TIME,
    in_completed BOOL,
    in_comments TEXT
);

CREATE TABLE chat (
    chat_id SERIAL PRIMARY KEY,
    chat_sender_name TEXT,
    chat_time TIME,
    chat_message TEXT
);

CREATE TABLE runtime (
    runtime_id SERIAL PRIMARY KEY,
    in_id INT REFERENCES interviews(in_id),
    runtime_input TEXT,
    runtime_output TEXT
);