import React, { useState } from 'react';
import { Modal, Paper, Typography, TextField, Button, Rating, FormControl } from '@mui/material';
import './RateAppointment.css';
import axios from 'axios';

const RateAppointment = ({ open, onClose, onSubmit, doctorId, appointmentId }) => {
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState('');
    const [ratingError, setRatingError] = useState('');

    const handleSubmit = () => {
        if (rating === null) {
            setRatingError('Submit a rating');
            return;
        }
        setRatingError('');
        submitRating({ rating, comments, doctorId, appointmentId }); // Pass the necessary arguments
        onSubmit({ rating, comments, doctorId, appointmentId }); // Include doctorId and appointmentId
        onClose();
    };

    const submitRating = async ({ rating, comments, doctorId, appointmentId }) => {
        const token = localStorage.getItem('BEARER_TOKEN');
    
        try {
            const response = await axios.post(
                'http://localhost:8080/ratings',
                {
                    rating,
                    comments,
                    doctorId,
                    appointmentId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log('Rating submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Paper className="rate-appointment-modal">
                <div className="card-header">
                    <Typography variant="h6">Rate an Appointment</Typography>
                </div>
                <div>
                    <FormControl fullWidth margin="normal">
                        <Typography variant="body1">Comments (optional):</Typography>
                        <TextField
                            className="comment-field"
                            multiline
                            rows={4}
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Typography variant="body1">Rating:</Typography>
                        <Rating
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue)}
                        />
                        {ratingError && <Typography className="rating-warning">{ratingError}</Typography>}
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        className="rate-button"
                        onClick={handleSubmit}
                    >
                        RATE APPOINTMENT
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
};

export default RateAppointment;
