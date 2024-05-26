import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import Venues from "./pages/venues";
import Register from "./pages/register";
import Login from "./pages/login";
import RegisterVM from "./pages/registerVenueManager";
import Profile from "./pages/profile";
import ListVenues from "./pages/listvenues";
import MyBookings from "./pages/myBookings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/venues/:id" element={<Venues />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-vm" element={<RegisterVM />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/venues" element={<ListVenues />} />
      <Route path="/bookings" element={<MyBookings />} />
    </Routes>
  );
}

export default App;