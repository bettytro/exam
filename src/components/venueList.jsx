import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  VenueCard  from "./venueCard";
const VenueList = ({ venues, lastPage, nextPage }) => {
const [venueData, setVenueData] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
    if (venues && venues.meta) {
      setVenueData(venues.data);
      setCurrentPage(venues.meta.currentPage);
    }
  }, [venues]);


const isFirstPage = currentPage === 1;


  return (
    <section>
      <div className="max-w-[1600px] flex flex-col justify-center items-center mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {venueData &&
                venueData.map((venue) => (
                <Link to={`/venues/${venue.id}`} key={venue.id}>
                    <VenueCard venue={venue} />
                </Link>
                ))}
        </div>
        <div className="flex justify-between w-full mt-4">
            {isFirstPage ? <div></div> : (
                <button
                    onClick={() => lastPage()}
                    className="bg-title text-white px-4 py-2"
                >
                    Previous
                </button>
            )}
            <button
                onClick={() => nextPage()}
                className="bg-title text-white px-4 py-2"
            >
                Next
            </button>
        </div>
      </div>
    </section>
  );
};

export default VenueList;
