const db = require('../models/index.js')
const Transportation = db.transportation

const addTransportation = async (req, res) => {
    const {
        name,
        number,
        capacity,
        type } = req.body

        const newTransportation = await Transportation.create({name, number, capacity, type })
        res.status(200).json({message:"transportation created successfully",newTransportation})
}

const deleteTransportation = async (req,res) => {
    const {id} = req.params

    //Search the transportation
    const transportationToDelete = Transportation.findByPk(id)
    if(transportationToDelete){
        const deletedTransportation = Transportation.destroy()
        res.status(200).json({message:"transportation deleted successfully", deletedTransportation})
    }
    else{
        res.status(400).send("transportation cannot be deleted")
    }
}

module.exports={
    addTransportation,
    deleteTransportation
}