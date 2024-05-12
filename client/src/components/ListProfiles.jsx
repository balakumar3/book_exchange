import React from 'react';

const ListProfiles = ({ data }) => {
    const handleEdit = (userId) => {
        console.log(`Editing user with ID: ${userId}`);
    };

    const handleDelete = (userId) => {
        console.log(`Deleting user with ID: ${userId}`);
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2">First Name</th>
                        <th className="px-4 py-2">Last Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Signup Date</th>
                        <th className="px-4 py-2">Reading Preferences</th>
                        <th className="px-4 py-2">Favorite Genres</th>
                        <th className="px-4 py-2">Owned Books</th>
                        <th className="px-4 py-2">Wishlist</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border px-4 py-2">{user.firstName}</td>
                            <td className="border px-4 py-2">{user.lastName}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.userLocation}</td>
                            <td className="border px-4 py-2">{user.signupDate}</td>
                            <td className="border px-4 py-2">{user.reading_preferences}</td>
                            <td className="border px-4 py-2">{user.favorite_genres}</td>
                            <td className="border px-4 py-2">{user.owned_books}</td>
                            <td className="border px-4 py-2">{user.wishlist}</td>
                            <td className="border px-4 py-2">
                                <div className="flex">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleEdit(user.id)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                        onClick={() => handleDelete(user.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProfiles;
