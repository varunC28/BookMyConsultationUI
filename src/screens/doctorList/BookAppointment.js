import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [timeSlotError, setTimeSlotError] = useState('');
  const [bookingError, setBookingError] = useState('');

  const location = useLocation();
  const { doctor } = location.state || {}; // Destructure the doctor from state



  if (!doctor) {
    return <Typography variant="h6">No doctor details available.</Typography>;
  }

  const handleDateChange = (newValue) => setDate(newValue);

  const handleBookAppointment = async () => {
    // Log the current state of variables
    console.log('Time Slot:', timeSlot);
    console.log('Date:', date);
    console.log('Medical History:', medicalHistory);
    console.log('Symptoms:', symptoms);
  
    if (!timeSlot) {
      setTimeSlotError('Select a time slot');
      console.log('Error: No time slot selected');
      return;
    }
  
    const token = localStorage.getItem('BEARER_TOKEN'); // Get token from local storage
    if (!token) {
      setBookingError('User not authenticated');
      console.log('Error: No authentication token found');
      return;
    }
  
    console.log('Token:', token);
  
    // Retrieve user info from local storage
    const user = JSON.parse(localStorage.getItem('USER_INFO'));
    if (!user) {
      setBookingError('User info not available');
      console.log('Error: No user info found');
      return;
    }
  
    console.log('User Info:', user);
  
    try {
      // Log the data to be sent in the request
      const appointmentData = {
        doctorId: doctor.id, // Adjust based on how doctor ID is stored
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}` ,
        userEmailId: user.emailAddress,
        timeSlot: timeSlot,
        appointmentDate: date.toISOString().split('T')[0], // Format date
        symptoms: symptoms,
        priorMedicalHistory: medicalHistory
      };
      console.log('Appointment Data:', appointmentData);
  
      const response = await axios.post('http://localhost:8080/appointments', appointmentData, {
        headers: {
          'Authorization': `Bearer ${token}` // Use the token in the request header
        }
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        // Handle successful booking
        setBookingError('');
        alert('Appointment booked successfully!');
      }
    } catch (error) {
      console.error('Error while booking appointment:', error);
      setBookingError('Failed to book appointment. Please try again.');
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Book an Appointment</Typography>
      <Typography variant="h6">Name: {doctor.firstName} {doctor.lastName}</Typography>
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
    </div>
  );
};

export default BookAppointment;