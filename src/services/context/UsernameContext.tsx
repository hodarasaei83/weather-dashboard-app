import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";


interface UserContextType {
  Username: string;
  setUsername: (Username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [Username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ Username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsername = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsername must be used within a UserProvider");
  }
  return context;
};