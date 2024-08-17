import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import './DoctorList.css';

const specialties = ['Cardiologist', 'Dermatologist', 'Pediatrician']; // Example specialties
const doctors = [
  // Example doctor data
  { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', rating: '4.5' },
  // More doctors
];

const DoctorList = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [openAppointment, setOpenAppointment] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (selectedSpecialty) {
      setFilteredDoctors(doctors.filter(doctor => doctor.specialty === selectedSpecialty));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [selectedSpecialty]);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenAppointment(true);
  };

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDetails(true);
  };

  return (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>Specialty</InputLabel>
        <Select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          {specialties.map((specialty) => (
            <MenuItem key={specialty} value={specialty}>{specialty}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {filteredDoctors.map((doctor) => (
        <Paper key={doctor.id} style={{ margin: 15, padding: 20, cursor: 'pointer' }}>
          <Typography variant="h6">{doctor.name}</Typography>
          <Typography variant="body1">Specialty: {doctor.specialty}</Typography>
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
      ))}
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
