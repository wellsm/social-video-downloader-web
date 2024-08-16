import * as React from "react";
import { Computer, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/app/contexts/theme";
import { useTranslation } from "react-i18next";

type Props = React.ComponentPropsWithoutRef<React.ElementType>;

export function ThemeToggle({ ...props }: Props) {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="mb-4 w-full flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="py-7">
          <Button variant="outline" className="h-16">
            <Sun className="h-6 w-6 rotate-0 flex transition-all dark:-rotate-90 dark:hidden" />
            <Moon className="h-6 w-6 rotate-90 hidden transition-all dark:rotate-0 dark:flex" />
            <span className="text-lg ml-2">Tema</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent {...props}>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="w-6 h-6 mr-2" />
            {t("Light")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="w-6 h-6 mr-2" />
            {t("Dark")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Computer className="w-6 h-6 mr-2" />
            {t("System")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
