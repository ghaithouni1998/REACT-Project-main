import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const UserAccount = () => {
  const [userData, setUserData] = useState(null);
  const [boughtAuctions, setBoughtAuctions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentBidForPayment, setCurrentBidForPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/:id', {
          withCredentials: true,
        });
        setUserData(response.data)
        console.log(response.data._id);

        // Now that fetchUserData is finished, make the axios request for boughtAuctions
        const auctionsResponse = await axios.get(`http://localhost:8000/api/user/auctions/${response.data._id}`, { withCredentials: true });
        setBoughtAuctions(auctionsResponse.data);
        console.log(auctionsResponse.data);
        const favResponse = await axios.get(`http://localhost:8000/api/allFav/${response.data._id}`, { withCredentials: true });
        setFavorites(favResponse.data);
      } catch (error) {
        console.log('Error fetching user data', error);
        console.log('Error response data', error.response.data);
      }
    };

    fetchData();

    console.log(favorites);
  }, []);

  const onToken = async (e) => {
    console.log(e);
    try {
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Payment done Successfully",
        "success"
      ).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
  };

  const handlePayButtonClick = (currentBid) => {
    setCurrentBidForPayment(currentBid);
  };

  return (
    <div style={{marginTop:"12em"}} className="flex items-center justify-center h-screen">
      <div className="rounded-lg shadow-lg overflow-hidden mx-4 md:mx-10 lg:w-3/4 xl:w-2/3">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Info Fieldset */}
            <fieldset className="rounded-lg shadow-md bg-white p-6">
              <h4 className="text-lg font-semibold mb-4">User Info</h4>
              {userData && (
                <div>
                  <p>Username: {userData.username}</p>
                  <p>Email: {userData.email}</p>
                  <Link to="/user/edit">
                    <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded">
                      Edit User Info
                    </button>
                  </Link>
                </div>
              )}
            </fieldset>

            {/* Favorite Items Fieldset */}
            {favorites &&
              <fieldset className="rounded-lg shadow-md bg-white p-6">
                <h4 className="text-lg font-semibold mb-4">Favorite Items</h4>
                {favorites.map((item, index) => (
                  <>
                    <div key={index} className='d-flex justify-content-between align-items-center mb-1 '>
                      <p key={index}>{item.title}</p>
                      <img src={item.image} className='rounded' style={{ width: "5em", }} alt="" />
                    </div> </>

                ))}
              </fieldset>}
          </div>

          {/* Bought Items Fieldset */}
          {boughtAuctions &&
            <fieldset className="rounded-lg shadow-md bg-white p-6 mt-6">
              <div>
                {currentBidForPayment !== null && (
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Payment Details</h4>
                    <p>Amount to Pay: {currentBidForPayment} EUR</p>
                  </div>
                )}
                <StripeCheckout
                  amount={currentBidForPayment * 100}
                  currency="EUR"
                  token={(token) => onToken(token)}
                  stripeKey="pk_test_51NVUJMLnKGfzbvT6B5I6r9a7KUp6JB81UxojSBHflk5KuLRRLJpUrbt5YguVMLgLk2fVqBvKl2j4jxfOWWltg4Yy005loYB1Bo"
                >
                  <button className="bg-green-500 text-white w-full px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900 mb-1">
                    Check Out
                  </button>
                </StripeCheckout>
              </div>
              {boughtAuctions.map((item, index) => (
                <div key={index} className=' d-flex   flex-direction-row p-2 '>
                  <div className='col-8'>
                    <h3 style={{ fontSize: "40px" }}>{item.title}</h3>
                  </div>
                  <div style={{ backgroundColor: "red", color: "white", height: "3em", width: "8em" }} className='rounded-3 col-2  d-flex align-items-center justify-content-end pr-3'>
                    <h3 className='white fs-3'>{item.price} €</h3>
                  </div>
                  <div className='rounded col-2 d-flex justify-content-end  '>
                    <img src={item.image} className='rounded  ' style={{ width: "5em" }} alt="" />
                  </div>
                </div>
              ))}
            </fieldset>}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
