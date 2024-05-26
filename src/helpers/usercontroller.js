import axios from "axios";
const APIURL = "https://v2.api.noroff.dev/auth";

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${APIURL}/login?_holidaze=true`, user);
    localStorage.setItem("token", response.data.data.accessToken);

    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");

  return {
    user,
    token,
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${APIURL}/register`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}



