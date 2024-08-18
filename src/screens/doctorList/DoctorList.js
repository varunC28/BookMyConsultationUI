import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import './DoctorList.css';

const DoctorList = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [openAppointment, setOpenAppointment] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch specialties from the backend
  useEffect(() => {
    console.log('Fetching specialties...');
    axios.get('http://localhost:8080/doctors/speciality')
      .then(response => {
        console.log('Specialties fetched:', response.data);
        setSpecialties(response.data);
      })
      .catch(error => {
        console.error('Error fetching specialties:', error);
        setError('Failed to load specialties');
      });
  }, []);

  // Fetch doctors from the backend
  useEffect(() => {
    console.log('Fetching doctors...');
    axios.get('http://localhost:8080/doctors')
      .then(response => {
        console.log('Doctors fetched:', response.data);
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initially show all doctors
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors');
        setLoading(false);
      });
  }, []);

  // Filter doctors based on selected specialty
  useEffect(() => {
    console.log('Filtering doctors by specialty:', selectedSpecialty);
    if (selectedSpecialty) {
      console.log(doctors);
      
      const filtered = doctors.filter(doctor => {
        const specialty = doctor.speciality ? doctor.speciality.toUpperCase() : 'ABC';
        console.log(specialty);
        return specialty === selectedSpecialty.toUpperCase();
      });
  
      console.log('Filtered doctors:', filtered);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialty, doctors]);
  
  
  

  const handleBookAppointment = (doctor) => {
    console.log('Booking appointment for doctor:', doctor);
    setSelectedDoctor(doctor);
    setOpenAppointment(true);
  };

  const handleViewDetails = (doctor) => {
    console.log('Viewing details for doctor:', doctor);
    setSelectedDoctor(doctor);
    setOpenDetails(true);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <FormControl fullWidth margin="normal">
  <InputLabel>Specialty</InputLabel>
  <Select
    value={selectedSpecialty}
    onChange={(e) => {
      const selectedValue = e.target.value;
      console.log('Selected specialty changed:', selectedValue);
      setSelectedSpecialty(selectedValue);
      // console.log('selectedSpecialty state:',selectedSpecialty);
    }}
  >
    <MenuItem value="">All Specialties</MenuItem>
    {specialties.map((specialty) => (
      <MenuItem key={specialty} value={specialty}>{specialty}</MenuItem>
    ))}
  </Select>
</FormControl>

      {filteredDoctors.length === 0 ? (
        <Typography>No doctors available for the selected specialty</Typography>
      ) : (
        filteredDoctors.map((doctor) => (
          <Paper key={doctor.id} style={{ margin: 15, padding: 20, cursor: 'pointer' }}>
            <Typography variant="h6">{doctor.firstName} {doctor.lastName}</Typography>
            <Typography variant="body1">Specialty: {doctor.speciality}</Typography>
            <Typography variant="body1">Rating: {doctor.rating}</Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
              onClick={() => handleBookAppointment(doctor)}
            >
              BOOK APPOINTMENT
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleViewDetails(doctor)}
            >
              VIEW DETAILS
            </Button>
          </Paper>
        ))
      )}
      {selectedDoctor && (
        <>
          <BookAppointment
            open={openAppointment}
            onClose={() => setOpenAppointment(false)}
            doctor={selectedDoctor}
          />
          <DoctorDetails
            open={openDetails}
            onClose={() => setOpenDetails(false)}
            doctor={selectedDoctor}
          />
        </>
      )}
    </div>
  );
};

export default DoctorList;
