import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FeedbackForm.css';

const FeedbackForm = () => {
    const [user, setUser] = useState('');
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/feedback`, {
                user,
                rating,
                comment,
            });
            alert('Feedback submitted successfully');
            setUser('');
            setRating(1);
            setComment('');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback');
        }
    };

    return (
        <div className="feedback-form">
            <h2>Submit Your Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name:</label>
                    <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
                </div>
                <div>
                    <label>Rating:</label>
                    <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} required />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
