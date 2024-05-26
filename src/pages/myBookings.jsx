import React from 'react'
import Bookings from '../components/bookings'
import { Helmet } from "react-helmet";

const MyBookings = () => {
  return (
    <>
    <Helmet>
        <title>My Bookings - Holidaze</title>
        <meta
            name="description"
            content="List of all bookings you have received for all your venues."
        />
    </Helmet>
    <section className='bg-primary text-sec'>
        <div className='max-w-[1600px] flex flex-col justify-center items-center mx-auto p-4 py-12 md:py-32'>
            <h1 className='md:text-6xl text-4xl text-center text-title mb-4 font-black'>My Bookings</h1>
            <p className='text-center'>Here is a list of all the bookings you have received for all your venues.</p>
        </div>
    </section>
    <Bookings />
    </>
  )
}

export default MyBookings