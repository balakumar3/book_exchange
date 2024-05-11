import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dummy from './DummyData';

const ExchangeRequests = () => {
    const [dummyData, setDummyData] = useState(dummy);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(dummyData.length / itemsPerPage);


    const currentItems = dummyData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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
        <div className="container mx-auto pt-8 pb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Exchange Request List</h2>

                <Link to="/createExchange" className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
                    Create Exchange
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">SENDER_ID</th>
                            <th className="px-4 py-2">RECEIVER_ID</th>
                            <th className="px-4 py-2">BOOK_ID</th>
                            <th className="px-4 py-2">REQUEST_STATUS</th>
                            <th className="px-4 py-2">DELIVERY_METHOD</th>
                            <th className="px-4 py-2">ADDRESS</th>
                            <th className="px-4 py-2">DURATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{data.SENDER_ID}</td>
                                <td className="border px-4 py-2">{data.RECEIVER_ID}</td>
                                <td className="border px-4 py-2">{data.BOOK_ID}</td>
                                <td className="border px-4 py-2">{data.REQUEST_STATUS}</td>
                                <td className="border px-4 py-2">{data.DELIVERY_METHOD}</td>
                                <td className="border px-4 py-2">
                                    {data.DELIVERY_METHOD === 'bypost' || data.DELIVERY_METHOD === 'byexternaldeliverypartner'
                                        ? data.ADDRESS
                                        : 'N/A'}
                                </td>
                                <td className="border px-4 py-2">{data.DURATION} days</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded mr-2">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded">
                                        Delete
                                    </button>
                                </td>
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
        </div>
    );
};

export default ExchangeRequests;
