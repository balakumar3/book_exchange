import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/user-signup", { firstName, lastName, email, password, userLocation })
            .then(response => {
                if (response.data.status) {
                    navigate('/login')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Sign Up</h2>
                    <label htmlFor="firstName" className="block mb-2">First Name:</label>
                    <input type="text" id="firstName" placeholder="First Name" className="w-full p-2 border border-gray-300 rounded mb-2" onChange={(e) => setFirstName(e.target.value)} />

                    <label htmlFor="lastName" className="block mb-2">Last Name:</label>
                    <input type="text" id="lastName" placeholder="Last Name" className="w-full p-2 border border-gray-300 rounded mb-2" onChange={(e) => setLastName(e.target.value)} />

                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input type="email" id="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded mb-2" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input type="password" id="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded mb-2" onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="userLocation" className="block mb-2">User Location:</label>
                    <input type="text" id="userLocation" placeholder="User Location" className="w-full p-2 border border-gray-300 rounded mb-4" onChange={(e) => setUserLocation(e.target.value)} />

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
                    <p className="text-center mt-4">
                        Have an Account? <span className="text-blue-500 hover:underline">
                            <Link to="/login">Login</Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )

}
export default SignUp