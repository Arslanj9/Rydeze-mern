import { useEffect, useState } from "react";
import axios from "axios";
import MyListingsHostCard from "../components/MyListingsHostCard";
import MyListingsCommCard from "../components/MyListingsCommCard";

const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");
        setUserRole(userRole);


        // If the userId is missing, stop loading and show a message.
        if (!storedId) {
            setLoading(false);
            return;
        }

        const fetchMyListings = async () => {
            try {
                const { data } = await axios.post(
                    "https://rydeze-mern-backend.onrender.com/api/publish/getMyListings",
                    { userId: storedId },
                    { headers: { "Content-Type": "application/json" } }
                );

                console.log("Data is: " + JSON.stringify(data));
                setListings(data);
            } catch (err) {
                console.error("Error fetching listings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyListings();
    }, []);



    if (loading) return <div>Loading listings...</div>;

    return (
        <div className="p-3 sm:p-6 max-w-[90vw] mx-auto">
            <h1 className="text-2xl text-center mb-5 p-3 max-w-lg mx-auto rounded-lg bg-[#292d49]">
                My Listings
            </h1>

            {listings.length === 0 ? (
                <p>No listings found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {listings.map((listing) => (
                        <div
                            key={listing._id}
                        >
                            {userRole === "host" ? (
                                <MyListingsHostCard
                                    listingId={listing._id}
                                    fromLocation={listing.fromLocation}
                                    toLocation={listing.toLocation}
                                    departureTime={listing.departureTime}
                                    departureDate={listing.departureDate}
                                    price={listing.hostFields.price}
                                    totalAvailableSeats={
                                        listing.hostFields.totalAvailableSeats
                                    }
                                    remainingAvailableSeats={
                                        listing.hostFields
                                            .remainingAvailableSeats
                                    }
                                    bookedSeats={listing.hostFields.bookedSeats}
                                />
                            ) : (
                                <MyListingsCommCard
                                    fromLocation={listing.fromLocation}
                                    toLocation={listing.toLocation}
                                    departureTime={listing.departureTime}
                                    departureDate={listing.departureDate}
                                    price={listing.commuterFields?.price}
                                    status={listing.commuterFields?.status}
                                    numberOfRequiredSeats={listing.commuterFields?.numberOfRequiredSeats}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyListings;
