import { useAuth } from "@/app/contexts/auth";
import { LoginForm } from "@/app/components/login-form";
import { DownloadForm } from "@/app/components/download-form";

export function Index() {
  const { signed } = useAuth();

  return (
    <div className="flex max-h-screen flex-col items-center justify-center p-6 w-full">
      <div className="flex items-center justify-center w-full h-full">
        {signed ? (
          <div className="max-w-2xl w-full space-y-4">
            <DownloadForm />
          </div>
        ) : (
          <div className="max-w-2xl w-full space-y-4">
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}
