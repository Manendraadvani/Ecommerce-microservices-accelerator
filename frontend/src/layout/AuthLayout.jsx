// src/layouts/AuthLayout.jsx
import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">{title}</h2>
        <p className="text-md text-center text-gray-500 mb-8">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
