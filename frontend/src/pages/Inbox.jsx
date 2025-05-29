import { useState, useEffect } from 'react';
import axios from 'axios';
import InboxSentReqCard from '../components/Inbox/InboxSentReqCard';
import InboxReceivedReqCard from '../components/Inbox/InboxReceivedReqCard';

const apiUrl = import.meta.env.VITE_API_URL;

const Inbox = () => {
  const [activeSection, setActiveSection] = useState('sent'); // 'sent' or 'received'
  // const [userId, setUserId] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  // Fetch requests for the logged-in user
  const fetchRequests = async () => {

    const storedUserId = localStorage.getItem('userId');
    console.log(`Stored user id is: ${storedUserId}`)

    try {
      const response = await axios.post(`${apiUrl}/api/request/getRequests`, {
        userId: storedUserId,
      });

      const data = response.data;

      console.log(`Data is inside Inbix: ${JSON.stringify(data)}`)

      setSentRequests(data.sentRequests || []);
      setReceivedRequests(data.receivedRequests || []);

      // Send a specific field (e.g., sent requests count) to the parent
      // if (setNavbarData) {
      //   setNavbarData(data.sentRequests?.length || 0); // Example field
      // }

    } catch (error) {
      console.error('Error fetching requests:', error.response?.data?.error || error.message);
    }
  };

  // Fetch requests when userId is available
  useEffect(() => {
    
    fetchRequests();
    
  }, []);




  // Handle tab section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="p-1 sm:p-6 max-w-lg mx-auto">
      {/* Buttons Section */}
      <div className="flex justify-center mb-8 gap-1">
        <button
          onClick={() => handleSectionChange('sent')}
          className={`w-full py-2 text-white ${
            activeSection === 'sent' ? 'bg-blue-700' : 'bg-transparent border'
          } rounded-lg hover:bg-blue-500`}
        >
          Sent Requests
        </button>
        <button
          onClick={() => handleSectionChange('received')}
          className={`w-full py-2 text-white ${
            activeSection === 'received' ? 'bg-blue-700' : 'bg-transparent border'
          } rounded-lg hover:bg-blue-500`}
        >
          Received Requests
        </button>
      </div>

      {/* Sent Requests */}
      {activeSection === 'sent' && (
        <div>
          {sentRequests.length > 0 ? (
            sentRequests.map((req) => <InboxSentReqCard key={req._id} />)
            // sentRequests.map((req) => <InboxSentReqCard key={req._id} request={req} />)
          ) : (
            <p>No sent requests found.</p>
          )}
        </div>
      )}

      {/* Received Requests */}
      {activeSection === 'received' && (
        <div>
          {receivedRequests.length > 0 ? (
            receivedRequests.map((req) => <InboxReceivedReqCard key={req._id} />)
            // receivedRequests.map((req) => <InboxReceivedReqCard key={req._id} request={req} />)
          ) : (
            <p>No received requests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Inbox;
