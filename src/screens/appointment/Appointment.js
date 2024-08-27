import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import './Appointment.css';
import axios from 'axios';
import RateAppointment from './RateAppointment';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('BEARER_TOKEN');
      const user = JSON.parse(localStorage.getItem('USER_INFO'));

      if (!token) {
        setError('Login to see appointments');
        return;
      }

      if (!user || !user.id) {
        setError('User information is missing');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/users/${user.id}/appointments`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAppointments(response.data); // Update state with fetched appointments
      } catch (err) {
        setError('Failed to load appointments');
        console.error('Error fetching appointments:', err);
      }
    };

    fetchAppointments();
  }, []);

  if (error) {
    return <Typography variant="h6">{error}</Typography>;
  }

  const handleRateAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsRateModalOpen(true);
  };

  const handleRateSubmit = (ratingData) => {
    console.log('Rating Data:', ratingData);
    setIsRateModalOpen(false);
  };

  return (
    <div className="appointment-container">
      {appointments.length === 0 ? (
        <Typography variant="h6">No appointments found</Typography>
      ) : (
        appointments.map((appointment, index) => (
          <Paper key={index} className="paper-appointment">
            <Typography variant="h6">Doctor: {appointment.doctorName}</Typography>
            <Typography variant="body1">Date: {appointment.appointmentDate}</Typography>
            {appointment.symptoms && <Typography variant="body1">Symptoms: {appointment.symptoms}</Typography>}
            {appointment.priorMedicalHistory && <Typography variant="body1">Medical History: {appointment.priorMedicalHistory}</Typography>}
            <Button
              variant="contained"
              color="primary"
              className="rate-button"
              onClick={() => handleRateAppointment(appointment)}
            >
              RATE APPOINTMENT
            </Button>
          </Paper>
        ))
      )}

      {/* Render the RateAppointment modal */}
      {selectedAppointment && (
        <RateAppointment
          open={isRateModalOpen}
          onClose={() => setIsRateModalOpen(false)}
          onSubmit={handleRateSubmit}
          doctorId={selectedAppointment.doctorId} // Passing doctorId
          appointmentId={selectedAppointment.appointmentId}  // Passing appointmentId
        />
      )}
    </div>
  );
};

export default Appointment;
