import React from 'react';

// 재사용 가능한 카드 컨테이너
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subTitle }) => (
  <div className="mb-4">
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
  </div>
);