/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

const AuthenticationModalContext = createContext();

export const AuthenticationModalProvider = ({ children }) => {
    const [signIn, setSignIn] = useState(true);
    const [modalRole, setModalRole] = useState('teacher');

    const teacherModal = () => {
        setModalRole("teacher");
    }

    const studentModal = () => {
        setModalRole("student");
    }

    const toggleSignInState = () => {
        setSignIn(!signIn);
    };

    return (
        <AuthenticationModalContext.Provider value={{
            signIn,
            toggleSignInState,
            modalRole,
            teacherModal,
            studentModal
        }}>
            {children}
        </AuthenticationModalContext.Provider>
    )
}

export default AuthenticationModalContext;