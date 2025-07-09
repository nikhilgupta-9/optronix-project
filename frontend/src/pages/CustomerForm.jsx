import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import LocationButton from '../components/LocationButton';
import MessageBox from '../components/MessageBox';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import MapPreview from '../components/MapPreview';

const CustomerForm = () => {
    // state for form data 
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      address: '',
      password: '',
      confirmPassword: '',
      latitude: '',
      longitude: '',
    });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [addressCount, setAddressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // set address length counter 
  useEffect(() => {
    setDeviceInfo(navigator.userAgent);
    setAddressCount(formData.address.length);
  }, [formData.address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGetLocation = () => {
    setError('');
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        });
        setIsLoading(false);
      },
      (err) => {
        setError('Location access denied. Please allow permission.');
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  };

    // fetch exsting customer details 
    const handlePhoneBlur = async () => {
      if (formData.phone.length === 10) {
        try {
          const response = await axios.get(`${API_URL}/api/customers/phone/${formData.phone}`);
          if (response.data) {
            setFormData({
              ...response.data,
              password: '',
              confirmPassword: '',
              phone: formData.phone // Keep the entered phone number
            });
            setMessage('Customer details auto-filled from previous record.');
          }
        } catch (err) {
          // No action needed if customer not found
        }
      }
    };

    // email validation 
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        // Validation checks
        if (!formData.fullName || !formData.email || !formData.phone || !formData.dob || 
            !formData.address || !formData.password || !formData.confirmPassword) {
          setError('Please fill all required fields.');
          return;
        }

        // phone number validation 
        if (!/^\d{10}$/.test(formData.phone)) {
          setError('Phone number must be 10 digits.');
          return;
        }

        // email validation 
        if (!validateEmail(formData.email)) {
          setError('Please enter a valid email address.');
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters.');
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match.');
          return;
        }

        // getlocation information 
        if (!formData.latitude || !formData.longitude) {
          setError('Please get location coordinates.');
          return;
        }

          // INSERT NEW CUTOMER DETAILS 
        try {
        setIsLoading(true);

        const res = await axios.post(`${API_URL}/api/customers/register`, {
          ...formData,
          deviceInfo,
        });

        // Optional: Log response if needed
        console.log('Server response:', res.data);

        // Show success alert
        alert('✅ Customer registered successfully!');

        // Set confirmation message
        setMessage('Customer registered successfully!');
        setError('');

        // Reset the form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          gender: '',
          dob: '',
          address: '',
          password: '',
          confirmPassword: '',
          latitude: '',
          longitude: '',
        });
      } catch (err) {
        // Catch and display error
        setError(err.response?.data?.message || '❌ Something went wrong. Please try again.');
        setMessage('');
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 form-outer">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-ingo text-dark">
              <h2 className="text-center mb-0 py-2">
                <i className="bi bi-person-plus me-2"></i>
                Customer Registration
              </h2>
            </div>
            
            <div className="card-body ">
              {message && <MessageBox message={message} type="success" />}
              {error && <MessageBox message={error} type="error" />}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <FormInput 
                      label="Full Name*" 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      required 
                      placeholder="Customer Name" 
                      icon="bi bi-person-fill"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <FormInput 
                      label="Email Address*" 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      placeholder="customer@example.com" 
                      icon="bi bi-envelope-fill"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <FormInput 
                      label="Phone Number*" 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      onBlur={handlePhoneBlur}
                      required 
                      placeholder="9876543210" 
                      icon="bi bi-phone-fill"
                      maxLength="10"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-gender-ambiguous me-2"></i>
                        Gender
                      </label>
                      <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        className="form-select"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <FormInput 
                      label="Date of Birth*" 
                      type="date" 
                      name="dob" 
                      value={formData.dob} 
                      onChange={handleChange} 
                      required
                      icon="bi bi-calendar-fill"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="bi bi-house-door-fill me-2"></i>
                        Address* <small className="text-muted">({addressCount}/200)</small>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                        placeholder="Street, City, State"
                        rows={3}
                        maxLength="200"
                      ></textarea>
                      {/* address character counter  */}
                      <div className="form-text text-end">
                        {200 - addressCount} characters remaining
                      </div>
                    </div>
                  </div>

                  {/* password field  */}
                  <div className="col-12 col-md-6">
                    <FormInput 
                      label="Password*" 
                      type="password" 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required
                      icon="bi bi-lock-fill"
                    />

                    {/* password strength meter  */}
                    <PasswordStrengthMeter password={formData.password} />
                  </div>
                  <div className="col-12 col-md-6">
                    <FormInput 
                      label="Confirm Password*" 
                      type="password" 
                      name="confirmPassword" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      required
                      icon="bi bi-lock-fill"
                    />
                  </div>

                  {/* button for fetch gelocation  */}
                    <div className="col-12">
                    <LocationButton 
                      onClick={handleGetLocation} 
                      isLoading={isLoading}
                    />
                  </div>

                  {formData.latitude && formData.longitude && (
                    <>
                      <div className="col-12 col-md-6">
                        <FormInput 
                          label="Latitude" 
                          type="text" 
                          name="latitude" 
                          value={formData.latitude} 
                          readOnly
                          placeholder="Auto-filled" 
                          icon="bi bi-geo-alt-fill"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <FormInput 
                          label="Longitude" 
                          type="text" 
                          name="longitude" 
                          value={formData.longitude} 
                          readOnly
                          placeholder="Auto-filled" 
                          icon="bi bi-geo-alt-fill"
                        />
                      </div>

                      {/* this is show map preview  */}
                      <div className="col-12">
                        <MapPreview 
                          lat={parseFloat(formData.latitude)} 
                          lng={parseFloat(formData.longitude)} 
                        />
                      </div>
                    </>
                  )}
                  <div className="col-12 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100 py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill me-2"></i>
                          Submit Registration
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;