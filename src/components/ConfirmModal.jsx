import React from 'react'

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, isDestructive }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-white/10 rounded-[2rem] p-8 max-w-md w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] transform transition-all animate-fade-up relative overflow-hidden">

        {/* Glow Effects */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] ${isDestructive ? 'bg-red-600/30' : 'bg-indigo-600/30'}`}></div>

        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-full ${isDestructive ? 'bg-red-500/20 text-red-500' : 'bg-indigo-500/20 text-indigo-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {isDestructive ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white glow-text">{title}</h3>
        </div>

        <p className="text-slate-400 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-slate-300 font-medium hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2.5 rounded-full font-bold shadow-lg transition-all hover:-translate-y-0.5 ${isDestructive
              ? 'bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white hover:shadow-red-900/50'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-900/50'
              }`}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
