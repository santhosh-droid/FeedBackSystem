import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/feedback`);
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/feedback/${id}/approve`);
            alert('Feedback approved');
            setFeedbacks(feedbacks.map(f => f._id === id ? { ...f, approved: true } : f));
        } catch (error) {
            console.error('Error approving feedback:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/feedback/${id}`);
            alert('Feedback deleted');
            setFeedbacks(feedbacks.filter(f => f._id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            {feedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-item">
                    <p><strong>User:</strong> {feedback.user}</p>
                    <p><strong>Rating:</strong> {feedback.rating}</p>
                    <p><strong>Comment:</strong> {feedback.comment}</p>
                    {!feedback.approved && (
                        <button onClick={() => handleApprove(feedback._id)}>Approve</button>
                    )}
                    <button onClick={() => handleDelete(feedback._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;
