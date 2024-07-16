import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [auctions, setAuctions] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/auctions/admin')
            .then((res) => setAuctions(res.data))
            .catch((err) => console.log(err));
    }, []);

    const deleteObj = (id) => {
        axios
            .delete(`http://localhost:8000/api/auctions/delete/${id}`)
            .then((res) => setAuctions(auctions.filter((auct) => auct._id !== id)))
            .catch((err) => console.log(err));
    };

    const handleCreateAuction = () => {
        // Navigate to the create auction page
        nav('/auctions/admin/new');
    };

    return (
        <div>
            <div className="flex justify-between items-center mx-4 md:mx-10">
                <h1 className="text-center p-10">Admin Panel</h1>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full text-sm"
                    onClick={handleCreateAuction}
                >
                    Create Auction
                </button>
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Title</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Description</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Image</th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {auctions.map((auct) => (
                            <tr key={auct._id}>
                                <td className="py-4 px-6 border-b border-gray-200">{auct.title}</td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">{auct.description}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <img src={auct.image} className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 w-50 h-50" alt="" />
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <button
                                        className="bg-green-500 text-white py-1 px-2 rounded-full text-xs"
                                        onClick={() => nav(`/auctions/edit/${auct._id}`)}
                                    >
                                        Edit
                                    </button> &nbsp;
                                    <button
                                        className="bg-red-500 text-white py-1 px-2 rounded-full text-xs"
                                        onClick={() => deleteObj(auct._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
