import { IoMdStar } from "react-icons/io";

// const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = "http://localhost:5000";

const CommuterCard = ({
  name,
  profilePic,
  contactNumber,
  rating,
  reviews,
  fromLocation,
  toLocation,
  departureTime,
  departureDate,
  numberOfRequiredSeats
}) => {
  
  console.log(`Username is; ${name}`)

  return (
    <div className="mb-3 shadow-md rounded-lg overflow-hidden border border-gray-100 border-opacity-30 bg-opacity-30 hover:cursor-pointer">
      <div className="flex flex-col shadow-sm w-full bg-green-300">

        {/* Left Side - Profile and Info */}
        <div className="flex justify-between px-4 py-4 flex-grow">

          {/* User & Location Parent Container */}

          <div>

            {/* User Container */}
            <div className="flex gap-3">
              {profilePic ?
                <img className="w-12 h-12 rounded-full" src={`${apiUrl}${profilePic}`} alt={`${name} profile`} />
              :
                <img className="w-12 h-12 rounded-full" src={"./assets/icons/person-icon.png"} alt={`${name} profile`} />
            }
              {/* UserName & Ratings */}
              <div className="flex flex-col justify-center">
                <p className="text-gray-100 leading-none text-base mb-[0.18rem]">{name}</p>
                <div className="flex gap-1 items-center">
                  <IoMdStar className="text-xs" style={{ fill: "yellow" }} />
                  <p className="text-sm text-gray-500 leading-none">
                    {rating} - {reviews} ratings
                  </p>
                </div>
              </div>
            </div>

            {/* Location Container */}
            <div className="flex flex-col justify-center mt-3 sm:mt-0 ml-6">
              <h1 className="text-lg">
                <span className="mr-1 text-sky-600">{fromLocation}</span>
                to
                <span className="ml-1 text-sky-600">{toLocation}</span>
              </h1>
              <p className="text-base">
                {departureTime} <span className="text-sm text-gray-400 pl-1">{departureDate}</span>
              </p>
            </div>

          </div>

          {/* Seats Container */}
          <div className="flex flex-col justify-center mt-3 sm:mt-0 ml-6">
            <div className="border border-gray-100 border-opacity-30 rounded-lg flex flex-col mt-2 items-center justify-center w-[4.5rem] h-[4.5rem]">
              <h1 className="text-5xl text-sky-600">
                {numberOfRequiredSeats}
              </h1>
            </div>
            <p className="text-xs text-gray-400">
              seats required
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CommuterCard;
