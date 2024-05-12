import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/auth/verify')
            .then(res => {
                if (res.data.message === 'no token') {
                    navigate('/login')
                }
            })
    }, [])
    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(res => {
                if (res.data.status) {
                    navigate('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="relative">
            <h1 className="text-3xl font-bold text-center mb-4">Book Exchange Platform</h1>
            <hr className="border-t border-gray-300 mb-4" />
            <img src="https://americanbookco.com/wp-content/uploads/2021/02/stacked-books.jpeg" alt="Your Image" className="w-full" />
            <button className="absolute top-0 right-0 m-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>Logout</button>
            <ul className="absolute top-1/3 left-0 transform -translate-y-1/2 text-center">
                <li className="mb-2"><Link to="/booklist" className="block px-4 py-2 bg-black text-white rounded">Book Listing & Searching</Link></li>
                <li className="mb-2"><Link to="/exchangeRequests" className="block px-4 py-2 bg-black text-white rounded">Exchange Requests</Link></li>
                <li className="mb-2"><Link to="/users" className="block px-4 py-2 bg-black text-white rounded">User Profiles</Link></li>
            </ul>
            <footer className="absolute bottom-0 w-full text-center py-4 bg-gray-200">
                &copy; 2024 Book Exchange Platform. All rights reserved.
            </footer>
        </div>
    );
}

export default Home