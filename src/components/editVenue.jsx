import React, { useState, useEffect } from "react";
import { editVenue, deleteVenue } from "../helpers/apidata";

const EditVenue = ({ venue, onVenueUpdated, onVenueDeleted }) => {
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

  useEffect(() => {
    if (venue) {
      setName(venue.name);
      setDescription(venue.description);
      setMedia(venue.media);
      setPrice(venue.price);
      setMaxGuests(venue.maxGuests);
      setMeta(venue.meta);
      setLocation(venue.location);
    }
  }, [venue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !description || !price || !maxGuests) {
      setVenueMessage("Please fill in all required fields");
      return;
    }

    try {
      const updatedVenue = {
        name,
        description,
        media,
        price: parseInt(price),
        maxGuests: parseInt(maxGuests),
        meta,
        location,
      };
        const id = venue.id;
      const success = await editVenue(id, updatedVenue);
      onVenueUpdated(success.data);
    } catch (error) {
      console.error(error);
      onVenueUpdated(false);
    }
  };

  const handleDelete = async () => {
    try {
      const success = await deleteVenue(venue.id);
      onVenueDeleted(success);
    } catch (error) {
      console.error(error);
      onVenueDeleted(false);
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
            className="mt-2 mb-4 p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea
            id="description"
            name="description"
            className="mt-2 mb-4 p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className="flex gap-4">
            <div className="flex basis-1/2 flex-col">
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="price"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            </div>
            <div className="flex basis-1/2 flex-col">
            <label htmlFor="maxGuests">Max Guests:</label>
            <input
                type="number"
                id="maxGuests"
                name="maxGuests"
                value={maxGuests}
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) => setMaxGuests(e.target.value)}
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
            className="mt-2 mb-4 p-2 border border-gray-300 rounded"
            onChange={(e) =>
                setLocation({ ...location, address: e.target.value })
            }
            />
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col">
            <label htmlFor="city">City:</label>
            <input
                type="text"
                id="city"
                name="city"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"
                value={location.city}
                onChange={(e) =>
                    
                setLocation({ ...location, city: e.target.value })
                }
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="zip">Zip:</label>
            <input
                type="text"
                id="zip"
                name="zip"
                value={location.zip}
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"
                onChange={(e) =>
                setLocation({ ...location, zip: e.target.value })
                }
            />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col">
            <label htmlFor="country">Country:</label>
            <input
                type="text"
                id="country"
                name="country"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"

                value={location.country}
                onChange={(e) =>
                setLocation({ ...location, country: e.target.value })
                }
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="continent">Continent:</label>
            <input
                type="text"
                id="continent"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"

                name="continent"
                value={location.continent}
                onChange={(e) =>
                setLocation({ ...location, continent: e.target.value })
                }
            />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col">
            <label htmlFor="wifi">Wifi:</label>
            <input
                type="checkbox"
                id="wifi"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"

                name="wifi"
                checked={meta.wifi}
                onChange={(e) =>
                setMeta({ ...meta, wifi: e.target.checked })
                }
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="parking">Parking:</label>
            <input
                type="checkbox"
                id="parking"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"
                name="parking"
                checked={meta.parking}
                onChange={(e) =>
                setMeta({ ...meta, parking: e.target.checked })
                }
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="breakfast">Breakfast:</label>
            <input
                type="checkbox"
                id="breakfast"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"
                name="breakfast"
                checked={meta.breakfast}
                onChange={(e) =>
                setMeta({ ...meta, breakfast: e.target.checked })
                }
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="pets">Pets:</label>
            <input
                type="checkbox"
                id="pets"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"

                name="pets"
                checked={meta.pets}
                onChange={(e) => setMeta({ ...meta, pets: e.target.checked })}
            />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col">
            <label htmlFor="lat">Latitude:</label>
            <input
                type="number"
                id="lat"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"

                name="lat"
                value={location.lat}
                onChange={(e) =>
                setLocation({ ...location, lat: e.target.value })
                }
            />
            </div>
            <div className="flex flex-col">
            <label htmlFor="lng">Longitude:</label>
            <input
                type="number"
                id="lng"
                className="mt-2 mb-4 p-2 border border-gray-300 rounded"

                name="lng"
                value={location.lng}
                onChange={(e) =>
                setLocation({ ...location, lng: e.target.value })
                }
            />
            </div>
        </div>

      <button
        type="submit"
        className="mt-2 p-2 bg-title hover:bg-sec text-white rounded"
      >
        Save Changes
      </button>
      <button
        onClick={handleDelete}
        className="mt-2 p-2 bg-red-500 hover:bg-red-700 text-white rounded"
      >
        Delete Venue
      </button>
      {venueMessage && (
        <div className="bg-title text-white p-4 mt-4">{venueMessage}</div>
      )}
    </form>
  );
};

export default EditVenue;