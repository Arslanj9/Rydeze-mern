import { useState, useEffect } from "react";
import axios from "axios";
import CommuterCard from "../components/CommuterCard";
import CommuterDetails from "../components/CommuterDetails";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "http://localhost:5000";

const Commuters = () => {
    const [commuterData, setCommuterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCommuter, setSelectedCommuter] = useState(null);

    useEffect(() => {
        const fetchCommuterData = async () => {
            try {
                setLoading(true);
                const publishResponse = await axios.get(
                    `${apiUrl}/api/publish/getCommuter`
                );
                const publishData = publishResponse.data;

                const temp = publishData.map((publish) =>
                    console.log(`PublishID is: ${JSON.stringify(publish)}`)
                );

                // Fetch user details for each publish
                const commuterDetailsPromises = publishData.map(
                    async (commuter) => {
                        try {
                            // Fetch commuter (user) details
                            const userResponse = await axios.post(
                                `${apiUrl}/api/users/getUserData`,
                                {
                                    userId: commuter.publisherId,
                                }
                            );
                            const userData = userResponse.data;

                            // Combine publish data with user data
                            return {
                                _id: commuter._id,
                                fromLocation: commuter.fromLocation,
                                toLocation: commuter.toLocation,
                                departureDate: commuter.departureDate,
                                departureTime: commuter.departureTime,
                                status:
                                    commuter.commuterFields?.status || "N/A",
                                numberOfRequiredSeats:
                                    commuter.commuterFields
                                        ?.numberOfRequiredSeats || 0,
                                gender:
                                    commuter.commuterFields?.gender || "N/A",
                                name: userData.name,
                                about: userData.about,
                                contactNumber: userData.contactNumber,
                                profilePic: userData.profilePic,
                                rating: userData.rating,
                                reviews: userData.reviews,
                            };
                        } catch (error) {
                            console.error(
                                `Error processing commuter ${commuter._id}:`,
                                error
                            );
                            return null; // Skip failed commuter
                        }
                    }
                );

                const commutersWithUserData = (
                    await Promise.all(commuterDetailsPromises)
                ).filter(Boolean);

                setCommuterData(commutersWithUserData);
            } catch (error) {
                console.error("Error fetching commuter data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommuterData();
    }, []);

    const handleCardClick = (user) => {
        setSelectedCommuter(user); // Set the selected commuter
    };

    const handleCloseDetails = () => {
        setSelectedCommuter(null); // Close the details view
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="p-3 sm:p-6 max-w-[90vw] mx-auto">
            <h1 className="text-2xl text-center mb-5 p-3 max-w-lg mx-auto rounded-lg bg-[#292d49]">
                Commuters
            </h1>

            {selectedCommuter ? (
                <CommuterDetails
                    commuter={selectedCommuter}
                    onClose={handleCloseDetails}
                />
            ) : commuterData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {commuterData.map((commuter) => (
                        <div
                            className="hover:cursor-pointer w-full max-w-full"
                            onClick={() => handleCardClick(commuter)}
                            key={commuter._id}
                        >
                            <CommuterCard
                                name={commuter.name}
                                profilePic={commuter.profilePic}
                                contactNumber={commuter.contactNumber}
                                rating={commuter.rating}
                                reviews={commuter.reviews}
                                fromLocation={commuter.fromLocation}
                                toLocation={commuter.toLocation}
                                departureTime={commuter.departureTime}
                                departureDate={commuter.departureDate}
                                numberOfRequiredSeats={
                                    commuter.numberOfRequiredSeats
                                }
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="border rounded-xl border-white border-opacity-55">
                    <h1 className="text-center m-10">
                        There are no commuters at the moment. Please check again
                        later.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Commuters;
