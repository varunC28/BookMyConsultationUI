import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../common/header/Header";
import Login from "./login/Login";
import Register from "./register/Register";
import BookAppointment from "./doctorList/BookAppointment";
import DoctorDetails from "./doctorList/DoctorDetails";
import Appointment from "./appointment/Appointment";
import { AuthProvider } from '../contexts/AuthContext';
import RateAppointment from "./appointment/RateAppointment";
const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <AuthProvider>
    <Router>
      <div className="main-container">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="/bookappointment" element={<BookAppointment />} />
          <Route path="/doctordetails" element={<DoctorDetails />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/rateappointment" element={<RateAppointment/>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default Controller;