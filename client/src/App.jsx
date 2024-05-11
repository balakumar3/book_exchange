import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from "./components/SignUp";
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import ExchangeRequests from './components/ExchangeRequests';
import CreateExchangeRequests from './components/CreateExchangeRequests';
import BookListingAndSearch from './components/BookListingAndSearch';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/exchangeRequests' element={<ExchangeRequests></ExchangeRequests>}></Route>
        <Route path='/createExchange' element={<CreateExchangeRequests></CreateExchangeRequests>}></Route>
        <Route path='/booklist' element={<BookListingAndSearch></BookListingAndSearch>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

