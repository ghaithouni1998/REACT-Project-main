import React from 'react';
import Login from '../components/auth/Login';

const LogLog = (props) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-xxl">
                <div className="mx-auto">
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default LogLog;
