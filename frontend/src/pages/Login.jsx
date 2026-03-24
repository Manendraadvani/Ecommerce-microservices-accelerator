// src/pages/Login.jsx
import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Login to access your BookBazaar account."
    >
      <AuthForm isLogin={true} />
    </AuthLayout>
  );
};

export default Login;
