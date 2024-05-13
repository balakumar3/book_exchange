import express from 'express'
const router = express.Router();
import { Book } from '../models/Book.js';


router.get('/getBooks', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/createBookEntry', async (req, res) => {
    const { title, author, genre, bookCondition, availabilityStatus, userEmail} = req.body;
    const book = await Book.findOne({userEmail, title});
    if (book) {
        return res.json({ Message: 'Book already exists' })
    }

    const newBook = new Book({
        title,
        author,
        genre,
        bookCondition,
        availabilityStatus,
        userEmail,
    })
    await newBook.save();
    return res.json({ status: true, message: "book entry is created" })
})


export { router as BookRouter}