/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { http } from "@/lib/api";
import { useToastStore } from "@/app/stores/toast";
import { useTranslation } from "react-i18next";
import { useDownloadStore } from "../stores/download";
import { useAuth } from "../contexts/auth";
import { QuotaExceeded } from "./quota-exceeded";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DownloadForm() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { openToast } = useToastStore();
  const { downloaded } = useDownloadStore();
  const { t } = useTranslation();
  const { user } = useAuth();

  const downloadSchema = z.object({
    url: z
      .string()
      .refine(
        (value) =>
          /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
        {
          message: t('Please, insert a valid URL'),
        }
      ),
  });

  const form = useForm<z.infer<typeof downloadSchema>>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      url: "",
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof downloadSchema>) => {
    setIsDownloading(true);

    try {
      const { filename, id } = await prepare(values.url);

      download(filename, id);
    } catch ({ response }: any) {
      openToast(
        response.data.code ?? 0,
        t(response.data.message) ?? t("Error on Prepare Download")
      );
    }

    setIsDownloading(false);
  };

  const download = async (filename: string, id: string) => {
    const endpoint = http.url(`download/${id}`);
    const response = await fetch(endpoint);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    form.reset();

    downloaded();
  };

  const prepare = async (url: string) => {
    const { data } = await http.post("download", { url });

    return data;
  };

  return user?.exceeded ? (
    <QuotaExceeded />
  ) : (
    <Form {...form}>
      <Alert className="flex items-center space-x-3 bg-zinc-50 dark:bg-zinc-900">
        <div className="mr-2">
          <Download className="h-6 w-6" />
        </div>
        <div>
          <AlertTitle className="font-bold text-xl">
            {t("Download Social Video")}
          </AlertTitle>
          <AlertDescription className="text-lg">
            {t("Enter the Video URL to Try Download")}
          </AlertDescription>
        </div>
      </Alert>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="code"
                    placeholder={t("Video URL")}
                    type="url"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="h-12 ring-1 ring-white text-lg"
                    disabled={isDownloading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            disabled={isDownloading || !form.formState.isValid}
            className="w-full h-12 font-bold text-lg"
          >
            {isDownloading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isDownloading ? t("Downloading") : t("Start Download")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
