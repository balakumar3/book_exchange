import React from 'react';

const ListProfiles = ({ data }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border px-4 py-2">{user.FIRST_NAME}</td>
                            <td className="border px-4 py-2">{user.LAST_NAME}</td>
                            <td className="border px-4 py-2">{user.EMAIL}</td>
                            <td className="border px-4 py-2">{user.USER_LOCATION}</td>
                            <td className="border px-4 py-2">{user.SIGNUP_DATE}</td>
                            <td className="border px-4 py-2">{user.reading_preferences}</td>
                            <td className="border px-4 py-2">{user.favorite_genres}</td>
                            <td className="border px-4 py-2">{user.owned_books}</td>
                            <td className="border px-4 py-2">{user.wishlist}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProfiles;
