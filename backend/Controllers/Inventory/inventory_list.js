const { InventoryList } = require('../../Models/InventoryList'); // Adjust the path as needed

const generateItemId = async () => {
    try {
        const count = await InventoryList.countDocuments({});
        const ItemId = `${count}`;
        return ItemId;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Create a new inventory item
const createInventoryItem = async (req, res) => {
    try {
        let itemId = await generateItemId()
        const newInventoryItem = await InventoryList.create({ 'medicine_id': itemId, ...req.body });
        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all inventory items
const getAllInventoryItems = async (req, res) => {
    try {
        const { minQuantity = 'undefined', page, pageSize } = req.query;

        const query = {};

        // Handle minQuantity separately if it exists in req.query
        if (minQuantity !== 'undefined') {
            const minQuantityValue = parseInt(minQuantity);
            if (!isNaN(minQuantityValue)) {
                query.quantity = { $lte: minQuantityValue };
            } else {
                // Handle the case where minQuantity is not a valid integer
                return res.status(400).json({ error: 'minQuantity must be a valid integer' });
            }
        }

        let skip = page ? (parseInt(page) - 1) * (pageSize ? parseInt(pageSize) : 10) : 0;
        const limit = pageSize ? parseInt(pageSize) : 10;

        const inventoryItems = await InventoryList.find(query)
            .sort({ medicine_id: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json(inventoryItems);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};


// Get a specific inventory item by ID
const getInventoryItemById = async (req, res) => {
    try {
        const inventoryItem = await InventoryList.findById(req.params.id);
        if (inventoryItem) {
            res.status(200).json(inventoryItem);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an inventory item by ID
const updateInventoryItemById = async (req, res) => {
    try {
        const updatedInventoryItem = await InventoryList.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updatedInventoryItem) {
            res.status(200).json(updatedInventoryItem);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an inventory item by ID
const deleteInventoryItemById = async (req, res) => {
    try {
        const deletedInventoryItem = await InventoryList.findByIdAndDelete(
            req.params.id
        );
        if (deletedInventoryItem) {
            res.status(200).json(deletedInventoryItem);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItemById,
    deleteInventoryItemById,
};
