import React, { useEffect, useState } from "react";
import { getUser } from "../helpers/usercontroller";
import { fetchBookings } from "../helpers/apidata";
import { formatDateWithoutTime } from "../helpers/toDate";
const Bookings = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);

      if (fetchedUser) {
        const fetchedBookings = await fetchBookings(fetchedUser.user.name);
        setBookings(fetchedBookings.data);
      }
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      {bookings.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {bookings.map((booking) => (
            <li key={booking.id} className="w-full bg-slate-700 text-white flex justify-between items-center p-8">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold">{booking.customer.name}</h2>
                <p>
                  {formatDateWithoutTime(booking.dateFrom)} -{" "}
                  {formatDateWithoutTime(booking.dateTo)}
                </p>
              </div>
                <div>
                    <p>{booking.venue.name}</p>
                    <p>{booking.guests} guests</p>
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
};

export default Bookings;
