import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
// import MainPage from "../../components/common/MainPage";
import '../HomePage/Home.css'

const Home = (props) => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/auctions/admin')
      .then(response => {
        setAuctions(response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleClick =(id)=>{
    axios.post(`http://localhost:8000/api/favorite`,{auctionId:id} , { withCredentials: true }).then(res=>console.log(res)).catch(error=>console.log(error))

  }

  return (<>
    <div className='container mt-20'>
      <div className="max-w-4xl mx-auto">
        <div id="default-carousel" className="relative" data-carousel="static">
          <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
            {auctions.map((auction, index) => (
              <div key={index} className={`duration-700 ease-in-out ${index === 0 ? 'active' : ''}`} data-carousel-item>
                {auction && (
                  <>
                    <span className="absolute top-1/2 left-1/2 text-2xl font-bold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
                      {auction.title}
                    </span>
                    <img src={auction.image} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={auction.title} />
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
            {auctions.map((_, index) => (
              <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index}></button>
            ))}
          </div>
          <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              <span className="hidden">Previous</span>
            </span>
          </button>
          <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              <span className="hidden">Next</span>
            </span>
          </button>
        </div>
      </div>

      {/* Table for showing all items */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Auctions</h2>
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
            {auctions.map((auction) => (
              <tr key={auction._id}>
                <td className="py-4 px-6 font-bold fs-4 border-b border-gray-200">{auction.title}</td>
                <td className="py-4 px-6 border-b border-gray-200 truncate">{auction.description}</td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <img src={auction.image} className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 w-50 h-50" alt="" />
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <Link to="/auctions/live">
                    <button className="bg-red-400 text-white py-1 px-2 rounded-full text-xs hover:bg-red-500 transition-opacity duration-300">Live Auction</button>
                  </Link>
                    <button onClick={()=>handleClick(auction._id)} className="bg-red-400 text-white py-1 px-2 rounded-full text-xs hover:bg-red-500 transition-opacity duration-300">Add to Fav</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {/* <MainPage/> */}
    </>
  );
}

export default Home;
