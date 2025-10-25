import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='nav_root'>
      <div className='brand'>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='brand-svg'>
          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <rect width="20" height="14" x="2" y="6" rx="2" />
        </svg>
        <span className='brand-name'>JobPortal</span>
      </div>

      <div className='right_nav-part'>
        <Button className="browser-btn" type='text'
          onClick={() => navigate("/jobs")}>
          Browse Jobs
        </Button>
        <Button
          className="signin-btn"
          type='primary'
          shape='round'
          onClick={() => navigate('/signin')}
        >
          Sign In
        </Button>
      </div>
    </div>
  )
}

export default Navbar

