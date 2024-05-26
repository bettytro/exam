import React from 'react';

const VenueCard = ({ venue }) => {
    return (
        <div className="overflow-hidden">
            <img className="w-full aspect-video" src={venue.media[0]?.url} alt={venue.media[0]?.alt} />
            <div className="">
                <div className="font-bold mb-2">{venue.name}</div>
                <p className="text-gray-700">
                   {venue.price}$
                </p>
            </div>
        </div>
    );
};

export default VenueCard;