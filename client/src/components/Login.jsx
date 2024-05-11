import React, { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("api for login", { email, password })
            .then(response => {
                if (response.data.status) {

                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                <h2 className='text-2xl mb-4'>Login</h2>

                <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                    <input type='email' placeholder='Email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='mb-6'>
                    <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>Password:</label>
                    <input type='password' placeholder='*****' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='flex items-center justify-between'>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
                    <Link to='/forgotPassword' className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>Forgot Password?</Link>
                </div>

                <p className='mt-4'>Doesn't have an Account? <Link to='/signup' className='text-blue-500 hover:text-blue-800'>Sign Up</Link></p>
            </form>
        </div>
    )

}

export default Login