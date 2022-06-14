const Tickets = require("../Models/tickets");

//CREATE
exports.createTicket = (req,res) => {
    const ticket = new Tickets(req.body);
    ticket.save((err, ticket)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to save the ticket in DB"
            })
        }
        res.json({ticket})
    })
}

//GET 
exports.getAllTickets = (req, res) => {
    Tickets.find().exec((err,tickets)=> {
        if(err){
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(tickets);
    })
}

exports.getTicketsByStatus = (req, res) => { 
    Tickets.find({ticketStatus: req.params.status}).exec((err, tickets) => {
        if(err){
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(tickets)
    })
}