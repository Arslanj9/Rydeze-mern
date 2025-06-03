import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PublishContext = createContext();

export const PublishProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]); // State for vehicles array
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);



  // Fetch vehicle data from backend using userId from localStorage
  useEffect(() => {
    const fetchVehicleData = async () => {
      const storedUserId = localStorage.getItem('userId');
      
      if (storedUserId) {
        try {
          // const apiUrl = import.meta.env.VITE_API_URL;
          const apiUrl = "https://rydeze-mern-backend.onrender.com";

          const response = await axios.post(`${apiUrl}/api/users/vehicles`, {
            userId: storedUserId, // Send userId in the request body
          });
          setVehicles(response.data); // Set vehicles array from response
        } catch (err) {
          console.error("Error fetching vehicle data:", err);
          setError("Failed to load vehicle data");
        }
      }
    };
    
    fetchVehicleData();
  }, []);

  


  // Method to publish by host
const publishByHost = async (rideData) => {
  try {
    setLoading(true);
    
    // Use formData keys directly since they match the required backend fields
    const filteredData = {
      fromLocation: rideData.fromLocation,
      toLocation: rideData.toLocation,
      departureDate: rideData.departureDate,
      departureTime: rideData.departureTime,
      publisherId: localStorage.getItem("userId"), 
      price: rideData.price,
      vehicleId: rideData.vehicleId,
      totalAvailableSeats: rideData.totalAvailableSeats,
      remainingAvailableSeats: rideData.remainingAvailableSeats
    };

    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = "https://rydeze-mern-backend.onrender.com";

    const response = await axios.post(`${apiUrl}/api/publish/host`, filteredData);

    setRides([...rides, response.data]);
    setSuccessMessage(response.data.message); 
    setLoading(false);
    setError(null);
    
  } catch (err) {
    console.error("Error publishing by host:", err);
    setError("Failed to publish ride by host");
    setLoading(false);
  }
};



  
  // Method to publish by commuter
const publishByCommuter = async (rideData) => {
  try {
    setLoading(true);

    // Create a filtered object with only the required fields
    const filteredData = {
      fromLocation: rideData.fromLocation,
      toLocation: rideData.toLocation,
      departureDate: rideData.departureDate,
      departureTime: rideData.departureTime,
      publisherId: localStorage.getItem("userId"), // Assuming publisherId is stored in localStorage
      status: rideData.status || "pending",
      numberOfRequiredSeats: rideData.numberOfRequiredSeats,
      gender: rideData.gender,
    };

    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrl = "https://rydeze-mern-backend.onrender.com";
    
    const response = await axios.post(`${apiUrl}/api/publish/commuter`, filteredData);
    setRides([...rides, response.data]);
    setLoading(false);
    setSuccessMessage(response.data.message); 
    setError(null);
  } catch (err) {
    console.error("Error publishing by commuter:", err);
    setError("Failed to publish ride by commuter");
    setLoading(false);
  }
};




  // Main publish method to check role and call appropriate function
  const publishRide = (rideData) => {
    const role = localStorage.getItem('userRole');
    if (role === 'host') {
      publishByHost(rideData);
    } else if (role === 'commuter') {
      publishByCommuter(rideData);
    } else {
      setError("Role not found or invalid");
    }
  };




  return (
    <PublishContext.Provider value={{ rides, vehicles, loading, error, publishRide, successMessage, setSuccessMessage }}>
      {children}
    </PublishContext.Provider>
  );
};

export const usePublish = () => useContext(PublishContext);
