## Collab Code ##

Contributors

Bao Tran
Brayan Torres
Dylan Gordon
Matthew Hopper
Nathanael Blocher

This project was a 3-week collection of sprints where we, the contributors, accomplished MVP for an external client Phil.

## What is Collab Code? ##

The primary product that Collab Code provides is a space designed for interviewing potential students, applicants, or job candidates (heretofore referred to as students). The space is designed for the interviewer (heretofore referred to as the teacher) to be able to jointly view, create, and execute JavaScript code in a Monaco runtime environment. The interview space is also equipped with a timer utility and space for the teacher to take notes.

Students and teachers are both able to create accounts and log into the application. 

The teachers' homepage is designed to provide a list of upcoming scheduled interviews, complete with student information, date/time, and ability to join the interview room. The teacher's page is also equipped with rudimentary utilities allowing the teacher to view, create, make updates to, and remove these upcoming scheduled appointments. A drop-down menu provides access to a list of students that have not yet performed an interview.

The students' homepage only gives access to their scheduled interview, if they have one.

As of the creation of this document, this project is deployed as a static site on Render (https://collab-code-static.onrender.com), with an accompanying web service for API, authorization, and web socket server.

## Technologies Used (Project) ##

The frontend is a React application, created with React + Vite and styled with Tailwind CSS where applicable (and CSS3 where more specific styling was necessary). The runtime environment was created using Monaco-Editor.

The server is a Node.js and Express.js application. The server utilizes express-validator for data validation and sanitation, ws for real-time updates to the Monaco runtime environment, and jwtAuthRouter for user authentication.

The database is created with PostgreSQL, and accessed using the pg library in the server file.

## Technologies Used (Project Management) ##

The project was organized as a single repository on Github, fed commands using git bash. New features were added via feature branches, which were merged after a group code review. Merge conflicts were resolved in Github's native editor or using VSCode's merge editor.

Collab Code was managed as an Atlassian (Jira) project. The project board was utilized as the primary ticketing system, and the project pages were utilized for internal documents and wikis. The entity relationship diagrams (ERD's) were created using DrawSQL.

## Expected Technical Challenges ##

1. WebSockets - researched to produce real-time updates to runtime environment. Primary research was performed by Dylan Gordon, with Nathanael Blocher and Matthew Hopper accompanying him on implementation.

2. jwAuthRouter - router utilized for user authentication. Bcrypt and refresh/web token routes were implemented in this special server that allows users to register and verify credentials using JSON web tokens. Primary research was performed by Brayan Torres, with Matthew Hopper accompanying him on implementation.

3. Monaco - imported runtime environment for frontend application. Utilized as a pre-formatted text area with a specified runtime language (JavaScript) that closely mirrors a code editor and console. Research and implementation was performed by Dylan Gordon.

## Unexpected Technical Challenges ##

1. NodeMailer - library utilized for sending e-mails thru the server-side application. The primary blocker was recognizing the limitation of the library in that its capabilities are limited to backend applications instead of the frontend React side. Primary research was performed by Matthew Hopper, with Dylan Gordan accompanying him on implementation.

2. Authentication - React's state is lost on page refresh, including user authentication state. This created an issue when the app-level context was cleared because the context is used to list interview data. Cookies and local storage were thereby utilized to maintain applicable state after triggering a page refresh. Issue was resolved by Brayan Torres.

## Developers' Comments ##

"You miss 100% of the shots you don't take -- Wayne Gretzky", said Brayan Torres when asked about the project's development in its final phase. He also noted that Hopper prefers the term "Scrum Lord" to scrum leader.

"I'd say working in this Agile methodology will... most often time blend together. We just have to find a way to come back to it." Matthew Hopper's inspirational comments about heading the final stage of the project as "scum" leader.

When asked about the Blue Ocean project as a whole, Gordon noted that the project was "equal parts interesting and frustrating. For every wall I hit... I learned big for every small step. Big learn."

"I'm so sick and tired of this project," Nathanael Blocher's frustration at the end of Blue Ocean.

When asked about his feelings involving the Blue Ocean project, legendary software developer Bao Tran said the project was "beneficially challenging. Having to redesign (the) initial project helped team collaboration."