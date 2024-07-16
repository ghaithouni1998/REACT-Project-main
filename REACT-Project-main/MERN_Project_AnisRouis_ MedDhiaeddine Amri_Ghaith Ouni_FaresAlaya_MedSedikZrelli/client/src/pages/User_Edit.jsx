import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then(res => {
        console.log("Fetched data:", res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(err => console.log(err));
  }, [id]);
  

  const submitHandler = (e) => {
    e.preventDefault();
    const tempUser = {
      username,
      email,
    };

    axios.put(`http://localhost:8000/api/user/edit/${id}`, tempUser)
      .then((res) => {
        console.log(res.data);
        nav("/user");
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
      <div className="rounded-lg shadow-lg overflow-hidden mx-4 md:mx-10">
        <div className="mt-10 text-center font-bold">Edit User</div>
        <div className="mt-3 text-center text-4xl font-bold">Update User Details</div>
        <div className="p-8">
          <form onSubmit={submitHandler} className='container'>
            {errors.map((err, index) => (
              <p style={{ color: "red" }} key={index}>
                {err}
              </p>
            ))}
            <div className="mb-6">
              <label className='block text-sm font-medium text-gray-700'>Username</label>
              <input
                type="text"
                name="username"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Username *"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Omitted password input for security reasons */}
            <div className="mb-6 flex flex-col items-center">
              <button type="submit" className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-900">Update User</button>
            </div>
            <button className='btn btn-secondary' onClick={() => nav('/user/:id')}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
