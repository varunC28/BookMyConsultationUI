import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import { Tabs, Tab, Card, CardContent } from '@mui/material';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import './Header.css';
import logo from '../../assets/logo.jpeg';
import { useAuth } from "../../contexts/AuthContext";
import axios from 'axios';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    useEffect(() => {
        document.body.classList.toggle('blurred', isModalOpen);
    }, [isModalOpen]);

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
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="overlay"
                ariaHideApp={false}
            >
                <Card>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="LOGIN" />
                        <Tab label="REGISTER" />
                    </Tabs>
                    <CardContent>
                        {tabValue === 0 && <Login onLoginSuccess={handleLoginSuccess} />}
                        {tabValue === 1 && <Register />}
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default Header;
