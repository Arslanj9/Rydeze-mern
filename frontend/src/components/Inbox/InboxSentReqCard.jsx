import { IoMdStar } from "react-icons/io";

const InboxSentReqCard = () => {
    return (
        <>
            <div className="w-full mb-3 shadow-md rounded-lg flex items-center overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30 hover:cursor-pointer">
                <div className="flex flex-col shadow-sm w-full">

                    {/* Left Side - Profile and Info */}
                    <div className="flex sm:flex-row sm:justify-around flex-col justify-center px-4 py-4 flex-grow">
                        {/* User Container */}
                        <div className="flex gap-3">
                            {/* <img className="w-12 h-12 rounded-full" src={`http://localhost:5000${profilePic}`} alt={`${name} profile`} /> */}
                            {/* UserName & Ratings */}
                            <div className="flex flex-col justify-center">
                                <p className="text-gray-400 leading-none mb-[0.18rem]">Ahmed</p>
                                <div className="flex gap-1 items-center">
                                    <IoMdStar className="text-xs" style={{ fill: "yellow" }} />
                                    <p className="text-xs text-gray-500 leading-none" style={{ fontSize: "0.65rem" }}>
                                        23 - 1 ratings
                                    </p>
                                </div>
                            </div>
                        </div>
                        

                        {/* Location Container */}
                        <div className="flex flex-col justify-center text-center mt-3 sm:mt-0">
                            <p className="text-center leading-none mt-4 mb-2 text-sm">Status: <span className="text-gray-400 leading-none text-sm">Pending</span></p>
                            <h1 className="text-sm">
                                <span className="mr-1 text-sky-600">Kashmir</span> to
                                <span className="ml-1 text-sky-600">Hyderabad</span>
                            </h1>
                            <p className="text-xs">
                                20:00 <span className="text-[0.6rem] text-gray-500 pl-1">2023-3-2</span>
                            </p>
                        </div>
                    </div>

                    <p className="text-center leading-none mb-4 text-sm">Your message: <span className="text-gray-400 leading-none mb-4 text-sm">Hello! How are you today?</span></p>

                </div>
            </div>
        </>
    )
}

export default InboxSentReqCard