import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import { Tabs, Tab, Card, CardContent } from '@mui/material';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';

// Set the app element for accessibility
Modal.setAppElement('#root'); // Make sure you have an element with id 'root' in your index.html

const Header = () => {
    const [tabValue, setTabValue] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const subtitle = useRef(null);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            borderRadius: '8px',
            padding: '0px', // No extra padding to avoid extra box
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
    };

    useEffect(() => {
        document.body.classList.toggle('blurred', modalIsOpen);
    }, [modalIsOpen]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        closeModal();
    };

    const afterOpenModal = () => {
        if (subtitle.current) {
            subtitle.current.style.color = '#f00';
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('BEARER_TOKEN');
        await axios.post('http://localhost:8080/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.clear();
        setIsLoggedIn(false);
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
                    <Button variant="contained" color="primary" onClick={openModal}>
                        Login
                    </Button>
                ) : (
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login and Register Modal"
            >
                <Card sx={{ boxShadow: 'none', borderRadius: '8px' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="LOGIN" />
                        <Tab label="REGISTER" />
                    </Tabs>
                    <CardContent sx={{ padding: '16px' }}>
                        {tabValue === 0 && <Login onLoginSuccess={handleLoginSuccess} />}
                        {tabValue === 1 && <Register />}
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default Header;
