import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUserProfiles = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { emailId } = state;
    // Sample initial data
    const [readingPreferences, setReadingPreferences] = useState('');
    const [favoriteGenres, setFavoriteGenres] = useState([]);
    const [ownedBooks, setOwnedBooks] = useState('');
    const [wishList, setWishList] = useState('');

    const handleSaveProfile = () => {
        // Save user profile data to the server
        // You can send this data to your backend API for storage
        const userProfileData = {
            readingPreferences: String(readingPreferences),
            favoriteGenres: String(favoriteGenres),
            ownedBooks: String(ownedBooks),
            wishList: String(wishList),
        };
        axios.put(`http://localhost:3000/auth/users/${emailId}`, userProfileData)
            .then(response => {
                console.log('User information updated:', response.data);
                navigate('/users')
            })
            .catch(error => {
                console.error('Error updating user information:', error.response.data);
            });
        console.log('Saving user profile:', userProfileData);
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            <h3 className="text-lg font-semibold mb-2">Email Id: {emailId}</h3>
            <h3 className="text-lg font-semibold mb-2">Reading Preferences</h3>
            <textarea
                className="w-full p-2 border rounded"
                value={readingPreferences}
                onChange={(e) => setReadingPreferences(e.target.value)}
                placeholder="Enter your reading preferences"
                rows={4}
                cols={50}
            />
            <h3 className="text-lg font-semibold mb-2 mt-4">Favorite Genres</h3>
            <select
                className="w-full p-2 border rounded"
                multiple
                value={favoriteGenres}
                onChange={(e) => setFavoriteGenres(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="science-fiction">Science Fiction</option>
                {/* Add more genre options here */}
            </select>
            <h3 className="text-lg font-semibold mb-2 mt-4">Owned Books</h3>
            <textarea
                className="w-full p-2 border rounded"
                value={ownedBooks}
                onChange={(e) => setOwnedBooks(e.target.value)}
                placeholder="Enter your owned books, each on a new line"
                rows={4}
                cols={50}
            />
            <h3 className="text-lg font-semibold mb-2 mt-4">Wish List</h3>
            <textarea
                className="w-full p-2 border rounded"
                value={wishList}
                onChange={(e) => setWishList(e.target.value)}
                placeholder="Enter your wish list, each on a new line"
                rows={4}
                cols={50}
            />
            <div className="mt-6">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSaveProfile}
                >
                    Save Profile
                </button>
            </div>
        </div>
    );
};

export default EditUserProfiles;
