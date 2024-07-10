import React, { useState } from 'react';

import './ClientDetails.css';

const credentialData = [
  { id: 1, url: 'https://example.com/1', password: 'password1' },
  { id: 2, url: 'https://example.com/2', password: 'password2' },
  { id: 3, url: 'https://example.com/3', password: 'password3' },
  { id: 4, url: 'https://example.com/4', password: 'password4' },
  { id: 5, url: 'https://example.com/5', password: 'password5' },
  { id: 6, url: 'https://example.com/6', password: 'password6' },
  { id: 7, url: 'https://example.com/7', password: 'password7' },
  { id: 8, url: 'https://example.com/8', password: 'password8' },
  { id: 9, url: 'https://example.com/9', password: 'password9' },
  { id: 10, url: 'https://example.com/10', password: 'password10' },
];

const ClientDetails = () => {
  const [showPasswords, setShowPasswords] = useState(false);

  const toggleShowPasswords = () => {
    setShowPasswords((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="client-details">
        <h2>Client Details: raj</h2>
        <div className="client-info">
          <div className="info-row">
            <span className="label">ID</span>
            <span className="value">200856</span>
          </div>
          <div className="info-row">
            <span className="label">Name</span>
            <span className="value">Dixit raj</span>
          </div>
          <div className="info-row">
            <span className="label">Date of Birth</span>
            <span className="value">28-03-2003</span>
          </div>
          <div className="info-row">
            <span className="label">Email</span>
            <span className="value">demo@gmail.com</span>
          </div>
          
          <div className="info-row">
            <span className="label">Password Manager</span>
            <span className="value link">Dixit raj Basic Password Manager</span>
          </div>
          <div className="info-row">
            <span className="label">Description</span>
            <span className="value">—</span>
          </div>
        </div>
      </div>

      <div className="client-details">
        <h2>Credentials</h2>
        <div className="client-info">
          {credentialData.map((credential) => (
            <div key={credential.id} className="credential-item">
              <div className="info-row">
                <span className="label">URL</span>
                <span className="value">{credential.url}</span>
              </div>
              <div className="info-row">
                <span className="label">Password</span>
                <span className="value">
                  {showPasswords ? credential.password : '••••••••'}
                </span>
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={toggleShowPasswords}
                >
                  {showPasswords ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="media-accounts">
        <h3>Media Accounts</h3>
        <button type="button" className="create-account-btn">
          Add Media
        </button>
        <div className="no-accounts">
          <img
            src="path/to/icon.png"
            alt="No account"
            className="no-accounts-icon"
          />
          <p>No Media Added Yet.</p>
          <button type="button" className="create-account-btn">
            Create Media Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
