// Appointment.js
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import './Appointment.css';

const Appointment = ({ appointments, onRateClick }) => {
    if (!appointments.length) {
        return <Typography variant="h6">Login to see appointments</Typography>;
    }

    return (
        <div className="appointment-container">
            {appointments.map((appointment, index) => (
                <Paper key={index} className="paper-appointment">
                    <Typography variant="h6">Doctor: {appointment.doctorName}</Typography>
                    <Typography variant="body1">Date: {appointment.date}</Typography>
                    {appointment.symptoms && <Typography variant="body1">Symptoms: {appointment.symptoms}</Typography>}
                    {appointment.medicalHistory && <Typography variant="body1">Medical History: {appointment.medicalHistory}</Typography>}
                    <Button
                        variant="contained"
                        color="primary"
                        className="rate-button"
                        onClick={() => onRateClick(appointment)}
                    >
                        RATE APPOINTMENT
                    </Button>
                </Paper>
            ))}
        </div>
    );
};

export default Appointment;
