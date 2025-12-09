"use client";

import { createContext, useContext, ReactNode } from "react";

interface UserState {
  fullName: string;
}

interface UserContextType {
  user: UserState;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const user: UserState = {
    fullName: "Doniyor",
  };

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
