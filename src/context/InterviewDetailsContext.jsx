/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const InterviewDetailsContext = createContext();
export const InterviewDetailsProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState({});

  useEffect(() => {
    const getTeacherData = async () => {
      try {
        // Using the refresh token to get an access token
        const verifyRefresh = await fetch(
          "https://collab-code.onrender.com/api/auth/refresh_token/student",
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
          "https://collab-code.onrender.com/api/auth/protected/student",
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
          setCurrentStudent(verifyAccessData)
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getTeacherData();
  }, [])

  return (
    <InterviewDetailsContext.Provider value={{ currentStudent }}>
      {children}
    </InterviewDetailsContext.Provider>
  )
}

export default InterviewDetailsContext;
