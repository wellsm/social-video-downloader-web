/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/lib/api";
import { ReactNode, createContext, useContext, useState } from "react";
import { useToastStore } from "@/app/stores/toast";

interface AuthContextType {
  signed: boolean;
  onLogin(code: string): Promise<void>;
  onLogout(): Promise<void>;
}

export const USER = "user";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children?: ReactNode | undefined;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { openToast } = useToastStore();
  const token = localStorage.getItem(USER);
  const [signed, setSigned] = useState<boolean>(token !== null);

  const handleLogin = async (code: string) => {
    try {
      const { data } = await http.post("auth", { code });

      localStorage.setItem(USER, JSON.stringify(data));

      setSigned(true);
    } catch (error: any) {
      const { data } = error.response;

      openToast('Login Failed', data.message);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem(USER);
    setSigned(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
