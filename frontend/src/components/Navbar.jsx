import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userRole, setUserRole] = useState(() =>
        localStorage.getItem("userRole")
    );
    const { logout } = useAuth(); // Destructure logout from useAuth
    const navigate = useNavigate();

    // Handle the logout process
    const handleLogout = () => {
        logout();
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <nav className="relative z-50 top-auto left-auto w-auto sm:relative sm:top-0 sm:left-0 sm:w-full sm:z-50 bg-[#13162e] text-white px-4 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Section: NavLinks */}

                <div className="hidden sm:flex sm:items-center gap-8">
                    <Link to="/profile" className="text-center">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            person
                        </span>
                        <h1 className="text-gray-200 text-xs">Profile</h1>
                    </Link>

                    {userRole === "commuter" ? (
                        <Link to="/" className="text-center">
                            <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                                airport_shuttle
                            </span>
                            <h1 className="text-gray-200 text-xs">Hosts</h1>
                        </Link>
                    ) : (
                        <Link to="/" className="text-center">
                            <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                                escalator_warning
                            </span>
                            <h1 className="text-gray-200 text-xs">Commuters</h1>
                        </Link>
                    )}

                    {/* Publish Icon */}
                    {/* <a href="/publish" className="text-center">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            add_circle
                        </span>
                        <h1 className="text-gray-200 text-xs">Publish</h1>
                    </a> */}

                    {/* Publish Page Button */}
                    <Link to="/publish" className="text-center">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            add_circle
                        </span>
                        <h1 className="text-gray-200 text-xs">Publish</h1>
                    </Link>

                    {/* <a href="/myListings" className="text-center">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            edit
                        </span>
                        <h1 className="text-xs">My Listings</h1>
                    </a> */}

                    {/* My Listings Page Button */}
                    <Link to="/myListings" className="text-center">
                        <span className="material-symbols-outlined text-xl hover:text-zinc-400">
                            edit
                        </span>
                        <h1 className="text-gray-200 text-xs">My Listings</h1>
                    </Link>

                    {/* Inbox Icon (Non-Clickable) */}
                    <div className=" pointer-events-none text-center">
                        <span className="material-symbols-outlined text-xl text-gray-500">
                            chat
                        </span>
                        <h1 className="text-gray-500 text-xs">Inbox</h1>
                    </div>
                </div>

                {/* Right Section: Sign In Button */}
                <div className="hidden sm:flex">
                    <button
                        // href="/login"
                        onClick={handleLogout}
                        className="text-white bg-red-700 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 px-6 py-1"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu Icon */}
                <div
                    className="sm:hidden flex justify-between w-full items-center"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <h2 className="text-xl ml-2">
                        ryd
                        <span className="text-[#4b9eff]">pool</span>
                    </h2>
                    <button className="text-white focus:outline-none mr-2">
                        <IoMenu className="text-lg" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full rounded-lg bg-[#292d49]">
                    {/* Profile Icon */}
                    {/* <a
                        href="/profile"
                        className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white bg-transparent"
                    >
                        <span className="material-symbols-outlined text-2xl hover:text-zinc-400 bg-transparent">
                            person
                        </span>
                        <h1 className="text-gray-200 text-lg bg-transparent">
                            Profile
                        </h1>
                    </a> */}

                    <Link
                        to="/profile"
                        className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white bg-transparent"
                    >
                        <span className="material-symbols-outlined text-2xl hover:text-zinc-400 bg-transparent">
                            person
                        </span>
                        <h1 className="text-gray-200 text-lg bg-transparent">
                            Profile
                        </h1>
                    </Link>

                    {userRole === "commuter" ? (
                        <Link
                            to="/"
                            className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white bg-transparent"
                        >
                            <span className="material-symbols-outlined text-2xl hover:text-zinc-400 bg-transparent">
                                airport_shuttle
                            </span>
                            <h1 className="text-gray-200 text-lg bg-transparent">
                                Hosts
                            </h1>
                        </Link>
                    ) : (
                        <Link
                            to="/"
                            className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white bg-transparent"
                        >
                            <span className="material-symbols-outlined text-2xl hover:text-zinc-400 bg-transparent">
                                escalator_warning
                            </span>
                            <h1 className="text-gray-200 text-lg bg-transparent">
                                Commuters
                            </h1>
                        </Link>
                    )}

                    {/* Publish Icon */}

                    <Link
                        to="/publish"
                        className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white bg-transparent"
                    >
                        <span className="material-symbols-outlined text-2xl hover:text-zinc-400 bg-transparent">
                            add_circle
                        </span>
                        <h1 className="text-gray-200 text-lg bg-transparent">
                            Publish
                        </h1>
                    </Link>

                    {/* Edit Publish Icon (Non-Clickable) */}
                    
                    <Link
                        to="/myListings"
                        className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white bg-transparent"
                    >
                        <span className="material-symbols-outlined text-2xl hover:text-zinc-400 bg-transparent">
                            edit
                        </span>
                        <h1 className="text-gray-200 text-lg bg-transparent">
                            My Listings
                        </h1>
                    </Link>

                    {/* Inbox Icon (Non-Clickable) */}
                    <div className="flex gap-3 items-center py-3 px-4 hover:bg-gray-700 text-white pointer-events-none bg-transparent">
                        <span className="material-symbols-outlined text-2xl text-gray-500 bg-transparent">
                            chat
                        </span>
                        <h1 className="text-lg text-gray-500 bg-transparent">
                            Inbox
                        </h1>
                    </div>

                    <div className="flex px-12 mt-6 bg-[#13162e] mb-6 z-50 bg-transparent">
                        <button
                            onClick={handleLogout}
                            className="text-white px-6 py-2 border bg-transparent border-gray-300 rounded-lg w-full text-center hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
