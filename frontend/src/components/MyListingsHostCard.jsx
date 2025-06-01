import { MdDelete } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faFaceSmile,
    faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const MyListingsCard = ({
    listingId,
    fromLocation,
    toLocation,
    departureTime,
    departureDate,
    totalAvailableSeats,
    remainingAvailableSeats,
    price,
    bookedSeats,
}) => {
    console.log("ListingId is: " + JSON.stringify(listingId));

    // Count the number of male, female, and neutral icons needed
    const maleCount = Array.isArray(bookedSeats)
        ? bookedSeats
              .filter((seat) => seat.gender === "male")
              .reduce((total, seat) => total + seat.numberOfBookedSeats, 0)
        : 0;

    const femaleCount = Array.isArray(bookedSeats)
        ? bookedSeats
              .filter((seat) => seat.gender === "female")
              .reduce((total, seat) => total + seat.numberOfBookedSeats, 0)
        : 0;

    const neutralCount = totalAvailableSeats - (maleCount + femaleCount);

    const handleDelete = async (id) => {
        const confirm = window.confirm(
            "Are you sure you want to delete this listing?"
        );
        if (!confirm) return;

        try {
            const response = await axios.post(
                "http://localhost:5000/api/publish/deleteListing",
                {
                    id: id,
                }
            );

            console.log(response.data.message);

            // ✅ Refresh the page
            window.location.reload();
            
        } catch (error) {
            console.error("Failed to delete listing:", error);
        }
    };

    return (
        <div className="w-full mb-3 shadow-md rounded-lg flex items-center overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30">
            <div className="flex flex-row shadow-sm w-full">
                <div className="flex flex-col  basis-2/3 p-2 flex-grow">
                    <div className="ml-6 my-auto">
                        <h1 className="text-lg mt-2 flex sm:flex-row flex-col">
                            <span className="mr-1 text-sky-600">
                                {fromLocation}
                            </span>
                            <p>to</p>
                            <span className="sm:ml-1 ml-0 text-sky-600">
                                {toLocation}
                            </span>
                        </h1>
                        <p className="text-base">
                            {departureTime}{" "}
                            <span className="text-sm text-gray-500 pl-1">
                                {departureDate}
                            </span>
                        </p>
                        <button
                            onClick={() => handleDelete(listingId)}
                            className="w-12 h-9 my-3 flex items-center justify-center bg-red-700 rounded-lg hover:bg-red-500 text-white"
                        >
                            <MdDelete
                                className="bg-transparent mx-auto"
                                size={18}
                            />
                        </button>
                    </div>
                </div>

                <div className="basis-1/3 p-2 flex flex-col justify-center">
                    <h3 className="text-base font-semibold leading-none">
                        <span className="mr-1 text-sky-600">Rs.{price}</span>
                        <span className="text-xs text-gray-500">/pas</span>
                    </h3>

                    {/* Seats Information */}
                    <p className="text-[0.65rem] mt-[0.1rem] text-gray-500 leading-none">
                        {remainingAvailableSeats}{" "}
                        {remainingAvailableSeats === 1
                            ? "seat left"
                            : "seats left"}
                    </p>
                    <div className="border border-gray-100 border-opacity-30 rounded-lg flex flex-col mt-2 items-center opacity-40 justify-center w-[4.5rem] h-[4.5rem]">
                        <div className="flex flex-wrap gap-1 justify-center w-full opacity-100">
                            {/* Render male icons */}
                            {Array.from({ length: maleCount }).map(
                                (_, index) => (
                                    <FontAwesomeIcon
                                        key={`male-${index}`}
                                        icon={faFaceFrown} // Male icon
                                        className="text-blue-500 w-4 h-4 mt-1 opacity-100"
                                    />
                                )
                            )}

                            {/* Render female icons */}
                            {Array.from({ length: femaleCount }).map(
                                (_, index) => (
                                    <FontAwesomeIcon
                                        key={`female-${index}`}
                                        icon={faFaceSmile} // Female icon
                                        className="text-pink-500 w-4 h-4 mt-1 opacity-100"
                                    />
                                )
                            )}

                            {/* Render neutral icons for remaining seats */}
                            {Array.from({ length: neutralCount }).map(
                                (_, index) => (
                                    <FontAwesomeIcon
                                        key={`neutral-${index}`}
                                        icon={faUser} // Neutral icon
                                        className="text-gray-500 w-4 h-4 mt-1 opacity-100"
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyListingsCard;
