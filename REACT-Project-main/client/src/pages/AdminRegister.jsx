import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', email: '', password: '', confirmPW: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPW: '' });

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/admin/register', user, { withCredentials: true });
            if (response.data) {
                console.log('SERVER RESPONSE:', response.data);
                localStorage.setItem('token', response.data.token);
                window.location.href="/"
                // navigate('/auctions');
            } else {
                console.log('Error: No data in the response');
            }
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
                    <p className="text-xl text-gray-600 text-center">Register now!</p>

                    {/* React Register Component */}
                    <form onSubmit={register}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text"
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                value={user.username}
                            />
                            <span className="text-danger">{errors.username}</span>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                value={user.email}
                            />
                            <span className="text-danger">{errors.email}</span>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                value={user.password}
                            />
                            <span className="text-danger">{errors.password}</span>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                                onChange={(e) => setUser({ ...user, confirmPW: e.target.value })}
                                value={user.confirmPW}
                            />
                            <span className="text-danger">{errors.confirmPW}</span>
                        </div>
                        <div className="mt-8">
                            <button
                                className="bg-blue-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    {/* End of React Register Component */}
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <a href="/login" className="text-xs text-gray-500 uppercase">
                            or sign in
                        </a>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
