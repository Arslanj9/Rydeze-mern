// Hosts.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import HostCard from "../components/HostCard";
import HostDetails from "../components/HostDetails";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "http://localhost:5000";

const Hosts = () => {
    const [publishesData, setPublishesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHost, setSelectedHost] = useState(null);

    // Fetch Publish and Host data
    useEffect(() => {
        const fetchHostsData = async () => {
            try {
                setLoading(true);

                const publishResponse = await axios.get(
                    `${apiUrl}/api/publish/getHost`
                );
                const publishData = publishResponse.data;

                // Fetch user details and vehicles for each publish entry
                const hostDetailsPromises = publishData.map(async (publish) => {
                    const userResponse = await axios.post(
                        `${apiUrl}/api/users/getUserData`,
                        {
                            userId: publish.publisherId,
                        }
                    );
                    const userData = userResponse.data;

                    // Fetch vehicle details
                    const vehicleResponse = await axios.post(
                        `${apiUrl}/api/users/getVehicle`,
                        {
                            vehicleId: publish.hostFields.vehicleId,
                        }
                    );
                    const vehicleData = vehicleResponse.data;

                    // Combine publish data with user data for each host
                    return {
                        _id: publish._id,
                        fromLocation: publish.fromLocation,
                        toLocation: publish.toLocation,
                        departureDate: publish.departureDate,
                        departureTime: publish.departureTime,
                        price: publish.hostFields.price,
                        totalAvailableSeats:
                            publish.hostFields.totalAvailableSeats,
                        remainingAvailableSeats:
                            publish.hostFields.remainingAvailableSeats,
                        amenities: publish.hostFields.amenities,
                        bookedSeats: publish.hostFields.bookedSeats.map(
                            (seat) => ({
                                gender: seat.gender,
                                numberOfBookedSeats: seat.numberOfBookedSeats,
                            })
                        ),
                        name: userData.name,
                        about: userData.about,
                        contactNumber: userData.contactNumber,
                        profilePic: userData.profilePic,
                        rating: userData.rating,
                        reviews: userData.reviews,
                        vehicle: vehicleData, // Add vehicle data if needed
                    };
                });

                const publishesWithUserData = await Promise.all(
                    hostDetailsPromises
                );

                setPublishesData(publishesWithUserData);
            } catch (error) {
                console.error("Error fetching hosts data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHostsData();
    }, []);

    const handleCardClick = (user) => {
        setSelectedHost(user); // Set the selected user
    };

    const handleCloseDetails = () => {
        setSelectedHost(null); // Close the details view
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="p-3 sm:p-6 max-w-[90vw] mx-auto">
            <h1 className="text-2xl text-center mb-5 p-3 max-w-lg mx-auto rounded-lg bg-[#292d49]">
                Rides
            </h1>

            {selectedHost ? (
                <HostDetails user={selectedHost} onClose={handleCloseDetails} />
            ) : publishesData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {publishesData.map((user) => (
                        <div
                            className="hover:cursor-pointer"
                            onClick={() => handleCardClick(user)}
                            key={user._id}
                        >
                            <HostCard
                                name={user.name}
                                profilePic={user.profilePic}
                                contactNumber={user.contactNumber}
                                rating={user.rating}
                                reviews={user.reviews}
                                fromLocation={user.fromLocation}
                                toLocation={user.toLocation}
                                departureTime={user.departureTime}
                                departureDate={user.departureDate}
                                price={user.price}
                                totalAvailableSeats={user.totalAvailableSeats}
                                remainingAvailableSeats={
                                    user.remainingAvailableSeats
                                }
                                bookedSeats={user.bookedSeats}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border rounded-xl border-white border-opacity-55">
                    <h1 className="text-center m-10">
                        There are no ride at the moment. Please check again
                        later.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Hosts;
