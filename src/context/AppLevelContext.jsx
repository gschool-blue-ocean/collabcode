/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, createContext } from 'react';
//NEED TO CHANGE URL TO SITE URL WHEN DEPLOYED
const pageURL = 'http://localhost:8000';

const AppLevelContext = createContext();

export const AppLevelProvider = ({ children }) => {
  const [loginTeacher, setLoginTeacher] = useState(false);

  const toggleTeacher = () => {
    setLoginTeacher(!loginTeacher)
  }

  //Getting Data for Teacher Component
    const handleSignin = async (e) => {
      e.preventDefault();
      try {
          const body = {signInEmail, signInPassword}
          
          const response = await fetch('https://collab-code.onrender.com/api/auth/signIn/teacher', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(
                body.signInEmail.value,
                body.signInPassword.value
                )
          })
          
          if(response.status != 200) {
              console.log(response.statusText);
          } else {
              const data = await response.json()
              console.log(data);

              const responseUserData = await fetch('https://collab-code.onrender.com/api/auth/protected/teacher', {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "token": data.token
              }
              
          })

          if(responseUserData.status != 200) {
              console.log("Got an error getting the user object it is " + responseUserData.statusText)
          } else {
              const userData = await responseUserData.json();
              console.log(userData);
              toggleTeacher()
          }
          }       
      } catch (error) {
          console.error(error.message)
      }
  }

  return (
    <AppLevelContext.Provider
      value={{
        loginTeacher, setLoginTeacher, handleSignin
       }}
    >
      {children}
    </AppLevelContext.Provider>
  );
};

export default AppLevelContext;
