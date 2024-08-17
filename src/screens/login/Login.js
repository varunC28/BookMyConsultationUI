import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, FormHelperText, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login/Login.css';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleLogin = async () => {
        let isValid = true;
        if (!email) {
            setEmailError('Please fill out this field');
            isValid = false;
        } else if (!validateEmail(email)) {
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
                const response = await axios.post('/auth/login', { email, password });
                if (response.status === 200) {
                    setLoginError('');
                    onLoginSuccess();
                }
            } catch (error) {
                setLoginError('Invalid email or password');
            }
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Redirect to the Register page
    };

    return (
        <div className="login-container">
            <Button variant="h6">Login</Button>
            <Button variant="h6" onClick={handleRegisterClick}>Register</Button>
            <FormControl fullWidth margin="normal" error={!!emailError}>
                <InputLabel>Email</InputLabel>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
