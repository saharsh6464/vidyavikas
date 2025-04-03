import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TopBar = () => {
  return (
    <nav className="navbar navbar-dark" style={{ backgroundColor: '#282c34', borderBottom: '3px solid #9575cd' }}>
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1" style={{ color: '#ffffff' }}>Coding Challenges Platform</span>
        <div className="d-flex">
          <button
            className="btn btn-outline-light me-2"
            onClick={() => console.log("Profile Clicked")}
            style={{ color: '#ffffff', borderColor: '#ffffff' }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#282c34';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ffffff';
            }}
          >
            Profile
          </button>
          <button
            className="btn btn-outline-light"
            onClick={() => console.log("Settings Clicked")}
            style={{ color: '#ffffff', borderColor: '#ffffff' }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.color = '#282c34';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#ffffff';
            }}
          >
            Settings
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;