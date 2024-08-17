import React from "react";
import Home from "../screens/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../common/header/Header";
import Login from "./login/Login";
import Register from "./register/Register";
import BookAppointment from "./doctorList/BookAppointment";


const Controller = () => {
  const baseUrl = "/api/v1/";
  return (
    <Router>
      <div className="main-container">
        <Header/>
        <Home/>
        <Routes>
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/register" element={<Register />} />
                {/* <Route path="/bookappointment" element={<BookAppointment />} /> */}
        </Routes>

      </div>
    </Router>
  );
};

export default Controller;
