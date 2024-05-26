import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login';
import { loginUser, getUser } from '../helpers/usercontroller';
import { Helmet } from "react-helmet";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (!user || !user.user === null) {
                navigate('/');
            }
        };
    
        fetchUser();
    }, []);

    const onLogin = async (user) => {
        setLoading(true);
        try {
            await loginUser(user);
            setMessage('Login successful! Redirecting to homepage...');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Helmet>
            <title>Login - Holidaze</title>
            <meta
                name="description"
                content="Login to your account."
            />
        </Helmet>
        <section className="bg-primary text-sec">
            <div className="max-w-[1600px] flex flex-col justify-center items-center mx-auto p-4 py-12 md:py-32">
                <h1 className="md:text-6xl text-4xl text-center text-title font-black">Login to your account</h1>
                <LoginForm onLogin={onLogin} loading={loading} />
                {message && <div className='bg-green-500 p-6 my-4 text-white'>{message}</div>}
                {error && <div className='bg-red-500 p-6 my-4 text-white'>{error}</div>}
            </div>
        </section>
        </>
    );
};

export default Login;