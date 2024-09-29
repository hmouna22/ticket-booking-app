import { useState, useEffect } from 'react';
import Footer from './Footer';

interface Props {
    login: (email: string, password: string) => void;
}

export default function Login({ login }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        // Check if both email and password are valid
        setFormValid(emailError === "" && passwordError === "" && email !== "" && password !== "");
    }, [email, password, emailError, passwordError]);

    const validateEmail = (input: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input.trim()) {
            setEmailError("Email is required");
        } else if (!emailRegex.test(input)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = (input: string) => {
        if (!input.trim()) {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValid) {
            login(email, password);
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-green-500 underline">
                    Sign in
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md 
                                ${emailError ? 'border-red-500' : 'focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40'}`}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md 
                                ${passwordError ? 'border-red-500' : 'focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40'}`}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <a
                        href="#"
                        className="text-xs text-green-500 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={!formValid}
                            className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md 
                                ${!formValid && 'opacity-50 cursor-not-allowed'}
                                hover:bg-green-700 focus:outline-none focus:bg-green-700`}
                        >
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-green-500 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
            <Footer />
        </div>
    );
}
