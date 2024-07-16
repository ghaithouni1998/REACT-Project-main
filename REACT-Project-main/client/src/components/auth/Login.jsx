import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/user/:id', {
                withCredentials: true,
            });
            setUserData(response.data)
            console.log(response.data._id);
            console.log(response.data.role);
            
            if(response.data.role==="user"){

                window.location.href='/auctions'
            }
            if(response.data.role==="admin"){

                window.location.href='/auctions/admin'
            }
                
            
        } catch (error) {
            console.log('Error fetching user data', error);
            console.log('Error response data', error.response.data);
        }
    };
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', user, { withCredentials: true });
            console.log('SERVER RESPONSE:', response.data);
            await fetchData();

            console.log(userData);
            localStorage.setItem('token', response.data.token);
              
        
                
           
            //navigate('/auctions');
        } catch (error) {
            console.log('Error:', error.response.data);
            let tempErrors = {};
            for (let key of Object.keys(error.response.data)) {
                console.log(key, '------', error.response.data[key].message);
                tempErrors[key] = error.response.data[key].message;
            }
            setErrors({ ...tempErrors });
        }
    };

    


    return (
        <div className="py-16">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Batta.tn</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    {/* React Login Component */}
                    <form onSubmit={login}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email}
                            />
                            <span className="text-danger">{errors.email}</span>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <a href="#" className="text-xs text-gray-500">
                                    Forget Password?
                                </a>
                            </div>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                            />
                            <span className="text-danger">{errors.password}</span>
                        </div>
                        <div className="mt-8">
                            <button
                                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {/* End of React Login Component */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <a href="/register" className="text-xs text-gray-500 uppercase">
                            or sign up
                        </a>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;