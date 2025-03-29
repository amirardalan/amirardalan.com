'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      hideToast(id);
    }, 3000);

    return id;
  };

  const hideToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function getToastClass(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-light';
    case 'error':
      return 'bg-red-500 text-light';
    case 'warning':
      return 'bg-amber-500 text-light';
    case 'info':
    default:
      return 'bg-blue-500 text-light';
  }
}

function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-md px-4 py-3 shadow-md transition-all duration-300 ${getToastClass(
            toast.type
          )}`}
        >
          <div className="flex items-center justify-between">
            <p>{toast.message}</p>
            <button
              onClick={() => hideToast(toast.id)}
              className="ml-4 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
