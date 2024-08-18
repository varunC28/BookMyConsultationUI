import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DoctorList from '../doctorList/DoctorList'; 

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  const renderDoctorsTab = () => (
    <div>
      <FormControl fullWidth margin="normal">
      </FormControl>
      <DoctorList />
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
