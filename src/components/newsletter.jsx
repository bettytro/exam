import React, { useState } from 'react'

const Newsletter = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target[0].value === '') {
            return;
        }
        setSubmitted(true);
    };

    return (
        <section className='p-8 bg-black text-white'>
            <div className='max-w-[1600px] mx-auto flex flex-col gap-2 justify-center items-center p-4 md:p-20'>
                <h2 className='text-4xl font-black'>Sign up for our newsletter</h2>
                <p>Get the latest news and updates on our listings</p>
                <form className='flex gap-4 mt-4' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        className='p-2 bg-white text-black'
                    />
                    <button className='bg-sec text-primary px-4 py-2'>Sign up</button>
                </form>
                {submitted && <p className='mt-4 text-white bg-green-500 p-4'>Thank you for signing up!</p>}
            </div>
        </section>
    )
}

export default Newsletter