import express from 'express'
const router = express.Router();
import { ExchangeRequest } from '../models/ExchangeRequest.js';

router.post('/exchange-requests', async (req, res) => {
    try {

        const newExchangeRequest = new ExchangeRequest(req.body);
        await newExchangeRequest.save();
        res.status(201).json({ message: 'Exchange request created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/getExchangerequests', async (req, res) => {
    try {
        const exchange = await ExchangeRequest.find();
        res.json(exchange);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export { router as ExchangeRequest }