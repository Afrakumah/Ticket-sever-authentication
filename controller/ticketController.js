
import ticketModel from '../model/ticketModel.js';
import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler'


const addTicket = asyncHandler(async (req, res) => {
    const { title, desc } = req.body;
    const { userId } = req.params;
    const ticket = new ticketModel({
        title,
        desc,
        user: userId
    })

    // save to ticket collection for the user
    const result = await ticket.save();

    const fetchUser = await User.findById(userId);

    fetchUser.tickets.push(result)
    // save to the user collection for the tickets array
    await fetchUser.save();

    res.status(201).send(result)
});


const getTicket = asyncHandler(async (req, res) => {
    const tickets = await ticketModel.find();
    if (tickets) res.status(200).send(tickets)
})

const updateTicket = asyncHandler(async (req, res) => {
    const { id } = req.params
    const ticket = await ticketModel.findById(id)
    const updatedTicket = await ticketModel.findByIdAndUpdate({ _id: id }, { workedOn: !ticket.workedOn }, { new: true })
    if (updatedTicket) res.send(updatedTicket)
})

const deleteTicket = asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedTicket = await ticketModel.findByIdAndDelete(id)
    if (deletedTicket) res.send(deletedTicket)
})


export default {
    addTicket,
    getTicket,
    updateTicket,
    deleteTicket
}