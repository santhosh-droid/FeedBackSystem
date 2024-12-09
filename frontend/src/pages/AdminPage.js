import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import '../styles/AdminDashboard.css'; // Ensure you have CSS for styling the cards

const AdminPage = () => {
  const [approvedFeedbacks, setApprovedFeedbacks] = useState([]);
  const [unapprovedFeedbacks, setUnapprovedFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/feedback`);
    //   console.log('Fetched Feedback:', data);
  
      const feedbacks = data.feedbacks; // Extract feedbacks array
        console.log("All Feedbacks",feedbacks);
      // Filter feedbacks into approved and unapproved
      const approved = feedbacks.filter((feedback) => feedback.approved);
      const unapproved = feedbacks.filter((feedback) => !feedback.approved);
  
      setApprovedFeedbacks(approved);
      setUnapprovedFeedbacks(unapproved);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };
  

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/feedback/${id}/approve`, { approved: true });
      fetchFeedbacks(); // Refresh feedback lists after approval
    } catch (error) {
      console.error('Error approving feedback:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/feedback/${id}`);
      fetchFeedbacks(); // Refresh feedback lists after deletion
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Section for Unapproved Feedback */}
      <h2>Pending Approval</h2>
      <div className="feedback-grid">
        {unapprovedFeedbacks.length > 0 ? (
          unapprovedFeedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-card">
              <p><strong>User:</strong> {feedback.user}</p>
              <p><strong>Rating:</strong> {feedback.rating}</p>
              <p><strong>Comment:</strong> {feedback.comment}</p>
              <div className="feedback-actions">
                <button onClick={() => handleApprove(feedback._id)}>Approve</button>
                <button onClick={() => handleDelete(feedback._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No feedbacks pending approval.</p>
        )}
      </div>

      {/* Section for Approved Feedback */}
      <h2>Approved Feedback</h2>
      <div className="feedback-grid">
        {approvedFeedbacks.length > 0 ? (
          approvedFeedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-card">
              <p><strong>User:</strong> {feedback.user}</p>
              <p><strong>Rating:</strong> {feedback.rating}</p>
              <p><strong>Comment:</strong> {feedback.comment}</p>
              <div className="feedback-actions">
                <button onClick={()=>handleDelete(feedback._id)}>Delete</button>
                </div>
            </div>
          ))
        ) : (
          <p>No approved feedbacks available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
