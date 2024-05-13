import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './BookListingAndSearch.css';
import bookDetails from './DummyData_Books';

const BookListingAndSearch = () => {
    const [bookName, setBookName] = useState('');
    const [bookData, setBookData] = useState(bookDetails);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:5173/booklist')
            .then(res => {
                if (res.data.message === 'no token') {
                    navigate('/login')
                }
            })
    }, [])

    useEffect(() => {
        Axios.get('http://localhost:3000/auth/verify')
            .then(res => {
                if (res.data.message === 'no token') {
                    navigate('/login')
                }
            })
    }, [])

    useEffect(() => {
        fetchBooks();
    }, [])



    const fetchBooks = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/books/getBooks');
            setBookData(response.data);
        } catch (error) {
            console.error('Error fetching book list:', error);
        }
    };


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const currentItem = searchTerm != '' ? bookData : bookData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const filteredBooks = currentItem.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const paginationButtons = Array.from({ length: totalPages }, (_, i) => (
        <li key={i}>
            <button
                className={`${currentPage === i + 1 ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-gray-200 text-gray-700'
                    } px-3 py-2 mx-1 rounded`}
                onClick={() => paginate(i + 1)}
                disabled={currentPage === i + 1}
            >
                {i + 1}
            </button>
        </li>
    ));



    return (
        <div className="my-background">
            <h1 className="text-3xl font-bold text-center mb-4">Find Your Book Here</h1>
            <Link to="/createBookRecord" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
                        Create Book Entry
            </Link>
            <div className="items-center">
                <form className='bg-white shadow-md rounded-lg  px-10 py-8 mb-8'>
                    <h2 className='text-2xl  mb-6'>Search Book</h2>
                    <div className='mb-6'>
                        <label htmlFor='text' className='block text-gray-700 text-sm font-bold mb-2'>Book Name</label>
                        <input type='text' autoComplete='off' placeholder='Book Name' className='shadow appearance-none border rounded w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setSearchTerm(e.target.value)}></input>
                    </div>
                </form>
            </div>
            <div className=" overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className="px-4 py-2">Book Title</th>
                            <th className="px-4 py-2">Book Author</th>
                            <th className="px-4 py-2">Genre</th>
                            <th className="px-4 py-2">Book Condition</th>
                            <th className="px-4 py-2">Availability Status</th>
                            <th className="px-4 py-2">Owner Email</th>
                            <th>Create Exchange Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((data, index) => (
                            <tr key={index} className={index % 1 === 0 ? 'bg-white' : ''}>
                                <td className="border px-4 py-2">{data.title}</td>
                                <td className="border px-4 py-2">{data.author}</td>
                                <td className="border px-4 py-2">{data.genre}</td>
                                <td className="border px-4 py-2">{data.bookCondition}</td>
                                <td className="border px-4 py-2">{data.availabilityStatus}</td>
                                <td className="border px-4 py-2">{data.userEmail}</td>
                                <td><Link to="/createExchange" className=" bg-green-500 hover:bg-green-200 text-white rounded">
                        Click here
            </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {bookData.length > itemsPerPage && (
                    <div className="mt-4 flex justify-center">
                        <nav className="block">
                            <ul className="flex pl-0 rounded list-none flex-wrap">{paginationButtons}</ul>
                        </nav>
                    </div>
                )}
            </div>
            <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-200">
                &copy; 2024 Book Exchange Platform. All rights reserved.
            </footer>
        </div >
    );
}

export default BookListingAndSearch