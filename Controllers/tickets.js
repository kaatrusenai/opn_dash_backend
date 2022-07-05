const Tickets = require("../Models/tickets");



//CREATE
exports.createTicket = (req,res) => {
    const ticket = new Tickets(req.body);
    ticket.save((err, ticket)=>{
        if(err){
            return res.status(400).json({
                error: err
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

//UPDATE
exports.updateTicket = (req,res) => {
    Tickets.findByIdAndUpdate(req.params.ticketID, req.body).exec((err, tickets) => {
        console.log(err,tickets)
        if(err){
            return res.status(400).json({
                error: "NO categories found"
            });
        }
        res.json(tickets)
    })
}

//DELETE 
exports.deleteTicket = (req,res) => {
    Tickets.findByIdAndDelete(req.params.ticketID).exec((err, tickets) => {
        if(err){
            return res.status(400).json({
                error: "Unable to delete or ticket does not exist"
            });
        }
        res.json(tickets)
    })
}