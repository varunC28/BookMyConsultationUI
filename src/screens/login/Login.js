// Login.js
import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, FormHelperText, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import '../login/Login.css';

const Login = ({ onLoginSuccess }) => {  // Add onLoginSuccess as a prop
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (emailId) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(emailId);
    };

    const handleLogin = async () => {
        let isValid = true;
        if (!emailId) {
            setEmailError('Please fill out this field');
            isValid = false;
        } else if (!validateEmail(emailId)) {
            setEmailError('Enter valid Email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Please fill out this field');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (isValid) {
            try {
                const token = btoa(`${emailId}:${password}`);
                const response = await axios.post('/auth/login', {}, {
                    headers: {
                        'Authorization': `Basic ${token}`
                    }
                });

                if (response.status === 200) {
                    const { accessToken } = response.data;
                    localStorage.setItem('BEARER_TOKEN', accessToken);
                    setIsLoggedIn(true);
                    onLoginSuccess();  // Call the prop function
                }
            } catch (error) {
                setLoginError('Invalid email or password');
            }
        }
    };

    return (
        <div className="login-container">
            <FormControl fullWidth margin="normal" error={!!emailError}>
                <InputLabel>Email</InputLabel>
                <Input
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    onFocus={() => setEmailError('')}
                />
                <FormHelperText>{emailError}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!passwordError}>
                <InputLabel>Password</InputLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordError('')}
                />
                <FormHelperText>{passwordError}</FormHelperText>
            </FormControl>
            {loginError && (
                <Typography color="error" variant="body2">{loginError}</Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
                style={{ marginTop: '20px' }}
            >
                LOGIN
            </Button>
        </div>
    );
};

export default Login;
