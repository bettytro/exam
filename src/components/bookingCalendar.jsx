import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookingCalendar = ({ bookings = [] }) => {
    const bookedDates = bookings.flatMap(booking => {
        const start = new Date(booking.dateFrom);
        const end = new Date(booking.dateTo);
        const dates = [];
        for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            dates.push(new Date(dt));
        }
        return dates;
    });

    const isBooked = date => bookedDates.some(bookedDate =>
        bookedDate.getUTCFullYear() === date.getUTCFullYear() &&
        bookedDate.getUTCMonth() === date.getUTCMonth() &&
        bookedDate.getUTCDate() === date.getUTCDate() 
    );

    return (
<Calendar
    className="p-6"
    tileContent={({ date, view }) => {
        if (view === 'month') {
            const booked = isBooked(date);
            if (booked) {
                return <div style={{ backgroundColor: 'red', height: '100%', width: '100%' }}></div>;
            } else {
                return <div style={{ backgroundColor: 'green', height: '100%', width: '100%' }}></div>;
            }
        }
    }}
/>
    );
};

export default BookingCalendar;