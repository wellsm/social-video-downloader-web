import { ThemeProvider } from "@/app/contexts/theme";
import { AuthProvider } from "@/app/contexts/auth";
import { Index } from "@/app/pages";
import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router-dom";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="downloader-ui-theme">
      <AuthProvider>
        <Routes>
          <Route index element={<Index />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
