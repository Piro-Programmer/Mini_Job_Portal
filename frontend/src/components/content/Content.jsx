import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Content.css';

const Content = () => {
  const navigate = useNavigate(); // hook for navigation

  const handleGetStarted = () => {
    navigate('/signin'); // navigate to SignIn page
  };

  const handleBrowseJobs = () => {
    navigate('/jobs'); // navigate to Jobs page
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">Find Your Dream Job Today</h1>
        <p className="hero-subtitle">
          Connect with top employers or find talented candidates.
          Your perfect match is just a click away.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="btn btn-secondary" onClick={handleBrowseJobs}>
            Browse Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Content;
