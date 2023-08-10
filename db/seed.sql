-- Example seed file (will be edited later for actual data) 

-- Seeding an admin example
INSERT INTO admins (ad_email, ad_password, ad_name) VALUES ('admin@badass.com', 'over9000', 'Michael Jordan');

-- Seeding a teacher example
INSERT INTO teachers (ta_email, ta_password, ta_name) VALUES ('teacher@hotmail.com', '123imaboss', 'Frank J Fletcher');

-- Seeding a student example
INSERT INTO students (st_email, st_password, st_name) VALUES ('student@yahoo.com', '321imlame', 'Geoffrey with a G');

-- Seeding an interview example
INSERT INTO interviews (ta_id, st_id, in_date, in_time, in_completed, in_comments) 
VALUES (1, 1, '2023-08-09', '10:30:00', false, 'Who names their kid Geoffrey');

-- Seeding a chat message example
INSERT INTO chat (chat_sender_name, chat_time, chat_message)
VALUES ('Frank J Fletcher', '10:35:00', 'Bro your name is really, really dumb');

-- Seeding a runtime example
INSERT INTO runtime (runtime_input, runtime_output)
VALUES ('console.log("Hello world!")', 'Hello world!');