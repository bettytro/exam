import React from "react";
import { MdOutlineWifi, MdFreeBreakfast } from "react-icons/md";
import { BiSolidDog } from "react-icons/bi";
import { RiParkingBoxFill } from "react-icons/ri";


function MostRecent({ listings }) {

 

  return (
    <section className="container mx-auto max-w-[1600px] py-16 px-12">
      <h2 className="text-title text-4xl font-black my-8">
        Most Recent Venues
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {listings &&
    listings.map((listing, index) => (
      <div key={index} className="flex flex-col relative">
        <a href={`/venues/${listing.id}`}>
          <div className="absolute top-0 right-0 text-black bg-[#dcbba9] p-2 z-10">
            {listing._count.bookings}
          </div>
          <div className="group w-full aspect-video object-cover mb-4">
            <img
              src={listing.media[0].url}
              alt={listing.media[0].alt}
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-100 ease-in-out"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 justify-between items-center">
            <p className="text-sec text-xs">{listing.location.city}</p>
            <div className="flex gap-2 px-1">
              {listing.meta.wifi && <MdOutlineWifi />}
              {listing.meta.breakfast && <MdFreeBreakfast />}
              {listing.meta.pets && <BiSolidDog />}
              {listing.meta.parking && <RiParkingBoxFill />}
            </div>
            </div>
            <h3 className="text-sec text-xl font-semibold">
              {listing.name}
            </h3>
            <p className="text-sec text-lg bg-primary  w-fit py-2 px-4 font-black">{listing.price} $</p>
          </div>
        </a>
      </div>
    ))}
</div>
    </section>
  );
}

export default MostRecent;
