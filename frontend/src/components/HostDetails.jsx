import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFaceFrown, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const HostDetails = ({ user, onClose }) => {

  const navigate = useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState(''); // To store the message input
  const [loading, setLoading] = useState(false)
  const [requiredSeats, setRequiredSeats] = useState('');

  // Request states on Success or Failure
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');




  const {
    fromLocation,
    toLocation,
    departureDate,
    contactNumber,
    departureTime,
    price,
    totalAvailableSeats,
    remainingAvailableSeats,
    bookedSeats,
    name,
    about,
    profilePic,
    rating,
    reviews,
    vehicle,
    _id: publishId,
  } = user;


  // Count the number of male, female, and neutral icons needed
  const maleCount = bookedSeats.filter(seat => seat.gender === 'male').reduce((total, seat) => total + seat.numberOfBookedSeats, 0);
  const femaleCount = bookedSeats.filter(seat => seat.gender === 'female').reduce((total, seat) => total + seat.numberOfBookedSeats, 0);
  const neutralCount = totalAvailableSeats - (maleCount + femaleCount);


  // Define the list of all possible amenities with their labels
  const availableAmenities = [
    { label: "AC/Heater", key: "acHeater" },
    { label: "Sunroof", key: "sunroof" },
    { label: "Luggage", key: "luggage" },
  ];


  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };



  const handleConfirm = async () => {
    const reqFromId = localStorage.getItem('userId'); // Assuming 'user' in localStorage is the user's ID
    if (!reqFromId) {
      setError('User not found. Please log in.');
      setTimeout(() => setError(''), 5000);;
      return;
    }


    if (!requiredSeats) {
      setError('Please enter the number of required seats.');
      setTimeout(() => setError(''), 5000);
      return;
    }


    const requestData = {
      publishId, // publishId comes from user._id
      reqFromId,
      message, // message from the input field
      requiredSeats,
    };


    setLoading(true);
    setError('');
    setSuccessMessage('');


    try {
      const response = await axios.post('https://ridebuddy-server.onrender.com/api/request/byCommuter', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      setMessage('')
      setRequiredSeats('')

      if (response.status === 201) {
        setSuccessMessage('Request sent successfully');
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setError(response.data.error || 'Something went wrong!');
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || 'Failed to send request. Please try again.');
      setTimeout(() => setError(''), 5000);
    }
  };




  return (
    <>
      <div className="flex flex-col relative items-center p-6 mb-5 max-w-md mx-auto rounded-lg shadow-md space-y-6 overflow-hidden border border-gray-100 border-opacity-30">
        <button onClick={onClose} className="absolute top-4 left-4">
          <span className="material-symbols-outlined rounded-full w-6 h-6 pt-1">arrow_back</span>
        </button>

        {/* UserProfile */}
        <div className="flex space-x-4">

          {user.profilePic ?
            <img
              className="w-16 h-16 rounded-full sm:w-24 sm:h-24"
              src={`${apiUrl}${user.profilePic}`}
              alt={`${user.name} profile`}
            />
            :
            <img
              className="w-16 h-16 rounded-full sm:w-24 sm:h-24"
              src={"./assets/icons/person-icon.png"}
              alt={`user profile`}
            />
          }

          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-yellow-500">⭐ {user.rating} Rating</p>
          </div>
        </div>



        {/* Call and Whatsapp Buttons */}
        <div className="flex space-x-2">
          {/* <button className="bg-blue-500 text-white w-32 rounded-lg hover:bg-blue-600">Call</button> */}
          {/* CALL */}
          <a
            href={`tel:${user.contactNumber}`}
            className="bg-blue-500 text-white w-32 rounded-lg hover:bg-blue-600 flex items-center justify-center py-2 gap-2"
          >
            <span className="material-symbols-outlined bg-transparent">
              call
            </span>
            Call
          </a>

          {/* <button className="bg-green-600 text-white py-1 w-32 rounded-lg hover:bg-green-800">Message</button> */}
          {/* WHATSAPP message */}
          <a
            href={`https://wa.me/${user.contactNumber}`}
            className="bg-green-600 text-white py-1 w-32 rounded-lg hover:bg-green-800 flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/icons/icons-whatsapp-05.png" className="w-4 h-4 bg-transparent" alt="whatsapp" />
            Message
          </a>
        </div>




        {/* About section */}
        <div className="text-center px-1">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-300">{user.about}</p>
        </div>



        {/* Ride details */}
        <div className="w-full border flex flex-col items-center rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold leading-none mb-1">
            <span className="mr-1 text-sky-600">Rs.{user.price}</span>
            <span className="text-[0.6rem] text-gray-500">/pas</span>
          </h3>

          <h1 className="text-sm">
            <span className="mr-1 text-sky-600">{user.fromLocation}</span> to
            <span className="ml-1 text-sky-600">{user.toLocation}</span>
          </h1>
          <p className="text-xs">
            {user.departureTime} <span className="text-[0.6rem] text-gray-500 pl-1">{user.departureDate}</span>
          </p>


          {/* Seats Information */}
          <div className="flex flex-col items-center justify-center h-[3.3rem]">
            <p className='text-sm mt-2 py-1'>Seats:</p>
            <div className="flex gap-2 justify-center w-full">
              {/* Render male icons */}
              {Array.from({ length: maleCount }).map((_, index) => (
                <FontAwesomeIcon
                  key={`male-${index}`}
                  icon={faFaceFrown} // Male icon
                  className="text-blue-500 w-4 h-4 mt-1"
                />
              ))}

              {/* Render female icons */}
              {Array.from({ length: femaleCount }).map((_, index) => (
                <FontAwesomeIcon
                  key={`female-${index}`}
                  icon={faFaceSmile} // Female icon
                  className="text-pink-500 w-4 h-4 mt-1"
                />
              ))}

              {/* Render neutral icons for remaining seats */}
              {Array.from({ length: neutralCount }).map((_, index) => (
                <FontAwesomeIcon
                  key={`neutral-${index}`}
                  icon={faUser} // Neutral icon
                  className="text-gray-500 w-4 h-4 mt-1"
                />
              ))}
            </div>
          </div>
        </div>



        {/* Vehicle Section */}

        {/* Vehicle Images */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.vehicle.images.map((image, index) => (
              <img
                key={index}
                src={`https://ridebuddy-server.onrender.com/${image}`} // Add the server URL prefix if necessary
                alt={`vehicle-${index}`}
                className="rounded-lg w-full h-auto cursor-pointer"
                onClick={() => setSelectedImage(image)} // Assuming setSelectedImage is defined
              />
            ))}
          </div>
        </div>


        {/* Enlarged Image Modal */}
        {/* {selectedImage && (
          <div
            style={{ margin: 0, padding: 0 }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
          >
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected vehicle"
                className="rounded-lg max-w-full max-h-screen"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-white text-sm sm:text-xl w-7 sm:w-9 font-bold bg-black bg-opacity-50 p-1 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>
        )} */}


        {/* AMENETIES */}
        {/* <div className="flex flex-col gap-2 justify-between px-4">
          {availableAmenities.map((amenity) => (
            <div key={amenity.key} className="text-sm flex items-center">
              <span className="mr-3">{amenity.label}</span>
              {user.amenities.includes(amenity.key) ? (
                <span className="material-symbols-outlined text-green-500">check_circle</span>
              ) : (
                <span className="material-symbols-outlined text-red-500" >cancel</span>
              )}
            </div>
          ))}
        </div> */}



        {/* 
        <button onClick={togglePopup} className="w-full py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Request a ride
        </button>

        {isPopupVisible && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50"
            style={{ margin: 0, padding: 0 }}
          >
            <div className="relative mx-2 p-6 rounded-lg max-w-md w-full">
              <h3 className="text-lg font-semibold">Enter required seats</h3>
              <input
                type="number"
                min="1"
                className="w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
                placeholder="Number of seats"
                value={requiredSeats}
                onChange={(e) => setRequiredSeats(e.target.value)}
              />

              <h3 className="text-lg font-semibold">Enter your message</h3>
              <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-md" rows="4" placeholder="Write a message..." value={message} onChange={(e) => setMessage(e.target.value)} />

              {error && <p className="text-red-500">{error}</p>}
              {successMessage && (
                <p className="text-green-500 mb-4">{successMessage}</p>
              )}

              <div className="mt-2 flex justify-between gap-2">
                <button onClick={togglePopup} className="w-1/2 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
                <button onClick={handleConfirm} className={`w-1/2 py-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-700'} rounded-lg hover:bg-blue-500`} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Req'}
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default HostDetails;
