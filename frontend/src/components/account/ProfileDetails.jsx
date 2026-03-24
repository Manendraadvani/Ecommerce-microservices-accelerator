import React, { useState, useEffect } from 'react';
import { fetchMyDetails } from '../../services/userService'; 
 
const DetailItem = ({ label, value }) => (
  <div>
    <p className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="mt-1 text-md text-gray-900">{value || 'Not provided'}</p>
  </div>
);
 
const ProfileDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMyDetails(); 
        setUserDetails(data);
      } catch (err) {
        console.error("Failed to fetch details:", err);
        setError("Could not load your details. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, []);
 
  if (loading) return <div className="text-center p-10 font-semibold">Loading Your Details...</div>;
  if (error) return <div className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>;
 
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">My Details</h2>
      <section>
        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-6">
          <DetailItem label="First Name" value={userDetails.firstName} />
          <DetailItem label="Last Name" value={userDetails.lastName} />
          <DetailItem label="Phone Number" value={userDetails.phoneNumber} />
          <DetailItem label="User Role" value={userDetails.role} />
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold text-gray-700">Account Information</h3>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <DetailItem label="E-mail Address" value={userDetails.email} />
        </div>
      </section>
    </div>
  );
};
 
export default ProfileDetails;