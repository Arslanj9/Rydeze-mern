import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, error, setError } = useAuth(); // Use context
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => {
                setError(null); // Reset error after 5 seconds
            }, 4000);
        }

        // Cleanup function to clear the timer if the component unmounts or error changes
        return () => clearTimeout(timer);
    }, [error]);

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(userId, password); // Call login from context

        localStorage.getItem("userId")
            ? navigate("/")
            : console.log("User is not logged in");
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="flex flex-col p-4 items-center justify-center mt-3 sm:mt-16 bg-[#13162e] z-2">
            <h2 className="text-3xl font-semibold text-center bg-transparent mb-10">
                ryd
                <span className="text-[#4b9eff]">pool</span>
            </h2>
            <div className="w-full max-w-md p-3 space-y-6 bg-[#21243D] bg-opacity-40 rounded-lg shadow-lg">
                <h2 className="text-1xl font-semibold text-center bg-transparent">
                    Login
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-6 bg-transparent"
                >
                    <div>
                        <input
                            id="userId"
                            name="userId"
                            type="text"
                            required
                            value={userId}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-100 border-opacity-30 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                            placeholder="Enter your userId"
                        />
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-100 border-opacity-30 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-4 bg-green-300 right-3 flex items-center cursor-pointer"
                        >
                            {showPassword ? (
                                <span className="material-symbols-outlined ">
                                    visibility_off
                                </span>
                            ) : (
                                <span className="material-symbols-outlined">
                                    visibility
                                </span>
                            )}
                        </span>
                    </div>
                    {error && (
                        <p className="text-red-500 text-center bg-transparent">
                            {error}
                        </p>
                    )}{" "}
                    {/* Display error if any */}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white bg-[#4b9eff] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-sm text-gray-400 font-semibold bg-transparent mt-10">
                    For registration, please contact developer
                </h2>

                <div className="mt-5 space-x-4 flex">
                    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
                        <h2 className="text-lg text-center bg-transparent text-gray-300 font-semibold mb-1">
                            Commuter Login
                        </h2>
                        <p className="text-sm text-gray-400 bg-transparent">
                            <span className="font-medium text-white bg-transparent">
                                User ID:
                            </span>{" "}
                            C03 &nbsp;|&nbsp;
                            <span className="font-medium text-white bg-transparent">
                                Password:
                            </span>{" "}
                            c3
                        </p>
                    </div>

                    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
                        <h2 className="text-lg text-center bg-transparent text-gray-300 font-semibold mb-1">
                            Host Login
                        </h2>
                        <p className="text-sm text-gray-400 bg-transparent">
                            <span className="font-medium text-white bg-transparent">
                                User ID:
                            </span>{" "}
                            H03 &nbsp;|&nbsp;
                            <span className="font-medium text-white bg-transparent">
                                Password:
                            </span>{" "}
                            h3
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
