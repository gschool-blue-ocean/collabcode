-- Example seed file (will be edited later for actual data) 

-- Seeding a teacher example
INSERT INTO teachers (ta_email, ta_password, ta_name) VALUES ('teacher@hotmail.com', '123imaboss', 'Frank J Fletcher');

-- Seeding a student example
INSERT INTO students (st_email, st_password, st_name) VALUES ('student@yahoo.com', '321imlame', 'Geoffrey with a G');

-- Seeding an interview example
INSERT INTO interviews (ta_id, st_id, in_date, in_time, in_completed, in_comments) 
VALUES (1, 1, '2023-08-09', '10:30:00', false, 'Who names their kid Geoffrey');