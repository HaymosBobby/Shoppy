import { createContext, useContext, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

interface NotificationContextType {
  notify: (message: string, options?: { type?: "success" | "error" }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notify = (
    message: string,
    options?: { type?: "success" | "error" }
  ) => {
    if (options?.type === "error") {
      toast.error(message, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      toast.success(message, {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Toaster />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
