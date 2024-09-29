const db = require('../models/index.js')
const Trip = db.trips

const addNewTrip = async (req, res) => {
    const {
        departure,
        destination,
        date,
        price,
        transid
    } = req.body

    const existingTrip = await Trip.findOne({ where: { transid: transid, date: date } })
    if (!existingTrip) {
        const newTrip = await Trip.create({ departure, destination, date, price, transid })
        if (newTrip) {
            res.status(200).json({ message: "trip created", newTrip })
        }
        else {
            res.status(400).send("trip cannot be created")
        }
    }
    else {
        res.status(400).send("bus already used for another trip")
    }
}

const updateTrip = async (req, res) => {
    const { id } = req.params
    const { date, departure, destination, price } = req.body
    
    //Search trip by id and update it
    const trip = await Trip.findByPk(id)
    if (trip) {
        const updatedTrip = await trip.update({ date: date, departure: departure, destination: destination, price: price })
        res.status(200).json({ message: "trip updated successfully", updatedTrip })
    }
    else {
        res.status(400).send({ message: "error" })
    }
}

const deleteTrip = async (req, res) => {
    const { id } = req.params

    //Search trip by id and cancel it
    const tripToCancel = await Trip.findByPk(id)
    if (tripToCancel) {
        const cancelledTrip = await tripToCancel.destroy()
        res.status(200).json({ message: "trip cancelled successfully", cancelledTrip })
    }
    else {
        res.status(400).send({ message: "trip connot be cancelled" })
    }
}

const getAllTrips = async (req, res) => {
    try {
        // Fetch all trips from the database
        const trips = await Trip.findAll();
    
        // Send response with all trips
        res.status(200).json({ trips });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }

module.exports = {
    addNewTrip,
    updateTrip,
    deleteTrip,
    getAllTrips
};