import { useAuth } from "@/app/contexts/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, Lock } from "lucide-react";

import { LoginForm } from "@/app/components/login-form";
import { DownloadForm } from "@/app/components/download-form";

export function Index() {
  const { signed } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center px-4 w-full h-screen">
      <div className="flex items-center justify-center w-full h-full">
        {signed ? (
          <div className="space-y-2 max-w-md w-full">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertTitle>Download Social Video</AlertTitle>
              <AlertDescription>
                Enter the Video URL to Try Download
              </AlertDescription>
            </Alert>
            <DownloadForm/>
          </div>
        ) : (
          <div className="max-w-md w-full space-y-2">
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertTitle>You are not LoggedIn</AlertTitle>
              <AlertDescription>
                Enter the authorization code that the admin gave you
              </AlertDescription>
            </Alert>
            <LoginForm/>
          </div>
        )}
      </div>
    </div>
  );
}
