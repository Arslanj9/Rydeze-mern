import { useProfile } from '../context/ProfileContext';
import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
    const { userData, selectedRole } = useProfile();
    const [activeTab, setActiveTab] = useState("about");

    if (!userData) return <p className='text-center mt-20'>Loading...</p>;

    return (
        <div className='px-4'>

            {/* <h1 className="text-2xl text-center mb-5 p-3 mx-auto max-w-md rounded-lg bg-[#292d49] w-full">Profile</h1> */}

            <div className="flex flex-col items-center mb-5 max-w-md mx-auto rounded-lg shadow-md space-y-6 overflow-hidden border border-gray-100 border-opacity-30">

                {/* Image, Name and Reviews */}
                <div className='bg-[#292d4988] py-3 flex flex-col items-center gap-3 w-full'>
                    {userData.profilePic ? 
                        <img
                            className="w-16 h-16 rounded-full sm:w-24 sm:h-24"
                            src={`${apiUrl}${userData.profilePic}`}
                            alt="profile"
                        />  :
                        <img
                        className="w-14 h-14 pt-2 rounded-full sm:w-24 sm:h-24"
                        src={"./assets/icons/person-icon.png"}
                        alt="profile"
                        />    
                    }
                    <div className="flex flex-col bg-transparent justify-center items-center">
                        <h2 className="text-xl font-semibold bg-transparent mb-1">{userData.name}</h2>
                        <p className="text-xs text-yellow-500 bg-transparent">⭐ {userData.rating} Rating</p>
                        <p className="text-xs text-gray-400 bg-transparent">{userData.reviews} Reviews</p>
                    </div>
                </div>

                {/* About and Review details */}
                <div className="text-center px-1">
                    <div className="flex justify-evenly mb-4">
                        <button
                            className={`w-full py-2 rounded ${activeTab === "about" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-700"}`}
                            onClick={() => setActiveTab("about")}
                        >
                            About
                        </button>
                        <button
                            className="w-full py-2 rounded text-gray-500 cursor-not-allowed"
                        >
                            Reviews
                        </button>
                    </div>
                    {activeTab === "about" && (
                        <div>
                            <p className="text-gray-300 text-left m-3">{userData.about}</p>
                        </div>
                    )}
                </div>



                {/* User and Vehicle Details */}
                <div className='text-left'>

                    {/* User Details */}
                    <div className="flex flex-col mb-8 space-y-2">
                        <p className="text-gray-200"><strong className='text-blue-400'>Current Role:</strong> {userData.userRole.toUpperCase()}</p>
                        <p className="text-gray-200"><strong className='text-blue-400'>Contact Info:</strong> {userData.contactNumber}</p>
                        <p className="text-gray-200"><strong className='text-blue-400'>Designation:</strong> {userData.designation}</p>
                        <p className="text-gray-200"><strong className='text-blue-400'>Department:</strong> {userData.department}</p>
                        <p className="text-gray-200"><strong className='text-blue-400'>Work City:</strong> {userData.workCity}</p>
                    </div>


                    {/* Vehicle details (only for Host) */}
                    {selectedRole === "host" && userData.vehicles && userData.vehicles.length > 0 && (
                        <div className="flex flex-col items-center space-y-3">
                            <h3 className="text-lg font-semibold">Vehicles</h3>
                            {userData.vehicles.map((vehicle, index) => (
                                <div key={index} className="text-gray-400">
                                    <p><strong>Make:</strong> {vehicle.make}</p>
                                    <p><strong>Model:</strong> {vehicle.model}</p>
                                    <p><strong>Year:</strong> {vehicle.year}</p>
                                    <p><strong>License Plate:</strong> {vehicle.licensePlate}</p>
                                    {vehicle.images && vehicle.images.length > 0 && (
                                        <div className="flex space-x-2">
                                            {vehicle.images.map((image, imgIndex) => (
                                                <img key={imgIndex} src={image} alt="Vehicle" className="w-16 h-16 rounded" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default Profile;
