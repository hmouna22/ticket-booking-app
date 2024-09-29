const express = require('express');
const router = express.Router();
const { bookTicket, payTicket, cancelTicket } = require('../controllers/tickets.js');

router.post('/book', bookTicket);
router.put('/:id', payTicket);
router.delete('/:id', cancelTicket)

module.exports = router;
