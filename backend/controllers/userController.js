const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const nodemailer = require("nodemailer");

// Register User
const registerUser = async (req, res) => {
  const {
    username,
    userRole,
    userId,
    password,
    email,
    profilePic,
    gender,
    contactNumber,
    rating = 0,
    reviews = 0,
    about,
    currentRole,
    designation,
    department,
    workCity,
    vehicles = [],
  } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the provided data
    const user = new User({
      username,
      userRole,
      userId,
      password: hashedPassword,
      email,
      profilePic,
      gender,
      contactNumber,
      rating,
      reviews,
      about,
      currentRole,
      designation,
      department,
      workCity,
      vehicles,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token
    res
      .status(201)
      .json({ message: "New User Registeration Successfull!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the user by name
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with the token
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Send Password Reset Email
// const sendPasswordResetEmail = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User with this email does not exist" });
//     }

//     // Generate a reset token
//     const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     // Configure Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     // Email details
//     const mailOptions = {
//       from: `RydPool ${process.env.EMAIL}`,
//       to: user.email,
//       subject: "Password Reset Request",
//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//           <h2>Password Reset Request</h2>
//           <p>Hello ${user.username},</p>
//           <p>We received a request to reset your password. Please click the button below to reset your password:</p>
//           <a href="http://localhost:5173/reset-password/${resetToken}" 
//             style="
//                 display: inline-block; 
//                 padding: 10px 20px; 
//                 font-size: 16px; 
//                 color: #fff; 
//                 background-color: #007BFF; 
//                 text-decoration: none; 
//                 border-radius: 5px;
//             ">
//             Reset Password
//           </a>
//           <p>If you did not request this, you can ignore this email or let us know.</p>
//           <p>Thanks,<br>The RydPool Support Team</p>
//         </div>
//       `,
//     };

//     // // Send email
//     // await transporter.sendMail(mailOptions);

//     try {
//       await transporter.sendMail(mailOptions);
//       console.log("Email sent successfully");
//       res
//         .status(200)
//         .json({ message: "Password reset email sent successfully" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Error sending email" });
//     }

//     // res.status(200).json({ message: 'Password reset email sent successfully' });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Reset Password
// const resetPassword = async (req, res) => {
//   const { token } = req.params; // Token from the URL
//   const { newPassword } = req.body;

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find the user by ID
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: "Invalid or expired token" });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Update user's password
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     console.error("Error resetting password:", error);
//     res.status(500).json({ message: "Server error or invalid token" });
//   }
// };

// Send User Data
const getUserById = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller function to get vehicles for a user
const getUserVehicles = async (req, res) => {
  const { userId } = req.body; // Retrieve userId from request body

  try {
    const user = await User.findById(userId).select("vehicles");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.vehicles); // Send only the vehicles array
  } catch (err) {
    console.error("Error fetching user's vehicles:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to get vehicle details by vehicleId
const getVehicleDetails = async (req, res) => {
  const { vehicleId } = req.body; // Retrieve vehicleId from request body

  try {
    const user = await User.findOne(
      { "vehicles._id": vehicleId },
      { "vehicles.$": 1 }
    ); // Find the user with the vehicle
    if (!user || user.vehicles.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(user.vehicles[0]); // Send the specific vehicle details
  } catch (err) {
    console.error("Error fetching vehicle details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  // sendPasswordResetEmail,
  // resetPassword,
  getUserById,
  getUserVehicles,
  getVehicleDetails,
};
