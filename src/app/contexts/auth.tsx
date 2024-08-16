/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/lib/api";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToastStore } from "@/app/stores/toast";
import { useDownloadStore } from "../stores/download";

type AuthProviderProps = {
  children?: ReactNode | undefined;
};

type Value = {
  value: number;
  formatted: string;
};

type User = {
  name: string;
  exceeded: boolean;
  quota: Value;
  used: Value;
  available: Value;
};

interface AuthContextType {
  signed: boolean;
  user: User|undefined;
  onLogin(code: string): Promise<void>;
  onLogout(): Promise<void>;
}

export const USER = "user";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { openToast } = useToastStore();
  const { downloads } = useDownloadStore();
  const token = localStorage.getItem(USER);
  const [signed, setSigned] = useState<boolean>(token !== null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    signed && http.get("me").then(({ data }) => setUser(data));
  }, [signed, downloads]);

  const handleLogin = async (code: string) => {
    try {
      const { data } = await http.post("auth", { code });

      localStorage.setItem(USER, JSON.stringify(data));

      setSigned(true);
    } catch (error: any) {
      const { data } = error.response;

      openToast("Login Failed", data.message);
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
        user,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
