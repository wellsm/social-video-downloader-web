import { ThemeProvider } from "@/app/contexts/theme";
import { AuthProvider } from "@/app/contexts/auth";
import { Index } from "@/app/pages";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="downloader-ui-theme">
      <AuthProvider>
        <Index/>
        <Toaster/>
      </AuthProvider>
    </ThemeProvider>
  )
}
