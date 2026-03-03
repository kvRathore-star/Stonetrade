'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => { } });

const TOAST_ICONS: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
};

const TOAST_COLORS: Record<ToastType, string> = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
    warning: 'bg-amber-600',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = `toast-${Date.now()}`;
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-sm" aria-live="polite">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${TOAST_COLORS[toast.type]} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in-right pointer-events-auto text-sm font-medium`}
                        role="alert"
                    >
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black flex-shrink-0">
                            {TOAST_ICONS[toast.type]}
                        </span>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
