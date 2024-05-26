import React, { useState } from "react";
import { createBooking } from "../helpers/apidata";

const CreateBooking = ({ venueId, maxGuests, onBookingCreated }) => {
    const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [guests, setGuests] = useState("");
    const [bookingMessage, setBookingMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!dateFrom || !dateTo || !guests) {
        setBookingMessage('Please fill in all fields');
        return;
    }
    if (parseInt(guests) > maxGuests) {
        setBookingMessage('Too many guests for this listing');
      return;
    }
    if (new Date(dateFrom) > new Date(dateTo)) {
        setBookingMessage('Invalid dates');
      return;
    }
    if (new Date(dateFrom) < new Date()) {
        setBookingMessage('Cannot book past dates');
      return;
    }
    if (parseInt(guests) < 1) {
        setBookingMessage('Invalid number of guests');
      return;
    }


    try {
        const booking = {
            dateFrom: new Date(dateFrom),
            dateTo: new Date(dateTo),
            guests: parseInt(guests),
            venueId
        };
        const success = await createBooking(booking);
        onBookingCreated(success);
    } catch (error) {
        console.error(error);
        onBookingCreated(false);
    }
};
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="dateFrom">Date From:</label>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dateTo">Date To:</label>
        <input
          type="date"
          id="dateTo"
          name="dateTo"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="guests">Guests:</label>
        <input
          type="number"
          name="guests"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="mt-2 p-2 bg-title hover:bg-sec text-white rounded">
        Create Booking
      </button>
    {bookingMessage && (
        <div className="bg-title text-white p-4 mt-4">{bookingMessage}</div>
        )
}
        </form>

  );
};

export default CreateBooking;
