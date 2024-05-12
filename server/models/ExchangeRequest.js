import mongoose from "mongoose";

const exchangeRequestSchema = new mongoose.Schema({
    senderEmail: { type: String },
    receiverEmail: { type: String },
    bookTitle: { type: String },
    requestStatus: { type: String },
    deliveryMethod: { type: String },
    duration: { type: String },
    address: { type: String },
})

const ExchangeRequestModel = mongoose.model('ExchangeRequest', exchangeRequestSchema)

export { ExchangeRequestModel as ExchangeRequest }