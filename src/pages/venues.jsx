import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../helpers/apidata";
import { getUser, loginUser } from "../helpers/usercontroller";
import { formatDate } from "../helpers/toDate";
import { ImageGallery } from "../components/imageGallery";
import {
  MdOutlinePerson,
  MdOutlineWifi,
  MdFreeBreakfast,
} from "react-icons/md";
import { BiSolidDog } from "react-icons/bi";
import { RiParkingBoxFill } from "react-icons/ri";
import LoginForm from "../components/login";
import Modal from "react-modal";
import CreateBooking from "../components/createBooking";
import BookingCalendar from "../components/bookingCalendar";
import EditVenue from "../components/editVenue";
import { Helmet } from "react-helmet";

const Venues = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");

  Modal.setAppElement("#root");

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });

    getVenueById(id).then((data) => {
      setVenue(data.data);
    });
  }, [id]);

  const handleLogin = async (username, password) => {
    const user = await loginUser({ username, password });
    setUser(user);

    setShowLogin(false);
  };

  const onVenueDeleted = () => {
    window.location.href = "/venues";
  };

  const onVenueUpdated = (venue) => {
    setVenue(venue);
    setShowEdit(false);
  };
  const isUserOwner = user && venue && user.name === venue.owner.name;
  // const isUserOwner = true;
  if (!venue) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{venue.name} - Holidaze</title>
        <meta name="description" content={venue.description} />
      </Helmet>
      <Modal
        isOpen={showLogin}
        onRequestClose={() => setShowLogin(false)}
        contentLabel="Login Form"
        style={{
          content: {
            width: "400px",
            height: "400px",
            margin: "auto",
          },
        }}
      >
        <LoginForm onLogin={handleLogin} />
      </Modal>
      <Modal
        isOpen={showEdit}
        onRequestClose={() => setShowEdit(false)}
        contentLabel="Edit Venue"
        style={{
          content: {
            width: "80vw",
            height: "80vh",
            margin: "auto",
          },
        }}
      >
        <EditVenue
          venue={venue}
          onVenueDeleted={onVenueDeleted}
          onVenueUpdated={onVenueUpdated}
        />
      </Modal>
      <section className="bg-primary text-sec">
        <div className="max-w-[1600px] mx-auto p-8 py-12">
          <div className="flex md:flex-row justify-between items-center">
            <h1 className="md:text-6xl text-2xl font-black">{venue.name}</h1>
            <p className="text-white bg-title px-4 py-2 md:text-2xl text-md">
              {venue.price} $
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-sec -mt-1">
              {formatDate(venue.created)}
            </p>
            {isUserOwner && (
              <button
                className="bg-title text-white mt-4 md:mt-0 px-4 py-2"
                onClick={() => setShowEdit(true)}
              >
                Edit
              </button>
            )}
          </div>
          <p className="text-black mt-2">{venue.description}</p>
        </div>
      </section>
      <section className="bg-primary text-sec">
        <div className="max-w-[1600px] md:flex-row flex-col flex gap-8 mx-auto p-8 py-12">
          <div className="basis-1/2">
            <ImageGallery media={venue.media} />
          </div>
          <div className="basis-1/2 bg-title text-white p-8 h-fit rounded">
            <div className="flex justify-end">
              <h2 className="text-4xl sr-only font-black">Details</h2>
              <div className="flex gap-2 items-center">
                <MdOutlinePerson className="text-xl" />
                <p>{venue.maxGuests}</p>
              </div>
            </div>
            <p className="mt-4 text-2xl">{venue.location?.address}</p>
            <p className="text-sm">
              {venue.location?.city}, {venue.location?.zip}
            </p>
            <p className="text-sm">
              {venue.location?.country}, {venue.location?.continent}
            </p>
            <div className="flex gap-2 text-2xl mt-8">
              {venue.meta?.wifi && <MdOutlineWifi />}
              {venue.meta?.breakfast && <MdFreeBreakfast />}
              {venue.meta?.pets && <BiSolidDog />}
              {venue.meta?.parking && <RiParkingBoxFill />}
            </div>
            <button
              className="bg-primary text-black px-4 py-2 mt-8 rounded"
              onClick={() => (user ? setShowModal(true) : setShowLogin(true))}
            >
              {user ? "Book now" : "Log in to book"}
            </button>

            <Modal
              isOpen={showModal}
              onRequestClose={() => setShowModal(false)}
              contentLabel="Login Form"
              style={{
                content: {
                  width: "70vw",
                  height: "fit-content",
                  margin: "auto",
                },
              }}
            >
              <CreateBooking
                venueId={venue.id}
                maxGuests={venue.maxGuests}
                onBookingCreated={(success) => {
                  if (success) {
                    setBookingMessage("Booking created successfully");
                    setTimeout(() => {
                      setShowModal(false);
                      setBookingMessage("");
                    }, 5000);
                  } else {
                    setBookingMessage("Booking failed");
                  }
                }}
              />
              {bookingMessage && (
                <div className="bg-title text-white p-4 mt-4">
                  {bookingMessage}
                </div>
              )}
            </Modal>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-[1600px] mx-auto p-8 py-12">
          <h2 className="text-4xl font-black text-title mb-8">
            Check availability
          </h2>
          <BookingCalendar bookings={venue.bookings} />
        </div>
      </section>
    </>
  );
};

export default Venues;
