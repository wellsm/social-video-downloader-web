import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/auth";

export function LogoutButton() {
  const { signed, onLogout } = useAuth();

  return (
    signed && (
      <div>
        <Button variant="outline" className="h-16" onClick={() => onLogout()}>
          <LogOut className="h-6 w-6 mr-2 rotate-0 scale-100 transition-all" />
          <span className="text-lg">Sair</span>
        </Button>
      </div>
    )
  );
}
