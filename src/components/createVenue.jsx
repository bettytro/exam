import React, { useState } from "react";
import { createVenue } from "../helpers/apidata";

const CreateVenue = ({ onVenueCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([{ url: "", alt: "" }]);
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [meta, setMeta] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [location, setLocation] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    lat: 0,
    lng: 0,
  });
  const [venueMessage, setVenueMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description || !price || !maxGuests) {
      setVenueMessage("Please fill in all required fields");
      return;
    }

    try {
      const venue = {
        name,
        description,
        media,
        price: parseInt(price),
        maxGuests: parseInt(maxGuests),
        meta,
        location,
      };
      const success = await createVenue(venue);
      onVenueCreated(success);
    } catch (error) {
      console.error(error);
      onVenueCreated(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex gap-4 flex-wrap">
      <div className="flex flex-col w-full md:basis-1/2">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 mb-4 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col w-full md:basis-1/2">
          <label htmlFor="maxGuests">Max Guests:</label>
          <input
            type="number"
            id="maxGuests"
            name="maxGuests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="mt-2 mb-4 p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex gap-4 flex-wrap">

      <div className="flex flex-col w-full md:basis-1/2">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
          />
      </div>
      <div className="flex flex-col w-full md:basis-1/2">
        <label htmlFor="zip">Zip:</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={location.zip}
          onChange={(e) => setLocation({ ...location, zip: e.target.value })}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
          />
      </div>
        </div>
        <div className="flex gap-4 flex-wrap">

        <div className="flex flex-col w-full md:basis-1/2">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={location.country}
          onChange={(e) =>
            setLocation({ ...location, country: e.target.value })
        }
        className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
        </div>
      <div className="flex flex-col basis-1/2">
        <label htmlFor="continent">Continent:</label>
        <input
          type="text"
          id="continent"
          name="continent"
          value={location.continent}
          onChange={(e) =>
            setLocation({ ...location, continent: e.target.value })
        }
        className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
        </div>
        <div className="flex gap-4 items-start">
        <label htmlFor="wifi">Wifi:</label>
        <input
          type="checkbox"
          id="wifi"
          name="wifi"
          checked={meta.wifi}
          onChange={(e) => setMeta({ ...meta, wifi: e.target.checked })}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex gap-4 items-start">
        <label htmlFor="parking">Parking:</label>
        <input
          type="checkbox"
          id="parking"
          name="parking"
          checked={meta.parking}
          onChange={(e) => setMeta({ ...meta, parking: e.target.checked })}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex gap-4 items-start">
        <label htmlFor="breakfast">Breakfast:</label>
        <input
          type="checkbox"
          id="breakfast"
          name="breakfast"
          checked={meta.breakfast}
          onChange={(e) => setMeta({ ...meta, breakfast: e.target.checked })}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex gap-4 items-start">
        <label htmlFor="pets">Pets:</label>
        <input
          type="checkbox"
          id="pets"
          name="pets"
          checked={meta.pets}
          onChange={(e) => setMeta({ ...meta, pets: e.target.checked })}
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="media">Image URL:</label>
        <input
          type="text"
          id="media"
          name="media"
          value={media[0].url}
          onChange={(e) =>
            setMedia([{ url: e.target.value, alt: media[0].alt }])
          }
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="mediaAlt">Image Alt:</label>
        <input
          type="text"
          id="mediaAlt"
          name="mediaAlt"
          value={media[0].alt}
          onChange={(e) =>
            setMedia([{ url: media[0].url, alt: e.target.value }])
          }
          className="mt-2 mb-4 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col">
  <label htmlFor="lat">Latitude:</label>
  <input
    type="number"
    id="lat"
    name="lat"
    value={location.lat}
    onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) })}
    className="mt-2 mb-4 p-2 border border-gray-300 rounded"
  />
</div>
<div className="flex flex-col">
  <label htmlFor="lng">Longitude:</label>
  <input
    type="number"
    id="lng"
    name="lng"
    value={location.lng}
    onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
    className="mt-2 mb-4 p-2 border border-gray-300 rounded"
  />
</div>

      <button
        type="submit"
        className="mt-2 p-2 bg-title hover:bg-sec text-white rounded"
      >
        Create Venue
      </button>
      {venueMessage && (
        <div className="bg-title text-white p-4 mt-4">{venueMessage}</div>
      )}
    </form>
  );
};

export default CreateVenue;
