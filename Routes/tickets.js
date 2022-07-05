const express = require("express");
var router = express.Router();
const {check} = require("express-validator")
const {getAllTickets, createTicket, getTicketsByStatus, updateTicket, deleteTicket} = require('../Controllers/tickets.js')

router.get("/tickets", getAllTickets)
router.get("/tickets/:status", getTicketsByStatus)
router.put("/tickets/:ticketID", updateTicket)
router.delete('/tickets/:ticketID',deleteTicket)

router.post("/RaiseTicket", createTicket)

module.exports = router;