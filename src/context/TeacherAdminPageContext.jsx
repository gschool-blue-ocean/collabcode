/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";

const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({});
  const [currentTeacher, setCurrentTeacher] = useState({});
  const [currentInterview, setCurrentInterview] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [showStudents, setShowStudents] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  //LOADS ALL THE STUDENTS FROM THE DATABASE
  useEffect(() => {
    const getStudents = async () => {
      const studentRes = await fetch(
        "https://collab-code.onrender.com/students"
      );
      const studentData = await studentRes.json();
      setPendingStudents(studentData);
    };

    getStudents();
  }, []);

  //VERIFIES THE TEACHER REFRESH TOKENS FROM THE COOKIES IN THE BROWSER
  useEffect(() => {
    const getTeacherData = async () => {
      try {
        if (isLoggedIn) {
          // Using the refresh token to get an access token
          const verifyRefresh = await fetch(
            "https://collab-code.onrender.com/api/auth/refresh_token/teacher",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          const verifyRefreshData = await verifyRefresh.json();

          // Using the refreshed access token to fetch protected data
          const verifyAccess = await fetch(
            "https://collab-code.onrender.com/api/auth/protected/teacher",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Token: verifyRefreshData.accessToken, // Corrected header name
              },
            }
          );

          // console.log(verifyAccess) //Expecting the Request from the successful refreshtoken
          // console.log(verifyAccessData) //Expecting teacher object

          if (verifyAccess.status !== 200) {
            const errorData = await verifyAccess.json();
          } else {
            const verifyAccessData = await verifyAccess.json();
            setCurrentTeacher(verifyAccessData);
            localStorage.setItem("teacherLoggedIn", "true");
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getTeacherData();
  }, [isLoggedIn]);

  //CONDITIONAL RENDERING FOR THE INTERVIEW LIST
  const handleClick = async (e) => {
    const id = e.currentTarget.id;
    // query the students table for the student information
    const st_results = await fetch(
      "https://collab-code.onrender.com/students/" + id
    );
    const st_data = await st_results.json();

    // query the interviews table for the student's interview information
    const in_results = await fetch(
      "https://collab-code.onrender.com/interviews?st_id=" + id
    );
    const in_data = await in_results.json();
    // set the current interview to the data fetched from the table

    // set the current student to the data fetched from the table, THEN
    setCurrentInterview(in_data);
    setCurrentStudent(st_data);
    // toggle showStudents
    setShowStudents(!showStudents);
    localStorage.setItem("currentName", st_data[0].st_name);
    console.log(localStorage.getItem("currentName"));
  };

  return (
    <TeacherAdminPageContext.Provider
      value={{
        pendingStudents,
        setPendingStudents,
        currentStudent,
        setCurrentStudent,
        currentTeacher,
        setCurrentTeacher,
        interviews,
        setInterviews,
        showStudents,
        setShowStudents,
        currentInterview,
        setCurrentInterview,
        handleClick,
      }}
    >
      {children}
    </TeacherAdminPageContext.Provider>
  );
};

export default TeacherAdminPageContext;
