import React from 'react';
import { Calculator } from 'lucide-react';

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="relative">
          <Calculator className="mx-auto text-blue-600 dark:text-blue-400 animate-pulse" size={48} />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full animate-ping"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2">Calculating...</h3>
        <p className="text-gray-600 dark:text-gray-400">Processing your academic results</p>
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};