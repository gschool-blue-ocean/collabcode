/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from "react";

const TeacherAdminPageContext = createContext();

export const TeacherAdminPageProvider = ({ children }) => {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({});
  const [currentTeacher, setCurrentTeacher] = useState({});

  //Displays the Students in the Drop Down
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

  useEffect(() => {
    const getTeacherData = async () => {
      try {
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
        // if (verifyRefreshData.status !== 200) {
        //   alert("Error refreshing token...");
        // } else {
          // Using the refreshed access token to fetch protected data
          const verifyAccess = await fetch(
            "https://collab-code.onrender.com/api/auth/protected/teacher",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                token: verifyRefreshData.accessToken, // Corrected header name
              },
            }
          );
          if (verifyAccess.status !== 200) {
            const errorData = await verifyAccess.json();
            console.log("Error fetching protected data:", errorData);
          } else {
            const verifyAccessData = await verifyAccess.json();
            setCurrentTeacher(verifyAccessData)
          }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getTeacherData();
  }, [])
 
  // }, []);

  return (
    <TeacherAdminPageContext.Provider
      value={{
        pendingStudents,
        setPendingStudents,
        currentStudent,
        setCurrentStudent,
        currentTeacher,
        setCurrentTeacher
      }}
    >
      {children}
    </TeacherAdminPageContext.Provider>
  );
};

export default TeacherAdminPageContext;
