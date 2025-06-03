import { useProfile } from "../context/ProfileContext";
import { useState, useEffect } from "react";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "https://rydeze-mern-backend.onrender.com";

const Profile = () => {
    const { userData, selectedRole } = useProfile();
    const [activeTab, setActiveTab] = useState("about");
    const [isEditing, setIsEditing] = useState(false);
    const [aboutText, setAboutText] = useState("");

    useEffect(() => {
        if (userData) {
            setAboutText(userData.about || "");
        }
    }, [userData]);

    if (!userData) return <p className="text-center mt-20">Loading...</p>;

    const handleSave = async () => {
        try {
            // Example API call to update About section
            const response = await fetch(
                `${apiUrl}/api/users/${userData.userId}/update-about`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ about: aboutText }),
                }
            );
            if (!response.ok) throw new Error("Failed to update About section");

            // You may want to update userData in context or refetch profile here
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert("Failed to update About section");
        }
    };

    return (
        <div className="px-4">
            {/* <h1 className="text-2xl text-center mb-5 p-3 mx-auto max-w-md rounded-lg bg-[#292d49] w-full">Profile</h1> */}

            <div className="flex flex-col items-center mb-5 max-w-md mx-auto rounded-lg shadow-md overflow-hidden border border-gray-100 border-opacity-30">
                {/* Image, Name and Reviews */}
                <div className="bg-[#292d4988] py-3 flex flex-col items-center gap-3 w-full">
                    {userData.profilePic ? (
                        <img
                            className="w-16 h-16 rounded-full sm:w-24 sm:h-24"
                            src={`${apiUrl}${userData.profilePic}`}
                            alt="profile"
                        />
                    ) : (
                        <img
                            className="w-14 h-14 pt-2 rounded-full sm:w-24 sm:h-24"
                            src={"./assets/icons/person-icon.png"}
                            alt="profile"
                        />
                    )}
                    <div className="flex flex-col bg-transparent justify-center items-center">
                        <h2 className="text-xl font-semibold bg-transparent mb-1">
                            {userData.name}
                        </h2>
                        <p className="text-xs text-yellow-500 bg-transparent">
                            ⭐ {userData.rating} Rating
                        </p>
                        <p className="text-xs text-gray-400 bg-transparent">
                            {userData.reviews} Reviews
                        </p>
                    </div>
                </div>

                {/* About and Review details */}
                <div className="mb-3">
                    {isEditing ? (
                        <textarea
                            className="w-64 m-3 p-1 border border-gray-500 rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={3}
                            value={aboutText}
                            onChange={(e) => setAboutText(e.target.value)}
                            placeholder="Tell us about yourself..."
                        />
                    ) : (
                        <p className="text-gray-300 text-left m-3">
                            {aboutText || "No About info provided."}
                        </p>
                    )}
                </div>

                {/* About Section */}
                {/* <div className="mb-6">
                    {isEditing ? (
                        <textarea
                            className="w-64 m-3 border border-gray-500 rounded-md text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.about}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    about: e.target.value,
                                })
                            }
                            placeholder="Tell us about yourself..."
                            rows={4}
                        />
                    ) : (
                        <p className="text-gray-300 text-left m-3">
                            {userData.about}
                        </p>
                    )}
                </div> */}

                {/* User and Vehicle Details */}
                <div>
                    {/* User Details */}
                    <div className="flex flex-col mb-8 space-y-2">
                        <p className="text-gray-200">
                            <strong className="text-blue-400">
                                Current Role:
                            </strong>{" "}
                            {userData.userRole.toUpperCase()}
                        </p>
                        <p className="text-gray-200">
                            <strong className="text-blue-400">
                                Contact Info:
                            </strong>{" "}
                            {userData.contactNumber}
                        </p>
                        <p className="text-gray-200">
                            <strong className="text-blue-400">
                                Designation:
                            </strong>{" "}
                            {userData.designation}
                        </p>
                        <p className="text-gray-200">
                            <strong className="text-blue-400">
                                Department:
                            </strong>{" "}
                            {userData.department}
                        </p>
                        <p className="text-gray-200">
                            <strong className="text-blue-400">
                                Work City:
                            </strong>{" "}
                            {userData.workCity}
                        </p>
                    </div>

                    {/* Vehicle details (only for Host) */}
                    {selectedRole === "host" &&
                        userData.vehicles &&
                        userData.vehicles.length > 0 && (
                            <div className="flex flex-col items-center space-y-3">
                                <h3 className="text-lg font-semibold">
                                    Vehicles
                                </h3>
                                {userData.vehicles.map((vehicle, index) => (
                                    <div key={index} className="text-gray-400">
                                        <p>
                                            <strong>Make:</strong>{" "}
                                            {vehicle.make}
                                        </p>
                                        <p>
                                            <strong>Model:</strong>{" "}
                                            {vehicle.model}
                                        </p>
                                        <p>
                                            <strong>Year:</strong>{" "}
                                            {vehicle.year}
                                        </p>
                                        <p>
                                            <strong>License Plate:</strong>{" "}
                                            {vehicle.licensePlate}
                                        </p>
                                        {vehicle.images &&
                                            vehicle.images.length > 0 && (
                                                <div className="flex space-x-2">
                                                    {vehicle.images.map(
                                                        (image, imgIndex) => (
                                                            <img
                                                                key={imgIndex}
                                                                src={image}
                                                                alt="Vehicle"
                                                                className="w-16 h-16 rounded"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        )}
                </div>

                {/* Edit / Save buttons */}
                <div className="flex justify-center mb-5">
                    {isEditing ? (
                        <div className="w-full flex gap-3">
                            <button
                                onClick={handleSave}
                                className="px-20 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-20 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full px-32 py-2 text-white bg-[#4b9eff] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
                        >
                            Edit About
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
