import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AccountSidebar from '../../components/account/AccountSidebar'; 

const AccountPage = () => {
  return (
    <div className="bg-gray-50/50">
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:underline">Homepage</Link>
          <span className="mx-2">/</span>
          <span>My Account</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <AccountSidebar />
          </aside>

          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <Outlet />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default AccountPage;