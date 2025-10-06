import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    accountNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.idNumber || !formData.accountNumber || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!/^[0-9]{13}$/.test(formData.idNumber)) {
      setError('ID Number must be exactly 13 digits');
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10,12}$/.test(formData.accountNumber)) {
      setError('Account Number must be 10-12 digits');
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number and special character');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await register(
      formData.name, 
      formData.idNumber,
      formData.accountNumber,
      formData.email, 
      formData.password
    );
    
    if (result.success) {
      setSuccess('Registration successful! You can now login with your credentials.');
      // Clear form
      setFormData({
        name: '',
        idNumber: '',
        accountNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2><i className="fas fa-user-plus"></i> Create Bank Account</h2>
        <p>Register for international payments</p>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit} className="wide-form">
          <div className="form-row">
            <div className="form-group">
              <label><i className="fas fa-user"></i> Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><i className="fas fa-id-card"></i> ID Number</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => setFormData({...formData, idNumber: e.target.value.replace(/\D/g, '')})}
                placeholder="13-digit ID number"
                maxLength="13"
                required
              />
              <small>Must be exactly 13 digits</small>
            </div>

            <div className="form-group">
              <label><i className="fas fa-credit-card"></i> Account Number</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value.replace(/\D/g, '')})}
                placeholder="10-12 digit account number"
                maxLength="12"
                required
              />
              <small>Must be 10-12 digits</small>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label><i className="fas fa-envelope"></i> Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><i className="fas fa-lock"></i> Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Create a strong password"
                required
              />
              <small>8+ characters with uppercase, lowercase, number & special character</small>
            </div>
            
            <div className="form-group">
              <label><i className="fas fa-lock"></i> Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            <i className="fas fa-user-plus"></i> {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        {success && (
          <div className="proceed-container">
            <Link to="/login" className="proceed-btn">
              <i className="fas fa-sign-in-alt"></i> Proceed to Login
            </Link>
          </div>
        )}
        
        <p className="auth-link">
          Already have an account? <Link to="/login"><i className="fas fa-sign-in-alt"></i> Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;