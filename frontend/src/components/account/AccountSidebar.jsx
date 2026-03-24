import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiMapPin, FiShoppingBag, FiMail, FiSettings, FiLock } from 'react-icons/fi';

const AccountSidebar = () => {
  const navItems = [
    { to: '/account/details', icon: <FiUser />, label: 'My details' },
    { to: '/account/orders', icon: <FiShoppingBag />, label: 'My orders' },
    { to: '/account/change-password', icon: <FiLock />, label: 'Change Password' },
    
  ];

  const baseLinkClasses = "flex items-center gap-4 p-3 rounded-lg text-gray-600 font-medium transition-colors";
  const activeLinkClasses = "bg-blue-50 text-blue-600";
  const inactiveLinkClasses = "hover:bg-gray-100";

  return (
    // The container for the sidebar, matching the design
    <nav className="bg-white p-4 rounded-lg shadow-sm">
      <ul className="flex flex-col gap-2">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              end={item.to === '/account'}
              className={({ isActive }) => 
                `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AccountSidebar;