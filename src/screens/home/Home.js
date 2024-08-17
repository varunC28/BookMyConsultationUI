import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const renderDoctorsTab = () => (
    <div>
      <Typography variant="h6" gutterBottom>Doctors</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Filter by Speciality</InputLabel>
        <Select
          value={selectedFilter}
          onChange={handleFilterChange}
          label="Filter by Specialty"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="cardiology">Cardiology</MenuItem>
          <MenuItem value="neurology">Neurology</MenuItem>
          <MenuItem value="orthopedics">Orthopedics</MenuItem>
          {/* Add more specialties */}
        </Select>
      </FormControl>
      {/* Example doctor list */}
      <div>
        <Typography variant="body1">Dr. John Doe</Typography>
        <Typography variant="body1">Speciality: </Typography>
        <Typography variant="body1">Rating: </Typography>
        <Button variant="contained" color="primary">BOOK APPOINTMENT</Button>
        <Button variant="outlined" color="secondary">VIEW DETAILS</Button>
      </div>
      {/* Add more doctors */}
    </div>
  );

  const renderAppointmentsTab = () => (
    <div>
      <Typography variant="h6" gutterBottom>Appointments</Typography>
      {/* Example appointment list */}
      <div>
        <Typography variant="body1">Appointment with Dr. John Doe</Typography>
        <Button variant="contained" color="primary">RATE APPOINTMENT</Button>
      </div>
      {/* Add more appointments */}
    </div>
  );

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="DOCTORS" />
        <Tab label="APPOINTMENT" />
      </Tabs>
      <Box p={3}>
        {tabIndex === 0 && renderDoctorsTab()}
        {tabIndex === 1 && renderAppointmentsTab()}
      </Box>
    </Box>
  );
};

export default Home;
