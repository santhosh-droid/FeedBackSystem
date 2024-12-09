import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FeedbackList.css';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/feedback`);
                console.log('API Response:', response.data);

                // Assuming the feedback data is in response.data.feedbacks
                const feedbackData = Array.isArray(response.data.feedbacks)
                    ? response.data.feedbacks
                    : [];
                  // Filter to only show approved feedbacks
                  const approvedFeedbacks = feedbackData.filter((feedback) => feedback.approved);
                  setFeedbacks(approvedFeedbacks);

                // Calculate average rating
                if (feedbackData.length > 0) {
                    const totalRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0);
                    setAverageRating((totalRating / feedbackData.length).toFixed(1));
                } else {
                    setAverageRating(0); // No feedbacks, reset average rating
                }
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                alert('Unable to fetch feedbacks. Please try again later.');
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <div className="feedback-list">
            <h2>Feedbacks</h2>
            <p>Average Rating: {averageRating || "N/A"}</p>
            <div className="feedback-grid">
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback._id} className="feedback-card">
                            <p><strong>User:</strong> {feedback.user}</p>
                            <p><strong>Rating:</strong> {feedback.rating}</p>
                            <p><strong>Comment:</strong> {feedback.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No feedbacks available.</p>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;
