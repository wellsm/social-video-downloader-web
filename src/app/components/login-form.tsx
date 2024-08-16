import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/app/contexts/auth";
import { Loader, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const signInSchema = z.object({
  code: z.string().length(20, "The code must have 20 characters."),
});

export function LoginForm() {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const { onLogin } = useAuth();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsSignIn(true);

    await onLogin(values.code);

    setIsSignIn(false);
  }

  return (
    <Form {...form}>
      <Alert className="flex items-center space-x-3 bg-zinc-50 dark:bg-zinc-900">
        <div className="mr-2">
          <Lock className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-bold text-xl">
            {t("You are not LoggedIn")}
          </AlertTitle>
          <AlertDescription className="text-lg">
            {t("Enter the authorization code that the admin gave you")}
          </AlertDescription>
        </div>
      </Alert>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="code"
                    placeholder={t("Authorization Code")}
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    maxLength={20}
                    className="h-12 ring-1 ring-white text-lg"
                    disabled={isSignIn}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            disabled={isSignIn || !form.formState.isValid}
            className="w-full h-12 font-bold text-lg"
          >
            {isSignIn && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {t("Continue")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
