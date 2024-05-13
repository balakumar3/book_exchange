import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBookRecord() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [bookCondition, setBookCondition] = useState('good');
    const [availabilityStatus, setAvailabilityStatus] = useState('available');
    const [userEmail, setUserEmail] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/auth/verify')
            .then(res => {
                if (res.data.message === 'no token') {
                    navigate('/login')
                }
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5173/createBookRecord')
            .then(res => {
                if (res.data.message === 'no token') {
                    navigate('/login')
                }
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/books/createBookEntry", { title, author, genre, bookCondition, availabilityStatus, userEmail})
            .then(response => {
                if (response.data.message) {
                    navigate('/booklist')
                }
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Book Request Form</h2>
                    <label htmlFor="bookTitle" className="block mb-2">Book Title:</label>
                    <input type="text" id="bookTitle" placeholder="Book Title" className="w-full p-2 border border-gray-300 rounded mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="bookAuthor" className="block mb-2">Book Author:</label>
                    <input type="text" id="bookAuthor" placeholder="Book Author" className="w-full p-2 border border-gray-300 rounded mb-2" value={author} onChange={(e) => setAuthor(e.target.value)} />

                    <label htmlFor="bookGenre" className="block mb-2">Book Genre:</label>
                    <input type="text" id="bookGenre" placeholder="Book Genre" className="w-full p-2 border border-gray-300 rounded mb-2" value={genre} onChange={(e) => setGenre(e.target.value)} />

                    <label htmlFor="bookCondition" className="block mb-2"> Book Condition:</label>
                    <select id="deliveryMethod" className="w-full p-2 border border-gray-300 rounded mb-2" value={bookCondition} onChange={(e) => setBookCondition(e.target.value)}>
                        <option value="good">Good</option>
                        <option value="notGood">Not Good</option>
                        <option value="readable">Readable</option>
                    </select>

                    <label htmlFor="availabilityStatus" className="block mb-2"> Book Availablilty:</label>
                    <select id="availabilityStatus" className="w-full p-2 border border-gray-300 rounded mb-2" value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
                        <option value="available">Available</option>
                        <option value="notAvailable">Not Available</option>
                    </select>
                    <label htmlFor="userEmail" className="block mb-2">User Email:</label>
                    <input type="email" id="userEmail" placeholder="User Email" className="w-full p-2 border border-gray-300 rounded mb-4" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Submit Request</button>
                </form>
            </div>
        </div>
    );
}

export default CreateBookRecord;
