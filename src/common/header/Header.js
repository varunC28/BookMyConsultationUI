// Header.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import { Tabs, Tab, Card, CardContent, Typography } from '@mui/material';
import Login from '../../screens/login/Login';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
import axios from 'axios';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {
        isLoggedIn,
        setIsLoggedIn,
        
      } = useAuth()
    console.log(isLoggedIn);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        //closeModal();
    };

    const handleLogout = async () => {

        
        const token = localStorage.getItem('BEARER_TOKEN'); // Get token from local storage
        if (!token) {
            //setBookingError('User not authenticated');
            console.log('Error: No authentication token found');
            return;
        }
  
  
          const response = await axios.post('http://localhost:8080/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}` // Use the token in the request header
            }
        });
        localStorage.clear();
        setIsLoggedIn(false);
    };
    
    const handleLoginClick = () => {
        navigate('/login'); // Redirect to the Register page
    };

    return (
        <div className="header">
            <div className="header-left">
                <div className="logo">
                <img src={logo} alt="Logo" style={{ width: '35px', height: '35px' }} />
                </div>
                <span className="app-name">Doctor Finder</span>
            </div>
            <div className="header-right">
                {!isLoggedIn ? (
                    <Button variant="contained" color="primary" onClick={handleLoginClick}>
                        Login
                    </Button>
                ) : (
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
                <Card>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="LOGIN" />
                        <Tab label="REGISTER" />
                    </Tabs>
                    <CardContent>
                        {tabValue === 0 && <Login onLoginSuccess={handleLoginSuccess} />}
                        {tabValue === 1 && (
                            <Typography variant="h6">Register Form</Typography>
                            // Include your register form component here
                        )}
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default Header;