const express = require("express");
var router = express.Router();
const {check} = require("express-validator")
const {getAllTickets, createTicket, getTicketsByStatus} = require('../Controllers/tickets.js')

router.get("/tickets", getAllTickets)
router.get("/tickets/:status", getTicketsByStatus)

router.post("/RaiseTicket", createTicket)

module.exports = router;