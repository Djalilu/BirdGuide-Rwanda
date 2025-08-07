import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center space-y-3 p-6 bg-slate-200 dark:bg-slate-800 rounded-2xl w-36 h-36
                 hover:bg-emerald-100 dark:hover:bg-emerald-800 focus:bg-emerald-100 dark:focus:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400
                 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="w-16 h-16 text-emerald-500 dark:text-emerald-400">{icon}</div>
      <span className="font-semibold text-lg text-slate-800 dark:text-slate-200">{label}</span>
    </button>
  );
};

export default IconButton;