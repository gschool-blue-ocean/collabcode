import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthenticationModalContext from "../../context/AuthenticationModalContext";
import AppLevelContext from "../../context/AppLevelContext";
import DropDown from "./Dropdown";

const SignInModal = () => {
  const [signInInputs, setSignInInputs] = useState({
    signInEmail: "",
    signInPassword: "",
  });

  const { handleSignin, loginTeacher, userData } = useContext(AppLevelContext);
  const { toggleSignInState, modalRole } = useContext(
    AuthenticationModalContext
  );

  const { signInEmail, signInPassword } = signInInputs;

  const handleChange = (e) => {
    setSignInInputs({
      ...signInInputs,
      [e.target.name]: e.target.value,
    });
  };

  if (loginTeacher === true && userData.type === "success") {
    return <Navigate to="/api/auth/signIn/teacher" />;
  }

  if (modalRole === "teacher") {
    return (
      <>
        <div
          id="SignInModal"
          style={{
            backgroundImage: "linear-gradient(90deg, #ffa500b0, #ffc0cbc9)",
            minHeight: "640px",
            padding: "2% 0",
          }}
        >
          <div
            className="m-auto bg-white p-5"
            style={{
              maxWidth: "800px",
              borderRadius: "20px",
              boxShadow: "3px 4px 17px #00000026",
            }}
          >
            <form className="text-3xl p-6 flex flex-col">
              <DropDown />
              <h1>Teacher Login</h1>
              <label htmlFor="signin-email" className="pt-4">
                Email:{" "}
              </label>
              <input
                type="email"
                id="signInEmail"
                name="signInEmail"
                required
                className="bg-gray-200 p-2"
                value={signInEmail}
                onChange={(e) => handleChange(e)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 3px 0px inset",
                }}
              />
              <label htmlFor="signin-password" className="pt-4">
                Password:{" "}
              </label>
              <input
                type="password"
                id="signInPassword"
                name="signInPassword"
                required
                className="bg-gray-200 p-2"
                value={signInPassword}
                onChange={(e) => handleChange(e)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 3px 0px inset",
                }}
              />
              <button
                type="submit"
                className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4"
                onClick={(e) => handleSignin(e)}
              >
                Sign In
              </button>
            </form>
            <button className="pl-6 text-xl" onClick={toggleSignInState}>
              Register here
            </button>
          </div>
        </div>
      </>
    );
  } else if (modalRole === "student") {
    return (
      <>
        <div
          id="SignInModal"
          style={{
            backgroundImage: "linear-gradient(90deg, #ffa500b0, #ffc0cbc9)",
            minHeight: "640px",
            padding: "2% 0",
          }}
        >
          <div
            className="m-auto bg-white p-5"
            style={{
              maxWidth: "800px",
              borderRadius: "20px",
              boxShadow: "3px 4px 17px #00000026",
            }}
          >
            <form className="text-3xl p-6 flex flex-col">
              <DropDown />
              <h1>Student Login</h1>
              <label htmlFor="signin-email" className="pt-4">
                Email:{" "}
              </label>
              <input
                type="email"
                id="signInEmail"
                name="signInEmail"
                required
                className="bg-gray-200 p-2"
                value={signInEmail}
                onChange={(e) => handleChange(e)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 3px 0px inset",
                }}
              />
              <label htmlFor="signin-password" className="pt-4">
                Password:{" "}
              </label>
              <input
                type="password"
                id="signInPassword"
                name="signInPassword"
                required
                className="bg-gray-200 p-2"
                value={signInPassword}
                onChange={(e) => handleChange(e)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 3px 0px inset",
                }}
              />
              <button
                type="submit"
                className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4"
                onClick={(e) => handleSignin(e)}
              >
                Sign In
              </button>
            </form>
            <button className="pl-6 text-xl" onClick={toggleSignInState}>
              Register here
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default SignInModal;
