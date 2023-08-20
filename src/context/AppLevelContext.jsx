/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useState, createContext } from "react";

const AppLevelContext = createContext();

export const AppLevelProvider = ({ children }) => {
  const [loginTeacher, setLoginTeacher] = useState(false);
  const [loginStudent, setLoginStudent] = useState(false);
  const [userData, setUserData] = useState({});
  const [accountType, setAccountType] = useState("teacher"); //Default state is teacher

  const toggleTeacher = () => {
    setLoginTeacher(!loginTeacher);
  };

  const toggleStudent = () => {
    setLoginStudent(!loginStudent);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const role = accountType;
    let verify = {};
    try {
      const body_email = signInEmail.value;
      const body_password = signInPassword.value;
      if (role === "teacher") {
        verify = {
          ta_email: body_email,
          ta_password: body_password,
        };
      } else if (role === "student") {
        verify = {
          st_email: body_email,
          st_password: body_password,
        };
      }

      //interpolate the role into the string
      const response = await fetch(
        `https://collab-code.onrender.com/api/auth/signIn/${role}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verify),
          credentials: 'include',
        }
      );

      if (response.status !== 200) {
        alert(
          "Error signing in, Please verify Role email and password are correct."
        );
      } else {
        const { accesstoken } = await response.json();
        //interpolate the role into the string
        const responseUserData = await fetch(
          `https://collab-code.onrender.com/api/auth/protected/${role}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: accesstoken,
            },
          }
        );

        if (responseUserData.status != 200) {
          console.log(
            "Got an error getting the user object it is " + responseUserData
          );
        } else {
          const Data2 = await responseUserData.json();
          setUserData(Data2);
          alert(Data2.message);
          if (role === "teacher") {
            toggleTeacher();
          } else if (role === "admin") {
            toggleAdmin();
          } else if (role === "student") {
            toggleStudent();
          }
        }
      }
    } catch (error) {
      alert(error.message);
      console.error(error.message);
    }
  };

  const handleAcctCreation = async (e) => {
    e.preventDefault();
    const role = accountType;
    let verify = {};
    try {
      const body_email = signUpEmail.value;
      const body_password = signUpPassword.value;
      const body_name = signUpName.value;
      if (role === "teacher") {
        const body_code = teacherCode.value;
        verify = {
          ta_email: body_email,
          ta_password: body_password,
          ta_name: body_name,
          ta_code: body_code,
        };
      } else if (role === "student") {
        verify = {
          st_email: body_email,
          st_password: body_password,
          st_name: body_name,
        };
      }
      const response = await fetch(
        `https://collab-code.onrender.com/api/auth/register/${role}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verify),
        }
      );
      if (response.status != 200) {
        alert(
          "Error Registering Account, Please verify Account type, email and password are correct."
        );
      } else {
        const SignInResponse = await fetch(
          `https://collab-code.onrender.com/api/auth/signIn/${role}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verify),
          }
        );

        if (SignInResponse.status != 200) {
          alert(
            "Error signing in, Please verify Role email and password are correct."
          );
        } else {
          const data = await SignInResponse.json();
          //interpolate the role into the string
          const responseUserData = await fetch(
            `https://collab-code.onrender.com/api/auth/protected/${role}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                token: data.accesstoken,
              },
            }
          );
          if (responseUserData.status != 200) {
            console.log(
              "Got an error getting the user object it is " +
                responseUserData.statusText
            );
          } else {
            const Data2 = await responseUserData.json();
            setUserData(Data2);
            alert(Data2.message);
            if (role === "teacher") {
              toggleTeacher();
            } else if (role === "student") {
              toggleStudent();
            }
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AppLevelContext.Provider
      value={{
        loginTeacher,
        setLoginTeacher,
        loginStudent,
        setLoginStudent,
        handleSignin,
        userData,
        setAccountType,
        handleAcctCreation,
      }}
    >
      {children}
    </AppLevelContext.Provider>
  );
};

export default AppLevelContext;
