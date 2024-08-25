import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './DoctorList.css';

const DoctorList = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch specialties from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/doctors/speciality')
      .then(response => {
        setSpecialties(response.data);
      })
      .catch(error => {
        setError('Failed to load specialties');
      });
  }, []);

  // Fetch doctors from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/doctors')
      .then(response => {
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initially show all doctors
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load doctors');
        setLoading(false);
      });
  }, []);

  // Filter doctors based on selected specialty
  useEffect(() => {
    if (selectedSpecialty) {
      const filtered = doctors.filter(doctor =>
        doctor.speciality?.toUpperCase() === selectedSpecialty.toUpperCase()
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialty, doctors]);

  const handleBookAppointment = (doctor) => {
    navigate('/bookappointment', { state: { doctor } });
  };

  const handleViewDetails = (doctor) => {
    navigate('/doctordetails', { state: { doctor } });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Specialty</InputLabel>
        <Select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
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
          <Paper key={doctor.id} style={{ margin: 15, padding: 20 }}>
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
    </div>
  );
};

export default DoctorList;
