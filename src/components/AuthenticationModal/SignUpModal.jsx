import { useState, useContext } from "react";
import AuthenticationModalContext from "../../context/AuthenticationModalContext";

const SignUpModal = () => {
  const [signUpInputs, setSignUpInputs] = useState({
    signUpEmail: "",
    signUpPassword: "",
    confirmPassword: "",
  });

  const { toggleSignInState } = useContext(AuthenticationModalContext);
  const { signUpEmail, signUpPassword, confirmPassword } = signUpInputs;

  const handleChange = (e) => {
    setSignUpInputs({
      ...signUpInputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        id="SignUpModal"
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
            <label htmlFor="signup-email" className="pt-4">
              Email:{" "}
            </label>
            <input
              type="email"
              id="signUpEmail"
              name="signUpEmail"
              required
              className="bg-gray-200 p-2"
              value={signUpEmail}
              onChange={(e) => handleChange(e)}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 3px 0px inset",
              }}
            />
            <label htmlFor="signup-password" className="pt-4">
              Password:{" "}
            </label>
            <input
              type="password"
              id="signUpPassword"
              name="signUpPassword"
              required
              className="bg-gray-200 p-2"
              value={signUpPassword}
              onChange={(e) => handleChange(e)}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 3px 0px inset",
              }}
            />
            <label htmlFor="signup-password-confirmation" className="pt-4">
              Confirm Password:{" "}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="bg-gray-200 p-2"
              value={confirmPassword}
              onChange={(e) => handleChange(e)}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 3px 0px inset",
              }}
            />
            <button
              type="submit"
              className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4"
            >
              Sign Up
            </button>
          </form>
          <button onClick={toggleSignInState} className="pl-6 text-xl">
            Already a member? Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUpModal;
