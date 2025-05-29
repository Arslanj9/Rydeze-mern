// data.js
const userData = [
    {
      id: 1,
      name: "John Doe H.",
      profilePic: "/assets/profile pic.jpg",
      mobileNumber: +3430105882,
      rating: 4.3,
      reviews: 30,
      fromLocation: "Kamra",
      toLocation: "Islamabad",
      departureTime: "07:30 PM",
      departureDate: "07 August 2024",
      price: 100,
      seatsLeft: 3,
      seatIcons: [
        "./assets/icons/available seat icon.png",
        "./assets/icons/female seat icon.png",
        "./assets/icons/male seat icon.png",
        "./assets/icons/male seat icon.png",
      ],
      about: "Hi, I am John Doe. I love traveling and playing football. I also have a passion for software development.",
      vehicleImages: [
        "./assets/vehicles/City01.png",
        "./assets/vehicles/city02.png",
        "./assets/vehicles/city03.png",
        "./assets/vehicles/city04.png",
      ], 
      hasAC: true,
      hasLuggage: true,
      hasSunroof: true,
    },
    {
      id: 2,
      name: "Jane Smith H.",
      profilePic: "/assets/profile pic.jpg",
      rating: 4.8,
      reviews: 45,
      fromLocation: "Los Angeles",
      toLocation: "San Francisco",
      departureTime: "09:00 AM",
      departureDate: "08 August 2024",
      price: 75,
      seatsLeft: 2,
      seatIcons: [
        "./assets/icons/female seat icon.png",
        "./assets/icons/male seat icon.png",
        "./assets/icons/available seat icon.png",
        "./assets/icons/available seat icon.png",
      ],
      about: "Hello, I'm Jane Smith. I'm passionate about road trips and enjoy hiking.",
      vehicleImages: [
        "./assets/vehicles/corolla01.png",
        "./assets/vehicles/corolla02.png",
        "./assets/vehicles/corolla03.png",
        "./assets/vehicles/corolla04.png",
      ], 
      hasAC: true,
      hasLuggage: false,
      hasSunroof: true,
    },
    // Add more host data as needed
  ];
  
  export default userData;
  





const commuterData = [
    {
      id: 1,
      name: "Ahmed C.",
      profilePic: "/assets/commuterImage.png",
      rating: 4.3,
      reviews: 30,
      fromLocation: "Wah",
      toLocation: "Attock",
      departureTime: "07:30 PM",
      departureDate: "07 August 2024",
      price: 100,
      seatsLeft: 3,
      about: "Hi, I am Ahmed. I love traveling and playing football. I also have a passion for software development.",
      hasAC: true,
      hasLuggage: true,
      hasSunroof: true,
    },
    {
      id: 2,
      name: "Kamran Akmal C.",
      profilePic: "/assets/commuterImage.png",
      rating: 4.8,
      reviews: 45,
      fromLocation: "Los Angeles",
      toLocation: "San Francisco",
      departureTime: "09:00 AM",
      departureDate: "08 August 2024",
      price: 75,
      seatsLeft: 2,
      about: "Hello, I'm Kamran Akmal. I'm passionate about road trips and enjoy hiking.",
    },
    // Add more host data as needed
  ];
  
  export { userData, commuterData };
  