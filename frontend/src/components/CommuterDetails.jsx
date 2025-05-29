// import { useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const CommuterDetails = ({ commuter, onClose }) => {



  // const [isPopupVisible, setPopupVisible] = useState(false);

  // ---- Offer Ride Methods ----
  // const togglePopup = () => {
  //   setPopupVisible(!isPopupVisible);
  //   console.log("Close button is working");
  // };

  // const handleConfirm = () => {
  //   setPopupVisible(false);
  //   // You can add any additional actions here after confirming
  // };


  console.log(`Commuterdetail is: ${JSON.stringify(commuter)}`)




  return (
    <>
      <div className="flex flex-col relative items-center p-6 mb-5 max-w-md mx-auto rounded-lg shadow-md space-y-6 overflow-hidden border border-gray-100 border-opacity-30 ">
        <button onClick={onClose} className="absolute top-4 left-4">
          <span className="material-symbols-outlined rounded-full w-6 h-6 pt-1">
            arrow_back
          </span>
        </button>

        <div className="flex space-x-4">
          {/* Profile Picture */}
          {commuter.profilePic ?
            <img className="w-16 h-16 rounded-full sm:w-24 sm:h-24" src={`${apiUrl}${commuter.profilePic}`} alt="profile pic" />
            :
            <img className="w-16 h-16 rounded-full sm:w-24 sm:h-24" src={"./assets/icons/person-icon.png"} alt="profile pic" />
          }

          {/* Name and Rating */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold">{commuter.name}</h2>
            <p className="text-yellow-500">⭐ {commuter.rating} Rating</p>
          </div>
        </div>


        {/* Call and Message Buttons */}
        <div className="flex space-x-2">
          <a
            href={`tel:${commuter.contactNumber}`}
            className="bg-blue-500 text-white w-32 rounded-lg hover:bg-blue-600 flex items-center justify-center py-2 gap-2"
          >
            <span className="material-symbols-outlined bg-transparent">
              call
            </span>
            Call
          </a>
          <a
            href={`https://wa.me/${commuter.contactNumber}`}
            className="bg-green-600 text-white py-1 w-32 rounded-lg hover:bg-green-800 flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/icons/icons-whatsapp-05.png" className="w-4 h-4 bg-transparent" alt="whatsapp" />
            Message
          </a>
        </div>



        {/* About Section */}
        <div className="text-center px-1">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-300">
            {commuter.about}
          </p>
        </div>



        {/* Location Section */}
        <div className="w-full border rounded-lg p-4 text-center">
          <div>
            <h1 className="text-lg">
              <span className="mr-1 text-sky-600">{commuter.fromLocation}</span>
              to
              <span className="ml-1 text-sky-600">{commuter.toLocation}</span>
            </h1>
            <p className="text-lg">
              {commuter.departureTime} <span className="text-base text-gray-400 pl-1">{commuter.departureDate}</span>
            </p>
          </div>
        </div>





        {/* Offer Ride Section */}

        {/* <button onClick={togglePopup} className="w-full py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Offer Ride
        </button> */}

        {/* Confirm Popup and Overlay

        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50" style={{ margin: 0, padding: 0 }}>
            <div className="relative mx-2 p-6 rounded-lg shadow-lg">

              Close Popup Button
              
              <button onClick={togglePopup} className="absolute top-0 right-5 mt-3 opacity-60">
                <span className="material-symbols-outlined">close</span>
              </button>
              <p className="mb-4 text-center mt-5">Are you sure you want to offer a ride?</p>

              Location Section

              <div className="w-full border rounded-lg p-4 text-center">
                <div>
                  <h1 className="text-sm">
                    <span className="mr-1 text-sky-600">{commuter.fromLocation}</span> to
                    <span className="ml-1 text-sky-600">{commuter.toLocation}</span>
                  </h1>
                  <p className="text-xs">
                    {commuter.departureTime} <span className="text-[0.6rem] text-gray-500 pl-1">{commuter.departureDate}</span>
                  </p>
                </div>
              </div>

              Confirm Button
              
              <button onClick={handleConfirm} className="w-full py-2 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Confirm
              </button>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default CommuterDetails;
