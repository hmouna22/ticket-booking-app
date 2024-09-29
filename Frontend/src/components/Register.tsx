import React, { useReducer, useState } from "react";
import ticket from '../assets/ticket.jpg';
import Footer from "./Footer";

interface StateType {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const initialState: StateType = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function reducer(state: StateType, action: { type: string; payload: string }) {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setPhone":
      return { ...state, phone: action.payload };
    case "setConfirmPassword":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
}

interface Props {
  register: (obj: StateType) => void
}

export default function Register({ register }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (
      state.name.trim() === "" ||
      state.email.trim() === "" ||
      state.phone.trim() === "" ||
      state.password.trim() === "" ||
      state.confirmPassword.trim() === ""
    ) {
      setError("All fields are mandatory.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      setError("Invalid email address.");
      return false;
    }

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(state.phone)) {
      setError("Phone number must be 8 digits.");
      return false;
    }

    if (state.password.length < 6 || !/\d/.test(state.password)) {
      setError("Password must be at least 6 characters long and contain a number.");
      return false;
    }

    if (state.password !== state.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      // Form is valid, proceed with registration
      register(state);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-white-50">
        <div className="w-1/2 p-6 flex flex-col items-center justify-center">
          <h3 className="text-3xl text-center py-6 text-gray-700 font-semibold">Catch the Next Bus - Register & Book Your Ride!</h3>
          <img className="max-h-full max-w-full" src={ticket} alt="Ticket" />
        </div>

        <div className="w-1/2 p-6">
          <div className="w-full px-6 py-4 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "setName", payload: e.target.value })
                    }
                    type="text"
                    name="name"
                    className="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "setEmail", payload: e.target.value })
                    }
                    type="email"
                    name="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Phone
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "setPhone", payload: e.target.value })
                    }
                    type="tel"
                    name="phone"
                    className="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "setPassword", payload: e.target.value })
                    }
                    type="password"
                    name="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) =>
                      dispatch({
                        type: "setConfirmPassword",
                        payload: e.target.value,
                      })
                    }
                    type="password"
                    name="password_confirmation"
                    className="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
              <a href="#" className="text-xs text-green-600 hover:underline">
                Forget Password?
              </a>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              <div className="flex items-center mt-4">
                <button
                  onClick={handleRegister}
                  className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700`}
                >
                  Register
                </button>
              </div>
            </form>
            <div className="mt-4 text-grey-500">
              Already have an account?{" "}
              <span>
                <a className="text-green-500 hover:underline" href="#">
                  Log in
                </a>
              </span>
            </div>
            <div className="flex items-center w-full my-4">
              <hr className="w-full" />
              <p className="px-3 ">OR</p>
              <hr className="w-full" />
            </div>
            <div className="my-6 space-y-2">
              <button
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
