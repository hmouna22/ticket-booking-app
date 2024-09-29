const express = require('express');
const router = express.Router();
const { addTransportation, deleteTransportation } = require('../controllers/transportations.js');

router.post('/new', addTransportation);
router.delete('/:id', deleteTransportation)

module.exports = router;
