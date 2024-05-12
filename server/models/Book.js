import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    bookCondition: { type: String },
    availabilityStatus: { type: String },
    userEmail: { type: String }
})

const BookModel = mongoose.model('Book', bookSchema)

export { BookModel as Book }