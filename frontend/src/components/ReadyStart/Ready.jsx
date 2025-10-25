import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Ready.css';

const ReadySection = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/signin'); // Redirects to SignIn page
  };

  return (
    <section className="ready-section">
      <div className="ready-container">
        <h2 className="ready-title">Ready to Get Started?</h2>
        <p className="ready-subtitle">
          Join thousands of employers and job seekers who trust JobPortal
        </p>

        <button className="ready-btn" onClick={handleCreateAccount}>
          Create Your Account
        </button>
      </div>

      {/* Footer Copyright */}
      <div className="styles_copyright___vhVD">
        © 2025 JobPortal. All rights reserved
      </div>
    </section>
  );
};

export default ReadySection;
