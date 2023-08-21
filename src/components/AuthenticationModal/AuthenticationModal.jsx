import { useContext } from "react";
import AuthenticationModalContext from "../../context/AuthenticationModalContext";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

const AuthenticationModal = () => {
  const { signIn } = useContext(AuthenticationModalContext);

  if (signIn) {
    return <SignInModal />;
  } else {
    return <SignUpModal />;
  }

};

export default AuthenticationModal;
