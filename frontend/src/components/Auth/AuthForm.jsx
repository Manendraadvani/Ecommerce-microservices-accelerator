// src/components/Auth/AuthForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider"; 
import { toast } from 'react-toastify';

const AuthForm = ({ isLogin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loginUser,    
    registerUser, 
    error: contextError,
    loading,
    setError: setContextError 
  } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [formError, setFormError] = useState(""); 

  useEffect(() => {
    setFormError("");
    if (setContextError) { 
      setContextError(null);
    }
  }, [isLogin, setContextError]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(""); 
    if (setContextError) setContextError(null); 

    const { firstName, lastName, email, phone, password, confirmPassword, role } = formData;

    try {
      if (isLogin) {
        if (!email || !password) {
          setFormError("Email and password are required.");
          return;
        }
        const credentials = { email, password }; 

        if (typeof loginUser !== 'function') {
          console.error("loginUser is not a function. Check AuthProvider context value.", loginUser);
          setFormError("Login service is currently unavailable. Please try again later.");
          return;
        }

        const response = await loginUser(credentials);
        const userProfile = response.user || response;

        const selectedRole = formData.role?.toUpperCase();  
        const actualRole = userProfile?.role?.toUpperCase(); 

        if (!actualRole) {
          setFormError("Could not determine user role. Please contact support.");
          return;
        }

        if (selectedRole !== actualRole) {
          setFormError(`Role mismatch: You tried to login as "${selectedRole}", but you're registered as "${actualRole}".`);
          return;
        }

        localStorage.setItem("bookbazaar_user", JSON.stringify(userProfile));
        toast.success("Login successful!");

        if (actualRole === "ADMIN") {
          navigate("/admin");
        } else {
          navigate(location.state?.from?.pathname || "/");
        }



      } else { 
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
          setFormError("All fields are required for signup.");
          return;
        }
        if (password !== confirmPassword) {
          setFormError("Passwords do not match.");
          return;
        }

        if (!/^\d{10,15}$/.test(phone)) {
          setFormError("Enter a valid phone number (10-15 digits).");
          return;
        }


        const registrationPayload = {
          firstName,
          lastName,
          email,
          phoneNumber: phone, 
          password,
          role 
        };

        if (typeof registerUser !== 'function') {
          console.error("registerUser is not a function. Check AuthProvider context value.", registerUser);
          setFormError("Registration service is currently unavailable. Please try again later.");
          return;
        }

        await registerUser(registrationPayload);
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.error("AuthForm handleSubmit error:", err);
      const message = err.message || (isLogin ? "Login attempt failed." : "Signup attempt failed.") + " Please try again.";
      setFormError(message); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-lg">
      {/* <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
        {isLogin ? "Welcome Back!" : "Create Your Account"}
      </h2> */}

      {(formError || contextError) && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center" role="alert">
          {formError || contextError}
        </div>
      )}

      {!isLogin && (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      <div>
        <label htmlFor="passwordCurrent" className="block text-sm font-semibold text-gray-700 mb-1">
          Password
        </label>
        <input
          id="passwordCurrent"
          name="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        />
      </div>

      {!isLogin && (
        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
      )}

      <div>
        <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1">
          {isLogin ? "Login as" : "Register as"}
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-md transition duration-150 ease-in-out ${loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              </svg>
              Processing...
            </span>
          ) : (isLogin ? "Login" : "Sign Up")}
        </button>
      </div>

      <div className="text-center text-sm">
      </div>

      {isLogin && (
        <div className="text-center mt-4">
        </div>
      )}
    </form>
  );
};

export default AuthForm;