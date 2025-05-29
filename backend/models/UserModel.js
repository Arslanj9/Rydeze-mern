const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true },
  userRole: { 
    type: String,
    enum: ["host", "commuter"],
    required: true,
  },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePic: String, // let this field empty if no image is provided
  gender: { 
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  contactNumber: String,
  rating: Number,
  reviews: Number,
  about: {
    type: String,
    maxlength: 200, 
    trim: true, 
    required: true,
  },
  designation: String,      
  department: String,       
  workCity: String,
  vehicles: [
    {
      make: String,
      model: String,
      year: Number,
      images: [String]
    }
  ]          
});

module.exports = mongoose.model("User", UserSchema);




// ----- Users in database list: -----
// Commuters:
//   userId: C01, C02, C03 
//   Password: c1, c2, c3

// Hosts:
//   UserId: H01, H02, H03
//   Password: h1, h2, h3 




// Default User Fields

// {
//   "name": "Kamran Ghulam",
//   "userId": "C01",
//   "userRole": "commuter",
//   "password": "c1",
//   "email": "C01@gmail.com",
//   "profilePic": "",
//   "gender": "male",
//   "contactNumber": "1234567890",
//   "rating": 0,
//   "reviews": 0,
//   "about": "I am fond of coding and related things.",
//   "designation": "Developer",
//   "department": "IT",
//   "workCity": "Faisalabad",
//   "vehicles": [] 
// }




// Default User Fields

// {
//   "name": "Aysha",
//   "userRole": "host",
//   "userId": "H02",
//   "password": "h2",
//   "email": "H02@gmail.com",
//   "gender": "female",
//   "profilePic": "",
//   "contactNumber": "1234567890",
//   "rating": 0,
//   "reviews": 0,
//   "about": "I am food lover and love to travel places.",
//   "designation": "Developer",
//   "department": "IT",
//   "workCity": "Murree",
//   "vehicles": [
//     {
//       "make": "Honda",
//       "model": "City",
//       "year": "2014",
//       "images": ["uploads/vehicle1/city01.png", "uploads/vehicle1/city02.png"]
//     }
//   ] 
// }

