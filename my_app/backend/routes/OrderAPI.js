const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameIsShawalHelloHelloHelloSadDepressed"; // Use the same key as used for signing tokens

// POST: Save order
router.post('/save-order', async (req, res) => {
    // console.log('Received POST request for /save-order');
    try {
        const { userId, items, totalPrice, address } = req.body;
        const newOrder = new Order({
            userId,
            items,
            totalPrice,
            address,
        });
        await newOrder.save();
        // console.log(newOrder);
        res.status(200).json({ message: 'Order saved successfully' });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Error saving order', error });
    }
});

// GET: Fetch user's order history
router.get('/order-history', async (req, res) => {
    const token = req.header('authToken'); // Expect the authToken from the client
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        // Verify token and get user info
        const decoded = jwt.verify(token, jwtSecret);
        // This here was causing the problem :')
        const userId = decoded.user.id;
        // console.log(userId);

        // Fetch orders for the user
        const orders = await Order.find({ userId }).sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order history', error });
    }
});

module.exports = router;
