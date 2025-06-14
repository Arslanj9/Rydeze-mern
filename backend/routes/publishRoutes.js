const express = require('express');
const router = express.Router();
const publishController = require('../controllers/publishController');


router.post('/host', publishController.publishByHost);
router.post('/commuter', publishController.publishByCommuter);

router.get("/getHost", publishController.getPublishesByHost);
router.get("/getCommuter", publishController.getPublishesByCommuter);

router.post('/getMyListings', publishController.getPublishesById);
router.post("/deleteListing", publishController.deleteListing);


module.exports = router;
