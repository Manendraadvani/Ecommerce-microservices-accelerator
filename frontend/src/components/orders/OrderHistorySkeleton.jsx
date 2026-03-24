import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="h-5 w-32 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
      </div>
      <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
    </div>
    <div className="space-y-4 border-t pt-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-20 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-20 bg-gray-200 rounded-md"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-4/5 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  </div>
);

export const OrderHistorySkeleton = () => (
  <div className="space-y-6">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
);