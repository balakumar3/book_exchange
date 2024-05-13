import React, { useState } from 'react'
import Axios from 'axios'
import './BookListingAndSearch.css'
import bookDetails from './DummyData_Books';

const BookListingAndSearch = () => {
    const [bookName, setBookName] = useState('');

    const [searchTerm, setSearchTerm] = useState('');

    const handlesearch = (e) => {
        e.preventDefault();


        Axios.post("book search api", { bookName })
            .then(response => {
                console.log(response)
                if (response.data.status) {
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const [dummyData, setDummyData] = useState(bookDetails);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(dummyData.length / itemsPerPage);


    const currentItem = searchTerm != '' ? dummyData : dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const filteredBooks = currentItem.filter(book =>
        book.BOOK_NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
            <div className="items-center">
                <form className='bg-white shadow-md rounded-lg  px-10 py-8 mb-8' onSubmit={handlesearch}>
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
                            <th className="px-4 py-2">BookID</th>
                            <th className="px-4 py-2">Book Name</th>
                            <th className="px-4 py-2">Author Name</th>
                            <th className="px-4 py-2">Genere</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((data, index) => (
                            <tr key={index} className={index % 1 === 0 ? 'bg-white' : ''}>
                                <td className="border px-4 py-2">{data.BOOK_ID}</td>
                                <td className="border px-4 py-2">{data.BOOK_NAME}</td>
                                <td className="border px-4 py-2">{data.AUTHOR}</td>
                                <td className="border px-4 py-2">{data.GENERE}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {dummyData.length > itemsPerPage && (
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