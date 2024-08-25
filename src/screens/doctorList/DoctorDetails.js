import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const DoctorDetails = () => {
  const location = useLocation();
  const { doctor } = location.state || {}; // Destructure the doctor from state

  if (!doctor) {
    return <Typography variant="h6">No doctor details available.</Typography>;
  }

  return (
    <Dialog open={true} onClose={() => {}}>
      <DialogTitle>Doctor Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Name: {doctor.firstName} {doctor.lastName}</Typography>
        <Typography variant="body1">Total Experience: {doctor.totalYearsOfExp}</Typography>
        <Typography variant="body1">Specialty: {doctor.speciality}</Typography>
        <Typography variant="body1">Date of Birth: {doctor.dob}</Typography>
        <Typography variant="body1">City: {doctor.address.city}</Typography>
        <Typography variant="body1">Email: {doctor.emailId}</Typography>
        <Typography variant="body1">Mobile: {doctor.mobile}</Typography>
        <Typography variant="body1">Rating: {doctor.rating}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetails;
