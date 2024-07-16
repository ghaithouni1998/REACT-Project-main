import React from 'react';
import Register from '../components/auth/Register';

const LogReg = (props) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-xxl">
                <div className="mx-auto">
                    <Register />
                </div>
            </div>
        </div>
    );
}

export default LogReg;
