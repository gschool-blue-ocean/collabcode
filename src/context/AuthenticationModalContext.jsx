import {  createContext, useContext, useState } from "react";

const AuthenticationModalContext = createContext();

export const AuthenticationModalProvider = ({ children }) => {
    const [signIn, setSignIn] = useState(true);

    const toggleSignInState = () => {
        setSignIn(!signIn);
    }

    return (
        <AuthenticationModalContext.Provider value={{
            signIn,
            toggleSignInState
        }}>
            {children}
        </AuthenticationModalContext.Provider>
    )
}

export default AuthenticationModalContext;