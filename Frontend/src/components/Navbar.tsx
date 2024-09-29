import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    handleLogout: () => void;
}

export default function Navbar({ handleLogout }: Props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const renderLoggedInNavbar = () => (
        <div className="relative">
            <button className="flex items-center gap-1 focus:outline-none" onClick={toggleDropdown}>
                <span className="text-green-500 italic text-4xl">Welcome to TransTun</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-lg">
                    <li className="px-4 py-2 border-b">User Name</li>
                    <li className="px-4 py-2">
                        <Link to="/history">History</Link>
                    </li>
                    <li className="px-4 py-2">
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li className="px-4 py-2 cursor-pointer" onClick={() => handleLogout()}>
                        Logout
                    </li>
                </ul>
            )}
        </div>
    );

    const renderLoggedOutNavbar = () => (
        <ul className="list-none flex justify-center items-center ml-auto gap-5">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <div className="shadow-lg backdrop-blur-lg py-5 text-gray-900 bg-gray-50">
            <nav className="flex items-center container mx-auto">
                <div>
                    {localStorage.getItem('token') ? (
                        renderLoggedInNavbar()
                    ) : (
                        <Link to="/" className="text-green-500 italic text-4xl">
                            Welcome to TransTun
                        </Link>
                    )}
                </div>
                {localStorage.getItem('token') ? null : renderLoggedOutNavbar()}
            </nav>
        </div>
    );
}
