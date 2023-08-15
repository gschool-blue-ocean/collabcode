/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext } from "react";


const AppLevelContext = createContext();

export const AppLevelProvider = ({ children }) => {
  const [loginTeacher, setLoginTeacher] = useState(false);
  const [userData, setUserData] = useState({});

  const toggleTeacher = () => {
    setLoginTeacher(!loginTeacher);
  };

  //Getting Data for Teacher Component

  //Selection to pick the role of who is signing in
  //Use role as parameter to fill in which request is being authenticated

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      //Role ie(admin, teacher, student)
      const body_email = signInEmail.value;
      const body_password = signInPassword.value;

      const verify = {
        //if role === admin
        ta_email: body_email,
        ta_password: body_password,
      };
      //interpolate the role into the string
      const response = await fetch(
        "https://collab-code.onrender.com/api/auth/signIn/teacher",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verify),
        }
      );

      if (response.status != 200) {
        console.log(response.statusText);
      } else {
        const data = await response.json();
        //interpolate the role into the string
        const responseUserData = await fetch(
          "https://collab-code.onrender.com/api/auth/protected/teacher",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: data.accesstoken,
            },
          }
        );

        if (responseUserData.status !== 200) {
          console.log(
            "Got an error getting the user object it is " +
              responseUserData.statusText
          );
        } else {
          const teacherData = await responseUserData.json();
          setUserData(teacherData);
          alert(teacherData.message);
          toggleTeacher();
          // if (teacherData.type === "success") {
          //   <Navigate to="/api/auth/signIn/teacher" replace={true} />;
          // }
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
        handleSignin,
        userData,
      }}
    >
      {children}
    </AppLevelContext.Provider>
  );
};

export default AppLevelContext;
