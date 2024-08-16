import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/auth";

export function Usage() {
  const { t } = useTranslation();
  const { signed, user } = useAuth();

  return (
    <div className="max-w-2xl p-4 sm:p-0 sm:mt-4 w-full">
      {!signed && <Card className="w-full p-8 opacity-0"></Card>}
      {signed && !user?.exceeded && (
        <Card className="w-full p-0">
          <CardContent className="space-y-1 p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <span className="text-lg font-bold">{t("Usage")}</span>
              </div>
              <span className="text-muted-foreground">
                {user?.used.formatted} / {user?.quota.formatted}
              </span>
            </div>
            <Progress
              value={
                (Number(user?.used.value.toFixed(0)) * 100) /
                Number(user?.quota.value)
              }
              className="h-2"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
