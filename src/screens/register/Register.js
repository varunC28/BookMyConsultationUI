import React, { useState } from 'react';
import { FormControl, InputLabel, Input, Button, FormHelperText, Typography } from '@mui/material';
import axios from 'axios';
import './Register.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [contactNumberError, setContactNumberError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateContactNumber = (mobile) => {
        const contactPattern = /^[0-9]{10}$/; // Assuming a 10-digit number
        return contactPattern.test(mobile);
    };

    const handleRegister = async () => {
        let isValid = true;

        if (!firstName) {
            setFirstNameError('Please fill out this field');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!lastName) {
            setLastNameError('Please fill out this field');
            isValid = false;
        } else {
            setLastNameError('');
        }

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

        if (!mobile) {
            setContactNumberError('Please fill out this field');
            isValid = false;
        } else if (!validateContactNumber(mobile)) {
            setContactNumberError('Enter valid mobile number');
            isValid = false;
        } else {
            setContactNumberError('');
        }

        if (isValid) {
            try {
                const response = await axios.post('/users/register', { firstName, lastName, emailId, password, mobile });
                if (response.status === 200) {
                    setSuccessMessage('Registration Successful');
                    setRegisterError('');
                }
            } catch (error) {
                console.log(error);
                setRegisterError('Registration failed');
            }
        }
    };


    const handleLoginClick = () => {
        navigate('/login'); // Redirect to the Login page
    };

    return (
        <div className="register-container">
            <Button variant="h6" onClick={handleLoginClick}>Login</Button>
            <Button variant="h6">Register</Button>
            <FormControl fullWidth margin="normal" error={!!firstNameError}>
                <InputLabel>First Name</InputLabel>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setFirstNameError('')}
                />
                <FormHelperText>{firstNameError}</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!lastNameError}>
                <InputLabel>Last Name</InputLabel>
                <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => setLastNameError('')}
                />
                <FormHelperText>{lastNameError}</FormHelperText>
            </FormControl>
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
            <FormControl fullWidth margin="normal" error={!!contactNumberError}>
                <InputLabel>Contact Number</InputLabel>
                <Input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    onFocus={() => setContactNumberError('')}
                />
                <FormHelperText>{contactNumberError}</FormHelperText>
            </FormControl>
            {registerError && (
                <Typography color="error" variant="body2">{registerError}</Typography>
            )}
            {successMessage && (
                <Typography color="success" variant="body2">{successMessage}</Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                fullWidth
                style={{ marginTop: '20px' }}
            >
                REGISTER
            </Button>
        </div>
    );
};

export default Register;
