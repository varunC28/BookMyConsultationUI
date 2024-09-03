import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [timeSlotError, setTimeSlotError] = useState('');
  const [bookingError, setBookingError] = useState('');

  if (!doctor) {
    return <Typography variant="h6">No doctor details available.</Typography>;
  }

  const handleDateChange = (newValue) => setDate(newValue);

  const handleBookAppointment = async () => {
    if (!timeSlot) {
      setTimeSlotError('Select a time slot');
      return;
    }

    const token = localStorage.getItem('BEARER_TOKEN');
    if (!token) {
      setBookingError('User not authenticated');
      return;
    }

    const user = JSON.parse(localStorage.getItem('USER_INFO'));
    console.log('Retrieved user info:', user);
    if (!user) {
      setBookingError('User info not available');
      return;
    }

    try {
      const appointmentData = {
        doctorId: doctor.id,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmailId: user.emailAddress,
        timeSlot: timeSlot,
        appointmentDate: date.toISOString().split('T')[0],
        symptoms: symptoms,
        priorMedicalHistory: medicalHistory,
      };

      const response = await axios.post('http://localhost:8080/appointments', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setBookingError('');
        alert('Appointment booked successfully!');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography
        variant="h6"
        style={{
          pointerEvents: 'none', // Prevents interaction
          opacity: 0.6, // Makes it look disabled (optional)
        }}
      >
        <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>Doctor Name*</span>
        <br />
        {doctor.firstName} {doctor.lastName}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />
      </LocalizationProvider>
      <FormControl fullWidth margin="normal">
        <InputLabel>Time Slot</InputLabel>
        <Select
          value={timeSlot}
          onChange={(e) => {
            setTimeSlot(e.target.value);
            setTimeSlotError('');
          }}
        >
          <MenuItem value="10AM-11AM">10AM-11AM</MenuItem>
          <MenuItem value="11AM-12AM">11AM-12AM</MenuItem>
          <MenuItem value="12AM-01PM">12AM-01PM</MenuItem>
          <MenuItem value="05PM-06PM">05PM-06PM</MenuItem>
          <MenuItem value="06PM-07PM">06PM-07PM</MenuItem>
          <MenuItem value="07PM-08PM">07PM-08PM</MenuItem>
          <MenuItem value="08PM-09PM">08PM-09PM</MenuItem>
        </Select>
        {timeSlotError && <Typography color="error">{timeSlotError}</Typography>}
      </FormControl>
      <TextField
        fullWidth
        label="Medical History"
        value={medicalHistory}
        onChange={(e) => setMedicalHistory(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleBookAppointment}
        style={{ marginTop: 20 }}
      >
        BOOK APPOINTMENT
      </Button>
      {bookingError && <Typography color="error" style={{ marginTop: 20 }}>{bookingError}</Typography>}
    </div>
  );
};

export default BookAppointment;
