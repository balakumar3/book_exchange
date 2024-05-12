import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userLocation: { type: String, required: true },
    signupDate: { type: Date },
    readingPreferences: { type: String },
    favoriteGenres: { type: String },
    ownedBooks: { type: String },
    wishList: { type: String },
})

const UserModel = mongoose.model('User', userSchema)

export { UserModel as User }