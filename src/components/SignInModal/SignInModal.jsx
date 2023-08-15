import { useState } from "react";

const SignInModal = () => {
    const [signIn, setSignIn] = useState(true);

    const toggleState = () => {
        setSignIn(!signIn);
    }

    const SignInModal = () => (
        <div
            id="SignInModal"
            style={{
                'backgroundImage': 'linear-gradient(90deg, #ffa500b0, #ffc0cbc9)',
                'minHeight': '640px',
                'padding': '2% 0'
            }}
        >
            <div
                className="m-auto bg-white p-5"
                style={{
                    'maxWidth': '800px',
                    'borderRadius': '20px',
                    'boxShadow': '3px 4px 17px #00000026'
                }}
            >
                <form
                    className="text-3xl p-6 flex flex-col"
                >
                    <label htmlFor="signin-email" className="pt-4">Email: </label>
                    <input
                        type="email"
                        id="signin-email"
                        name="signin-email"
                        required
                        className="bg-gray-200 p-2"
                        style={{
                            'borderRadius': '10px',
                            'boxShadow': '0px 0px 3px 0px inset'
                        }}
                    />
                    <label htmlFor="signin-password" className="pt-4">Password: </label>
                    <input
                        type="text"
                        id="signin-password"
                        name="signin-password"
                        required
                        className="bg-gray-200 p-2"
                        style={{
                            'borderRadius': '10px',
                            'boxShadow': '0px 0px 3px 0px inset'
                        }}
                    />
                    <button
                        type="submit"
                        className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    className="pl-6 text-xl"
                    onClick={toggleState}
                >
                    Register here
                </button>
            </div>
        </div>
    )

    const SignUpModal = () => (
        <div
            id="SignUpModal"
            style={{
                'backgroundImage': 'linear-gradient(90deg, #ffa500b0, #ffc0cbc9)',
                'minHeight': '640px',
                'padding': '2% 0'
            }}
        >
            <div
                className="m-auto bg-white p-5"
                style={{
                    'maxWidth': '800px',
                    'borderRadius': '20px',
                    'boxShadow': '3px 4px 17px #00000026'
                }}
            >
                <form
                    className="text-3xl p-6 flex flex-col"
                >
                    <label htmlFor="signup-email" className="pt-4">Email: </label>
                    <input
                        type="email"
                        id="signup-email"
                        name="signup-email"
                        required
                        className="bg-gray-200 p-2"
                        style={{
                            'borderRadius': '10px',
                            'boxShadow': '0px 0px 3px 0px inset'
                        }}
                    />
                    <label htmlFor="signup-password" className="pt-4">Password: </label>
                    <input
                        type="text"
                        id="signup-password"
                        name="signin-password"
                        required
                        className="bg-gray-200 p-2"
                        style={{
                            'borderRadius': '10px',
                            'boxShadow': '0px 0px 3px 0px inset'
                        }}
                    />
                    <label htmlFor="signup-password-confirmation" className="pt-4">Confirm Password: </label>
                    <input
                        type="text"
                        id="signup-password-confirmation"
                        name="signup-password-confirmation"
                        required
                        className="bg-gray-200 p-2"
                        style={{
                            'borderRadius': '10px',
                            'boxShadow': '0px 0px 3px 0px inset'
                        }}
                    />
                    <button
                        type="submit"
                        className="text-lg md:text-xl lg:text-2xl font-medium bg-orange-500 hover:bg-orange-400 text-white py-2 px-4 rounded-md transition duration-300 w-24 m-auto mt-4"
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={toggleState}
                    className="pl-6 text-xl"
                >
                    Already a member? Log in
                </button>
            </div>
        </div>
    )

    if (signIn) {
        return <SignInModal />;
    } else {
        return <SignUpModal />;
    }


}

export default SignInModal;