import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

const DoctorDetails = ({ open, onClose, doctor }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Doctor Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Name: {doctor.name}</Typography>
        <Typography variant="body1">Total Experience: 10 years</Typography> {/* Example data */}
        <Typography variant="body1">Specialty: {doctor.specialty}</Typography>
        <Typography variant="body1">Date of Birth: 01/01/1980</Typography> {/* Example data */}
        <Typography variant="body1">City: New York</Typography> {/* Example data */}
        <Typography variant="body1">Email: {doctor.email}</Typography> {/* Example data */}
        <Typography variant="body1">Mobile: {doctor.mobile}</Typography> {/* Example data */}
        <Typography variant="body1">Rating: {doctor.rating}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetails;
