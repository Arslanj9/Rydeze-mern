import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create ProfileContext
const ProfileContext = createContext();



export const ProfileProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) return;

                // const apiUrl = import.meta.env.VITE_API_URL;
                const apiUrl = "http://localhost:5000";

                const response = await axios.post(`${apiUrl}/api/users/getUserData`, { userId });
                setUserData(response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <ProfileContext.Provider value={{ userData }}>
            {children}
        </ProfileContext.Provider>
    );
};


export const useProfile = () => useContext(ProfileContext);