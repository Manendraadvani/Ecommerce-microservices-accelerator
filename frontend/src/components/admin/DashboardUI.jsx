// src/components/admin/DashboardUI.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const SummaryCard = ({ title, value, icon, color, loading }) => {
  const colorClasses = {
    indigo: 'text-indigo-500 bg-indigo-100',
    green: 'text-green-500 bg-green-100',
    yellow: 'text-yellow-500 bg-yellow-100',
    red: 'text-red-500 bg-red-100',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
      <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        {loading ? (
          <div className="h-7 w-24 bg-gray-200 rounded-md animate-pulse mt-1"></div>
        ) : (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );
};

export const AdminButton = ({ to, label }) => (
  <Link
    to={to}
    className="bg-indigo-600 text-white text-center py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition"
  >
    {label}
  </Link>
);

export const PreviewTable = ({ title, headers, data, renderRow, loading, viewAllLink }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {viewAllLink && (
            <Link to={viewAllLink} className="text-sm font-semibold text-indigo-600 hover:underline">
                View All →
            </Link>
        )}
    </div>
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
        <thead>
            <tr className="bg-gray-50">
            {headers.map((header, i) => (
                <th key={i} className="py-2 px-3 text-gray-600 font-medium">{header}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}><td colSpan={headers.length} className="py-3 px-3"><div className="h-4 bg-gray-200 rounded-md animate-pulse"></div></td></tr>
            ))
            ) : data.length === 0 ? (
            <tr><td colSpan={headers.length} className="py-4 text-center text-gray-500">No recent data available.</td></tr>
            ) : (
            data.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition">
                {renderRow(item).map((cell, i) => (
                    <td key={i} className="py-2 px-3 text-gray-700">{cell}</td>
                ))}
                </tr>
            ))
            )}
        </tbody>
        </table>
    </div>
  </div>
);