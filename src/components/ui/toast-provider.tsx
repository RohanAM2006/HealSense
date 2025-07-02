"use client";

import * as React from "react";
import { Toast } from "./toast";

const ToastContext = React.createContext<any>(null);

export const useToastContext = () => React.useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<any[]>([]);

  const showToast = (toast: any) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, toast.duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t, i) => (
          <Toast key={i} {...t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}