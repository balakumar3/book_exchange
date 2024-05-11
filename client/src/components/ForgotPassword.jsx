import React, { useState } from 'react'
import Axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("forgot password api", { email })
            .then(response => {
                console.log(response)
                if (response.data.status) {
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <form className='sign-up-form bg-white shadow-md rounded-lg px-10 py-8 mb-8' onSubmit={handleSubmit}>
                <h2 className='text-2xl mb-6'>Forgot Password</h2>

                <div className='mb-6'>
                    <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                    <input type='email' autoComplete='off' placeholder='Email' className='shadow appearance-none border rounded w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className='flex items-center justify-between'>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' >Send</button>
                </div>
            </form>
        </div>
    )

}

export default ForgotPassword