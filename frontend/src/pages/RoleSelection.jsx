import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function RoleSelection() {
    const [selectedRole, setSelectedRole] = useState(null);
    const { selectRole } = useAuth();
    const navigate = useNavigate();

    const handleConfirmSelection = () => {

        const userId = localStorage.getItem('userId');

        if (selectedRole && userId) {
            selectRole(selectedRole); // Call selectRole with the selected role
            navigate(`/`);
        } else {
            console.warn("Please select a role and ensure user is logged in.");
        }
    };





        return (
            <div className="flex items-center justify-center mt-3 sm:mt-16 bg-[#13162e] z-2">
                <div className="w-full max-w-md p-8 space-y-6 bg-[#21243D] bg-opacity-40 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold text-center bg-transparent">Select Role</h2>
                    <form className="mt-8 space-y-6 bg-transparent" onSubmit={(e) => e.preventDefault()}>
                        <div className="relative flex flex-col space-y-4">
                            <button
                                type="button"
                                onClick={() => setSelectedRole("host")}
                                className={`w-full p-3 border border-gray-100 border-opacity-30 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${selectedRole === "Admin" ? "ring-2 ring-indigo-500" : ""
                                    }`}
                            >
                                Host
                                <span className="ml-1 text-[0.8rem] text-gray-500">(Offer ride)</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedRole("commuter")}
                                className={`w-full p-3 border border-gray-100 border-opacity-30 bg-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${selectedRole === "User" ? "ring-2 ring-indigo-500" : ""
                                    }`}
                            >
                                Commuter
                                <span className="ml-1 text-[0.8rem] text-gray-500">(Request for ride)</span>
                            </button>

                        </div>

                        <button
                            type="button"
                            onClick={handleConfirmSelection}
                            className="w-full px-4 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
                        >
                            Confirm Selection
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    export default RoleSelection;
