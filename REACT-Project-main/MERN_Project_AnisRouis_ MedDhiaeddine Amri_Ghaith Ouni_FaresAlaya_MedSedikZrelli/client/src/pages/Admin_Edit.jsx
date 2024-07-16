import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Admin_Edit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(false);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/auctions/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setImage(res.data.image);
      })
      .catch(err => console.log(err));
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const tempAuction = {
      title,
      description,
      price,
      image
    };

    axios.put(`http://localhost:8000/api/auctions/edit/${id}`, tempAuction)
      .then((res) => {
        console.log(res.data);
        nav("/auctions/admin");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message);
        }
        setErrors(errorArr);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" rounded-lg shadow-lg overflow-hidden mx-4 md:mx-10">
        <div className="mt-10 text-center font-bold">Edit Auction</div>
        <div className="mt-3 text-center text-4xl font-bold">Update Auction Details</div>
        <div className="p-8">
          <form onSubmit={submitHandler} className='container'>
            {errors.map((err, index) => (
              <p style={{ color: "red" }} key={index}>
                {err}
              </p>
            ))}
            <div className="flex justify-center mb-6">
                <div>
              <label className='block text-sm font-medium text-gray-700'>Title</label>
              <input
                type="text"
                name="title"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              /></div> &nbsp;
              <div>
              <label className='block text-sm font-medium text-gray-700'>Image URL</label>
              <input
                type="text"
                name="image"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Image URL *"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              /></div>
            </div>
            <div className="mb-6">
              <label className='block text-sm font-medium text-gray-700'>Description</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label className='block text-sm font-medium text-gray-700'>Price</label>
              <input
                type="number"
                name="price"
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Price *"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 flex flex-col items-center">
              <button type="submit" className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-900">Update Auction</button>
            </div>
            <button className='btn btn-secondary' onClick={() => nav('/auctions/admin')}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin_Edit;
