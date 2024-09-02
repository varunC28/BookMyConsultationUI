import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const DoctorDetails = ({ doctor }) => {
  if (!doctor) {
    return <Typography variant="h6">No doctor details available.</Typography>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <Star key={i} style={{ color: '#FFA500' }} />
        ) : (
          <StarBorder key={i} style={{ color: '#FFA500' }} />
        )
      );
    }
    return stars;
  };
  

  return (
<div>
<Typography variant="h6">Dr: {doctor.firstName} {doctor.lastName}</Typography>
        <Typography variant="body1">Total Experience: {doctor.totalYearsOfExp}</Typography>
        <Typography variant="body1">Specialty: {doctor.speciality}</Typography>
        <Typography variant="body1">Date of Birth: {doctor.dob}</Typography>
        <Typography variant="body1">City: {doctor.address.city}</Typography>
        <Typography variant="body1">Email: {doctor.emailId}</Typography>
        <Typography variant="body1">Mobile: {doctor.mobile}</Typography>
        <Typography variant="body1">
    Rating: {renderStars(doctor.rating)}
  </Typography>
</div>


  );
};

export default DoctorDetails;
