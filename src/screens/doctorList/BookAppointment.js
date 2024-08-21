// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@mui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import { useNavigate } from 'react-router-dom';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DatePicker } from '@mui/lab';



// const BookAppointment = ({ open, onClose, doctor }) => {
//   const [date, setDate] = useState(new Date());
//   const [timeSlot, setTimeSlot] = useState('');
//   const [medicalHistory, setMedicalHistory] = useState('');
//   const [symptoms, setSymptoms] = useState('');
//   const [timeSlotError, setTimeSlotError] = useState('');

//   const handleDateChange = (date) => setDate(date);

//   const handleBookAppointment = () => {
//     if (!timeSlot) {
//       setTimeSlotError('Select a time slot');
//       return;
//     }
//     // Add booking logic here
//     navigate('/bookappointment');
//     onClose();
//   };

//   const navigate = useNavigate();


//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Book an Appointment</DialogTitle>
//       <DialogContent>
//         <TextField
//           fullWidth
//           label="Doctor's Name"
//           value={doctor.name}
//           InputProps={{ readOnly: true }}
//           margin="normal"
//         />
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//           <KeyboardDatePicker
//             margin="normal"
//             label="Date"
//             format="MM/dd/yyyy"
//             value={date}
//             onChange={handleDateChange}
//             fullWidth
//           />
//         </MuiPickersUtilsProvider>
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Time Slot</InputLabel>
//           <Select
//             value={timeSlot}
//             onChange={(e) => {
//               setTimeSlot(e.target.value);
//               setTimeSlotError('');
//             }}
//           >
//             {/* Example time slots */}
//             <MenuItem value="09:00">09:00 AM</MenuItem>
//             <MenuItem value="10:00">10:00 AM</MenuItem>
//             {/* More slots */}
//           </Select>
//           {timeSlotError && <Typography color="error">{timeSlotError}</Typography>}
//         </FormControl>
//         <TextField
//           fullWidth
//           label="Medical History"
//           value={medicalHistory}
//           onChange={(e) => setMedicalHistory(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           fullWidth
//           label="Symptoms"
//           value={symptoms}
//           onChange={(e) => setSymptoms(e.target.value)}
//           margin="normal"
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleBookAppointment}
//           style={{ marginTop: 20 }}
//         >
//           BOOK APPOINTMENT
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BookAppointment;
