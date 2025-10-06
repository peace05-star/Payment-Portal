import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Manage your international payments securely and efficiently</p>
          <div className="user-badge">
            <span><i className="fas fa-credit-card"></i> Account: {user?.accountNumber}</span>
            <span><i className="fas fa-envelope"></i> Email: {user?.email}</span>
          </div>
        </div>
        <button onClick={logout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-money-bill-transfer"></i>
          </div>
          <div className="stat-info">
            <h3>Send Payment</h3>
            <p>Transfer funds internationally with competitive exchange rates</p>
          </div>
          <button className="stat-action" disabled>
            <i className="fas fa-paper-plane"></i> Send Money
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-history"></i>
          </div>
          <div className="stat-info">
            <h3>Payment History</h3>
            <p>View your transaction history and payment status</p>
          </div>
          <button className="stat-action" disabled>
            <i className="fas fa-list"></i> View History
          </button>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-user-cog"></i>
          </div>
          <div className="stat-info">
            <h3>Account Settings</h3>
            <p>Manage your profile and security preferences</p>
          </div>
          <button className="stat-action" disabled>
            <i className="fas fa-cog"></i> Settings
          </button>
        </div>
      </div>

      {/* Security Features Showcase */}
      <div className="security-section">
        <h2><i className="fas fa-shield-alt"></i> Security Features Active</h2>
        <div className="security-grid">
          <div className="security-item">
            <div className="security-icon">
              <i className="fas fa-lock"></i>
            </div>
            <div>
              <h4>Password Hashing & Salting</h4>
              <p>Your password is securely encrypted using bcrypt with 12 salt rounds</p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <i className="fas fa-shield-check"></i>
            </div>
            <div>
              <h4>Input Validation</h4>
              <p>All inputs are validated using RegEx patterns to prevent malicious data</p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            <div>
              <h4>Rate Limiting</h4>
              <p>Protected against brute force attacks (max 100 requests per 15min)</p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <i className="fas fa-ban"></i>
            </div>
            <div>
              <h4>XSS Protection</h4>
              <p>Input sanitization prevents cross-site scripting attacks</p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <i className="fas fa-database"></i>
            </div>
            <div>
              <h4>SQL Injection Protection</h4>
              <p>Parameterized queries prevent database injections</p>
            </div>
          </div>

          <div className="security-item">
            <div className="security-icon">
              <i className="fas fa-key"></i>
            </div>
            <div>
              <h4>JWT Tokens</h4>
              <p>Secure session management with encrypted tokens</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h2><i className="fas fa-chart-line"></i> Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item success">
            <div className="activity-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="activity-details">
              <p><strong>Account Verified</strong></p>
              <small>Your account has been successfully verified and secured</small>
            </div>
            <span className="activity-time">Just now</span>
          </div>
          
          <div className="activity-item info">
            <div className="activity-icon">
              <i className="fas fa-lock"></i>
            </div>
            <div className="activity-details">
              <p><strong>Security Enabled</strong></p>
              <small>All security features are active and protecting your data</small>
            </div>
            <span className="activity-time">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;