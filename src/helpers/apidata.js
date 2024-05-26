import axios from 'axios';

const APIURL = "https://v2.api.noroff.dev/holidaze";




export const getVenues = async (page) => {
  try {
    const response = await axios.get(`${APIURL}/venues?limit=50&page=${page}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getVenueById = async (id) => {
  try {
    const response = await axios.get(`${APIURL}/venues/${id}?_bookings=true&_owner=true`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const createVenue = async (venue) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${APIURL}/venues`, venue, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const editVenue = async (id, venue) => {
  const token = localStorage.getItem("token");


  try {
    const response = await axios.put(`${APIURL}/venues/${id}`, venue, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteVenue = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${APIURL}/venues/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchBookings = async (username) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${APIURL}/profiles/${username}/bookings?_customer=true&_venue=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const searchProfiles = async (search) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${APIURL}/profiles/search?q=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const searchVenues = async (search) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${APIURL}/venues/search?q=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key":
          "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


export const createBooking = async (booking) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${APIURL}/bookings`, booking, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const testToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { error: 'No token found' };
  }
  try {
    const response = await axios.get(`${APIURL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getUserByName = async (username) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${APIURL}/profiles/${username}?_venues=true`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updateProfile = async (username, avatarUrl, avatarAlt) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${APIURL}/profiles/${username}`, {
      avatar: {
        url: avatarUrl,
        alt: avatarAlt,
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": "c0923845-b034-42be-80b3-202d25245741",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}