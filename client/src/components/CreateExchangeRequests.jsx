import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateExchangeRequests() {
    const navigate = useNavigate();
    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [requestStatus] = useState('pending');
    const [deliveryMethod, setDeliveryMethod] = useState('bypost'); // Default to physical delivery
    const [duration, setDuration] = useState('');
    const [address, setAddress] = useState(''); // Add state for address

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted!');
        console.log('Sender Email:', senderEmail);
        console.log('Receiver Email:', receiverEmail);
        console.log('Book Title:', bookTitle);
        console.log('Request Status:', requestStatus);
        console.log('Delivery Method:', deliveryMethod, typeof (deliveryMethod));
        console.log('Duration:', duration);
        console.log('Address:', address);

        axios.post("http://localhost:3000/exchange/exchange-requests", { senderEmail, receiverEmail, bookTitle, requestStatus, duration, address, deliveryMethod })
            .then(response => {
                console.log("print response.data ", response?.data);
                if (response.data.message) {
                    navigate('/exchangeRequests')
                }
            })
            .catch(err => {
                console.log(err)
            })
    };


    const renderAddressField = () => {
        if (deliveryMethod === 'bypost' || deliveryMethod === 'byexternaldeliverypartner') {
            return (
                <div>
                    <label htmlFor="address" className="block mb-2">Address:</label>
                    <input type="text" id="address" placeholder="Address" className="w-full p-2 border border-gray-300 rounded mb-2" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Book Request Form</h2>
                    <label htmlFor="senderEmail" className="block mb-2">Sender's Email:</label>
                    <input type="email" id="senderEmail" placeholder="Sender's Email" className="w-full p-2 border border-gray-300 rounded mb-2" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />

                    <label htmlFor="receiverEmail" className="block mb-2">Receiver's Email:</label>
                    <input type="email" id="receiverEmail" placeholder="Receiver's Email" className="w-full p-2 border border-gray-300 rounded mb-2" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} />

                    <label htmlFor="bookTitle" className="block mb-2">Book Title:</label>
                    <input type="text" id="bookTitle" placeholder="Book Title" className="w-full p-2 border border-gray-300 rounded mb-2" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />


                    <label htmlFor="deliveryMethod" className="block mb-2">Delivery Method:</label>
                    <select id="deliveryMethod" className="w-full p-2 border border-gray-300 rounded mb-2" value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                        <option value="bypost">By Post</option>
                        <option value="byexternaldeliverypartner">By External Delivery Partner</option>
                        <option value="byself">By Self</option>
                    </select>

                    {renderAddressField()}

                    <label htmlFor="duration" className="block mb-2">Duration:</label>
                    <input type="text" id="duration" placeholder="Duration" className="w-full p-2 border border-gray-300 rounded mb-4" value={duration} onChange={(e) => setDuration(e.target.value)} />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit Request</button>
                </form>
            </div>
        </div>
    );
}

export default CreateExchangeRequests;
