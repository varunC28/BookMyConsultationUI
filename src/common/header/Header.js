// Header.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import { Tabs, Tab, Card, CardContent, Typography } from '@mui/material';
import Login from '../../screens/login/Login';
import './Header.css';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        closeModal();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="header">
            <div className="header-left">
                <div className="logo"></div>
                <span className="app-name">Doctor Finder</span>
            </div>
            <div className="header-right">
                {!isLoggedIn ? (
                    <Button variant="contained" color="primary" onClick={openModal}>
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
