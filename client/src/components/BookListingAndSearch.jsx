import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import './BookListingAndSearch.css'

const BookListingAndSearch = () => {
    const [bookName, setBookName] = useState('');

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

    const colors = ['The Hunger Games', 'Harry Potter and the Order of the Phoenix', 'Pride and Prejudice', 'The Book Thief', 'The Picture of Dorian Gray', 'The Perks of Being a Wallflower', 'The Great Gatsby', 'Lord of the Flies'];

    return (
        <div className="relative">
            <img src="https://americanbookco.com/wp-content/uploads/2021/02/stacked-books.jpeg" alt="Your Image" className="w-full" />

            <ul className="absolute top-1 right-1/2 text-center">
                <h1 className="text-3xl font-bold text-center mb-4">Find Your Book Here</h1>
                <div>
                    <form className='bg-white shadow-md rounded-lg px-10 py-8 mb-8' onSubmit={handlesearch}>
                        <h2 className='text-2xl mb-6'>Search Book</h2>

                        <div className='mb-6'>
                            <label htmlFor='text' className='block text-gray-700 text-sm font-bold mb-2'>Book Name</label>
                            <input type='text' autoComplete='off' placeholder='Book Name' className='shadow appearance-none border rounded w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setBookName(e.target.value)}></input>
                        </div>

                        <div className='flex items-center justify-between'>
                            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' >Search</button>
                        </div>
                    </form>
                </div>
                <div className='shadow-md rounded-lg text-center px-1  py-1 bg-white height: 100%' >
                    <label className='block text- text-sm font-bold mb-3'>Book list</label>
                    <div className='grid'>
                        {colors.map((color, index) => <div key={index} className="cell">{color}</div>)}
                    </div>
                </div >
            </ul >
            <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-200">
                &copy; 2024 Book Exchange Platform. All rights reserved.
            </footer>
        </div >
    );
}

export default BookListingAndSearch