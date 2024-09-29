const express = require('express');
const router = express.Router();
const { addNewTrip, updateTrip, deleteTrip, getAllTrips } = require('../controllers/trips.js');

router.post('/new', addNewTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.get('/', getAllTrips);
module.exports = router;
