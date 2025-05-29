import { IoMdStar } from "react-icons/io";

const InboxReceivedReqCard = () => {
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
                <p className="text-gray-400 leading-none mb-[0.18rem]">Kamra Ghulam</p>
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
              <h1 className="text-sm">
                <span className="mr-1 text-sky-600">Peshawar</span> to
                <span className="ml-1 text-sky-600">Mardan</span>
              </h1>
              <p className="text-xs">
                20:00 <span className="text-[0.6rem] text-gray-500 pl-1">2023-3-2</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default InboxReceivedReqCard