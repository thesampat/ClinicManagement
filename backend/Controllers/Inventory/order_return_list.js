const { Mongoose, default: mongoose } = require('mongoose');
const { OrderReturnModel } = require('../../Models/Order_PurchaseModel'); // Adjust the path as needed


// Create a new order
const createReturnOrder = async (req, res) => {
    let { damage, order, date } = req.body
    let payload = { damage: damage, order: new mongoose.Schema.Types.ObjectId(order), date: date.slice(0, 10) }
    try {

        const newOrder = await OrderReturnModel.create(req.body);
        res.status(201).json({ msg: 'OrderReturnModel Created', data: newOrder?._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders
const getAllReturnOrders = async (req, res) => {
    try {
        const orders = await OrderReturnModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a specific order by ID
const getReturnOrderById = async (req, res) => {
    try {
        const order = await OrderReturnModel.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'OrderReturnModel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an order by ID
const updateReturnOrderById = async (req, res) => {
    try {
        const updatedOrder = await OrderReturnModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'OrderReturnModel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order by ID
const deleteReturnOrderById = async (req, res) => {
    try {
        const deletedOrder = await OrderReturnModel.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({ message: 'OrderReturnModel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReturnOrder,
    getAllReturnOrders,
    getReturnOrderById,
    updateReturnOrderById,
    deleteReturnOrderById,
};