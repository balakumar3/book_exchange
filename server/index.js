import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config()
import { UserRouter } from './routes/user.js';
import {BookRouter } from './routes/books.js';
import { ExchangeRequest } from './routes/ExchangeRequest.js';
const app = express();

app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        credentials: true
    }
))
app.use(cookieParser());
app.use('/auth', UserRouter);
app.use('/books', BookRouter);
app.use('/exchange', ExchangeRequest)

mongoose.connect('mongodb://127.0.0.1:27017/authentication')

app.listen(process.env.PORT, () => {
    console.log('server is running!! ', process.env.PORT)
})