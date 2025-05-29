// routes/userRoutes.js
const express = require("express");
const {
  registerUser,
  loginUser,
//   sendPasswordResetEmail,
//   resetPassword,
  getUserById,
  getUserVehicles,
  getVehicleDetails,
} = require("../controllers/userController");



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post('/send-password-reset-email', sendPasswordResetEmail);
// router.post('/reset-password/:token', resetPassword);
router.post("/getUserData", getUserById);
router.post("/vehicles", getUserVehicles);
router.post("/getVehicle", getVehicleDetails);



module.exports = router;
