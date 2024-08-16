import { ThemeProvider } from "@/app/contexts/theme";
import { AuthProvider } from "@/app/contexts/auth";
import { Index } from "@/app/pages";
import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router-dom";
import { ThemeToggle } from "./app/components/theme-toggle";
import { Usage } from "./app/components/usage";
import { LogoutButton } from "./app/components/logout-button";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="downloader-ui-theme">
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <div className="grow flex flex-col items-center justify-between">
            <Usage />
            <Routes>
              <Route index element={<Index />} />
            </Routes>
            <div className="flex gap-2">
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
