import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DoctorList from '../doctorList/DoctorList'; 
import Appointment from '../appointment/Appointment';

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
      <FormControl fullWidth margin="normal">
      </FormControl>
      <Appointment/>
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
