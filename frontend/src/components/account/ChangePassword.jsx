import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-toastify';

const FormInput = ({ label, id, type = "password", value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      required
    />
  </div>
);

const ChangePassword = () => {
  const { auth } = useAuth(); 
  
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
        toast.error("You are not logged in or your session has expired.");
        return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        '/api/v1/auth/change-password', 
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            'Authorization': auth.token,
          },
        }
      );

      toast.success("Password changed successfully!");
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }); 

    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
      
      <div className="space-y-6 max-w-sm">
        <FormInput
          label="Current Password"
          id="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
        />
        <FormInput
          label="New Password"
          id="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm New Password"
          id="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="mt-8">
        <button 
          type="submit" 
          className="px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;