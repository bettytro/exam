import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getUser } from "../helpers/usercontroller";
import CreateVenue from "../components/createVenue";
import VenueList from "../components/venueList";
import { getVenues } from "../helpers/apidata";
import { Helmet } from "react-helmet";

Modal.setAppElement("#root");

const ListVenues = () => {
    const [user, setUser] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [venues, setVenues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      const getLoggedInUser = async () => {
        const user = await getUser();
        setUser(user.user);
      };
      getLoggedInUser();
    }, []);
  
    useEffect(() => {
        const fetchVenues = async () => {
          const venues = await getVenues(currentPage);
          setVenues(venues);
        };
        fetchVenues();
      }, [currentPage]);
    
      const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };
    
      const lastPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const nextPage = () => {
        if (!venues.meta.isLastPage) {
          setCurrentPage(currentPage + 1);
        }
      };

  return (
    <>
        <Helmet>
            <title>Venues - Holidaze</title>
            <meta
                name="description"
                content="List of all venues available for booking."
            />
        </Helmet>
      <section className="bg-primary text-sec">
        <div className="max-w-[1600px] flex flex-col justify-center items-center mx-auto p-4 py-12 md:py-32">
          <h1 className="text-6xl text-title text-center font-black">List of Venues</h1>
          <p className="text-center mt-2">Here is a list of all the venues available for booking.</p>
          {user && user.venueManager && (
            <button
              onClick={openModal}
              className="bg-title text-white px-4 py-2 mt-4"
            >
              Add Venue
            </button>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Venue"
            style={{
              content: {
                width: "80vw",
                height: "80vh",
                margin: "auto",
              },
            }}
          >
            <CreateVenue onVenueCreated={closeModal} />
          </Modal>
        </div>
      </section>
      <VenueList venues={venues} lastPage={lastPage} nextPage={nextPage} />
    </>
  );
};

export default ListVenues;
