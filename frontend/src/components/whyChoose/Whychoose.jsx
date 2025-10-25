import React from 'react';
import { Button } from 'antd';
import './WhyChooseSection.css';

const WhyChooseSection = () => {
  return (
    <section className="why-section">
      <div className="why-container">
        <h2 className="why-title">Why Choose JobPortal?</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-card-content">
              <div className="why-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="why-svg"
                >
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </svg>
              </div>
              <h3 className="why-card-title">Quality Jobs</h3>
              <p className="why-card-text">
                Access thousands of verified job postings from top companies
              </p>
            </div>
          </div>


          <div className="why-card">
            <div className="why-card-content">
              <div className="why-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="why-svg"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="why-card-title">Talented Pool</h3>
              <p className="why-card-text">
                Connect with skilled professionals ready to join your team
              </p>
            </div>
          </div>

          <div className="why-card">
            <div className="why-card-content">
              <div className="why-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="why-svg"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="why-card-title">Easy Matching</h3>
              <p className="why-card-text">
                Smart algorithms to match the right candidates with the right jobs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
