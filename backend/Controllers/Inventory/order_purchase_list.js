const { OrderListModel } = require('../../Models/Order_PurchaseModel'); // Adjust the path as needed

const generateOrderId = async () => {
    try {
        const count = await OrderListModel.countDocuments({});
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const patientId = `ORD${year}${month}${day}${count}`;
        return patientId;
    } catch (err) {
        console.error(err);
        return null;
    }
};



// Create a new order
const createOrder = async (req, res) => {
    try {
        const Order_Id = await generateOrderId()
        const newOrder = await OrderListModel.create({ ...req.body, Order_Id: Order_Id });
        res.status(201).json({ msg: 'OrderListModel Created', data: newOrder?._id, });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderListModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await OrderListModel.findById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'OrderListModel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrderIds = async (req, res) => {
    console.log('running')
    try {
        const orders = await OrderListModel.find({}, 'Order_Id');
        const orderIds = orders.map(order => order.Order_Id);
        res.status(200).json(orderIds);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};


// Update an order by ID
const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await OrderListModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: 'OrderListModel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order by ID
const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await OrderListModel.findByIdAndDelete(req.params.id);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({ message: 'OrderListModel not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    getAllOrderIds
};
