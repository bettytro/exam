import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/registerForm';
import { registerUser } from '../helpers/usercontroller';
import { Helmet } from "react-helmet";


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    
    const onRegister = async (formData) => {
        setLoading(true);
        try {
            await registerUser(formData);
            setMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Helmet>
            <title>Register - Holidaze</title>
            <meta
                name="description"
                content="Register your account."
            />
        </Helmet>
        <section className="bg-primary text-sec">
            <div className="max-w-[1600px] flex flex-col justify-center items-center mx-auto p-4 py-12 md:py-32">
                <h1 className="md:text-6xl text-4xl text-center text-title font-black">Register your account</h1>
                <RegisterForm onRegister={onRegister} vm={false} loading={loading} />
            {message && <div className='bg-green-500 p-6 text-white'>{message}</div>}
            {error && <div className='bg-red-500 p-6 text-white'>{error}</div>}
            </div>
        </section>
        </>
    );
};

export default Register;