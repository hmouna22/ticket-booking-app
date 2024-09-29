const db = require('../models/index.js')
const Ticket = db.tickets
const Transportation = db.transportation
const Trip=db.trips
const Payment = db.payment

const bookTicket = async (req, res) => {
    const {
        user,
        tripid,
        
    } = req.body

    //test transportation capacity
    const trip = await Trip.findByPk(tripid)
    if (trip) {
        console.log(trip.transid)
    const transportation= await Transportation.findByPk(trip.transid)
    const allBookedTickets = await Ticket.findAll({ where: { tripid: tripid } })

    if (allBookedTickets?.length < transportation.capacity && trip.date>Date.now()) {
        const bookedTicket = await Ticket.create({ user, tripid })
        res.status(200).json({message:"ticket booked successfully", bookedTicket})
    }
    else{
        res.status(400).send({message:"no more available places"})
    }
}}

const payTicket = async (req,res) => {
    const {id} = req.params

    //Search ticket by id and pay it
    const myTicket = await Ticket.findByPk(id)
    if(myTicket){
        const updatedTicket = await myTicket.update({ status: "confirmed" })
        res.status(200).json({message:"ticket payed successfully", updatedTicket})
    }
    else{
        res.status(400).send({message:"error"})
    }
}

const cancelTicket = async (req,res) => {
    const {id} = req.params

    //Search ticket by id and cancel it
    const ticketToCancel = await Ticket.findByPk(id)
    if(ticketToCancel && ticketToCancel.status==="pending"){
        const cancelledTicket = await ticketToCancel.destroy()
        res.status(200).json({message:"ticket cancelled successfully", cancelledTicket})
    }
    else{
        res.status(400).send({message:"ticket connot be cancelled"})
    }
}

module.exports = {
    bookTicket,
    payTicket,
    cancelTicket
  };