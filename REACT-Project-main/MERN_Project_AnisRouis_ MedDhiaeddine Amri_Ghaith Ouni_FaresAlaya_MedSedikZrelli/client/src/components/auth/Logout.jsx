import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      window.location.href="/"
      //navigate('/');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  return (
    <button className='btn btn-danger' onClick={()=>logout()}>Logout</button>
  )
}

export default Logout