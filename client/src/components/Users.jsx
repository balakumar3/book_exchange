import React, { useState } from 'react';
import ListProfiles from './ListProfiles';

const Users = () => {

    const [userData, setUserData] = useState([
        {
            FIRST_NAME: 'John',
            LAST_NAME: 'Doe',
            EMAIL: 'john.doe@example.com',
            USER_LOCATION: 'New York',
            SIGNUP_DATE: '2022-05-10',
            reading_preferences: 'Fiction',
            favorite_genres: 'Mystery',
            owned_books: 'Sherlock Holmes',
            wishlist: 'The Great Gatsby',
        },
        {
            FIRST_NAME: 'Jane',
            LAST_NAME: 'Smith',
            EMAIL: 'jane.smith@example.com',
            USER_LOCATION: 'Los Angeles',
            SIGNUP_DATE: '2022-04-25',
            reading_preferences: 'Non-fiction',
            favorite_genres: 'Biography',
            owned_books: 'Becoming by Michelle Obama',
            wishlist: 'Sapiens: A Brief History of Humankind',
        },
        {
            FIRST_NAME: 'Michael',
            LAST_NAME: 'Johnson',
            EMAIL: 'michael.johnson@example.com',
            USER_LOCATION: 'Chicago',
            SIGNUP_DATE: '2022-03-15',
            reading_preferences: 'Science Fiction',
            favorite_genres: 'Fantasy',
            owned_books: 'The Hobbit',
            wishlist: 'Dune',
        },
        {
            FIRST_NAME: 'Emily',
            LAST_NAME: 'Brown',
            EMAIL: 'emily.brown@example.com',
            USER_LOCATION: 'Houston',
            SIGNUP_DATE: '2022-02-20',
            reading_preferences: 'Romance',
            favorite_genres: 'Historical Fiction',
            owned_books: 'Pride and Prejudice',
            wishlist: 'Outlander',
        },
        {
            FIRST_NAME: 'David',
            LAST_NAME: 'Wilson',
            EMAIL: 'david.wilson@example.com',
            USER_LOCATION: 'Miami',
            SIGNUP_DATE: '2022-01-05',
            reading_preferences: 'Thriller',
            favorite_genres: 'Suspense',
            owned_books: 'The Girl with the Dragon Tattoo',
            wishlist: 'Gone Girl',
        },
        {
            FIRST_NAME: 'Michael',
            LAST_NAME: 'Johnson',
            EMAIL: 'michael.johnson@example.com',
            USER_LOCATION: 'Chicago',
            SIGNUP_DATE: '2022-03-15',
            reading_preferences: 'Science Fiction',
            favorite_genres: 'Fantasy',
            owned_books: 'The Hobbit',
            wishlist: 'Dune',
        },
        {
            FIRST_NAME: 'Emily',
            LAST_NAME: 'Brown',
            EMAIL: 'emily.brown@example.com',
            USER_LOCATION: 'Houston',
            SIGNUP_DATE: '2022-02-20',
            reading_preferences: 'Romance',
            favorite_genres: 'Historical Fiction',
            owned_books: 'Pride and Prejudice',
            wishlist: 'Outlander',
        },


    ]);


    const usersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(userData.length / usersPerPage);


    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);


    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">User Data</h1>
            <ListProfiles data={currentUsers} />

            <nav className="mt-4">
                <ul className="flex justify-center">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index} className="mx-1">
                            <button
                                className={`px-3 py-1 rounded-md ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                    }`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Users;
