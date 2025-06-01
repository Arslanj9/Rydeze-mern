import { MdDelete } from "react-icons/md";


const MyListingsCommCard = ({
    fromLocation,
    toLocation,
    departureTime,
    departureDate,
    numberOfRequiredSeats,
}) => {
    return (
        <div className="mb-3 shadow-md rounded-lg overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30">
            <div className="flex flex-col shadow-sm w-full bg-green-300">
                {/* Left Side - Profile and Info */}
                <div className="flex justify-between px-4 py-4 flex-grow">
                    {/* User & Location Parent Container */}

                    <div className="flex">
                        {/* Location Container */}
                        <div className="flex flex-col ml-6 justify-center my-auto">
                            <h1 className="text-lg mt-2">
                                <span className="mr-1 text-sky-600">
                                    {fromLocation}
                                </span>
                                to
                                <span className="ml-1 text-sky-600">
                                    {toLocation}
                                </span>
                            </h1>
                            <p className="text-base">
                                {departureTime}{" "}
                                <span className="text-sm text-gray-400 pl-1">
                                    {departureDate}
                                </span>
                            </p>

                            <button
                                // onClick={onDelete}
                                className="w-12 h-9 my-3 flex items-center justify-center bg-red-700 rounded-lg hover:bg-red-500 text-white"
                            >
                                <MdDelete
                                    className="bg-transparent mx-auto"
                                    size={18}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Seats Container */}
                    <div className="flex flex-col justify-center mt-3 sm:mt-0 ml-6">
                        <div className="border border-gray-100 border-opacity-30 rounded-lg flex flex-col mt-2 items-center justify-center w-[4.5rem] h-[4.5rem]">
                            <h1 className="text-5xl text-sky-600">
                                {numberOfRequiredSeats}
                            </h1>
                        </div>
                        <p className="text-xs text-gray-400">seats required</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyListingsCommCard;
