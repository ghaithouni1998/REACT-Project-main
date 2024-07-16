import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Auctions.css';

const Auctions = () => {
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/auctions/notsold')
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data)) {
          setUpcomingAuctions(response.data);
        } else {
          setError('Invalid response for upcoming auctions. Expected an array.');
        }
      })
      .catch(error => {
        setLoading(false);
        setError(`Error fetching upcoming auctions: ${error.message}`);
      });
  }, []);

  const filteredAuctions = () => {
    switch (selectedFilter) {
      case "all_dates":
        return upcomingAuctions;
      case "5":
        return upcomingAuctions.filter((up, idx) => idx >= 0 && idx < 25);
      case "10":
        return upcomingAuctions.filter((up, idx) => idx >= 0 && idx < 50);
      case "15":
        return upcomingAuctions.filter((up, idx) => idx >= 0 && idx < 75);
      default:
        return [];
    }
  };

  // Add some debugging logs
  console.log('selectedFilter:', selectedFilter);
  console.log('upcomingAuctions:', upcomingAuctions);
  console.log('filteredAuctions:', filteredAuctions());

  return (
    <div className='border rounded-md p-4 w-full mx-auto max-w-7xl'>
      <h4 className='text-xl lg:text-2xl font-Montserrat-sans-serif'>Select Date Range</h4>

      <div>
        <label className='flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer'>
          <input
            type='radio'
            name='dateRange'
            value='all_dates'
            onChange={handleChange}
            checked={selectedFilter === 'all_dates'}
          />
          <i className='pl-2'>All Dates</i>
        </label>

        <label className='flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer'>
          <input
            type='radio'
            name='dateRange'
            value='5'
            onChange={handleChange}
            checked={selectedFilter === '5'}
          />
          <i className='pl-2'>Next 5 days</i>
        </label>

        <label className='flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer'>
          <input
            type='radio'
            name='dateRange'
            value='10'
            onChange={handleChange}
            checked={selectedFilter === '10'}
          />
          <i className='pl-2'>Next 10 days</i>
        </label>

        <label className='flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer'>
          <input
            type='radio'
            name='dateRange'
            value='15'
            onChange={handleChange}
            checked={selectedFilter === '15'}
          />
          <i className='pl-2'>Next 15 days</i>
        </label>
      </div>

      <div className='w-full mt-6'>
        <h2 className='text-2xl font-Montserrat-sans-serif'>Upcoming Auctions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className='text-red-500'>Error: {error}</p>
        ) : (
          <table className='min-w-full divide-y divide-gray-200 overflow-x-auto'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Title
                </th>
                <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Image
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {filteredAuctions().length > 0 ? (
                filteredAuctions().map((auction) => (
                  <tr key={auction.id}>
                    <td className='px-6 py-4 whitespace-nowrap font-Montserrat-sans-serif' style={{fontWeight:'bold'}}>{auction.title}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-center'>
                      <img src={auction.image} style={{ width: "5em", }} alt={auction.title} className='mx-auto block rounded' />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='2'>No upcoming auctions</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
    // {favorites.map((item, index) => (
    //   <>
    //     <div key={index} className='d-flex justify-content-between align-items-center mb-1 '>
    //       <p key={index}>{item.title}</p>
    //       <img src={item.image} className='rounded' style={{ width: "5em", }} alt="" />
    //     </div> </>

    // ))}
  );
};

export default Auctions;
