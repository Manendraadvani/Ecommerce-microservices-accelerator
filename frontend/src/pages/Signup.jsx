import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import AuthLayout from "../layout/AuthLayout";


const Signup = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join the BookBazaar community and start your journey!"
    >
      <AuthForm isLogin={false} />
    </AuthLayout>
  );
};

export default Signup;
