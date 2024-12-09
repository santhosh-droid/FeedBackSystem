import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const UserPage = () => {
    return (
        <div className="user-page">
            <FeedbackForm />
            <FeedbackList />
        </div>
    );
};

export default UserPage;
