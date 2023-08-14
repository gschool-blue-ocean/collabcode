import { useState } from "react";

const SignInModal = () => {
    const [signIn, setSignIn] = useState(true);

    const toggleState = () => {
        setSignIn(!signIn);
    }

    const SignInModal = () => (
        <div id="SignInModal">
            This is the SignInModal component
            <div>
                <form>
                    <label htmlFor="signin-email">Email: </label>
                    <input type="email" id="signin-email" name="signin-email" required/><br></br>
                    <label htmlFor="signin-password">Password: </label>
                    <input type="text" id="signin-password" name="signin-password" required/><br></br>
                    <button type="submit">Sign In</button>
                </form>
                <button onClick={toggleState}>Register here</button>
            </div>
        </div>
    )

    const SignUpModal = () => (
        <div id="SignUpModal">
            This is the SignUpModal component
            <div>
                <form>
                    <label htmlFor="signup-email">Email: </label>
                    <input type="email" id="signup-email" name="signin-email" required/>
                    <label htmlFor="signup-password">Password: </label>
                    <input type="text" id="signup-password" name="signin-password" required/>
                    <label htmlFor="signup-password-confirmation">Confirm Password: </label>
                    <input type="text" id="signup-password-confirmation" name="signup-password-confirmation" required></input>
                    <button type="submit">Sign Up</button>
                </form>
                <button onClick={toggleState}>Already a member? Log in</button>
            </div>
        </div>
    )
    
    if (signIn) {
        return <SignInModal/>;
    } else {
        return <SignUpModal/>;
    }


}

export default SignInModal;