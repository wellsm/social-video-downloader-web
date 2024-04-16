/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader } from "lucide-react";
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
import { useToastStore } from "../stores/toast";

const downloadSchema = z.object({
  url: z.string().url(),
});

export function DownloadForm() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { openToast } = useToastStore();

  const form = useForm<z.infer<typeof downloadSchema>>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof downloadSchema>) => {
    setIsDownloading(true);

    try {
      const { url, id } = await prepare(values.url);
      
      download(url, id);
    } catch ({ response }: any) {
      openToast(response.data.code ?? 0, response.data.message ?? 'Error on Prepare Download');
    }

    setIsDownloading(false);
  };

  const download = async (value: string, id: string) => {
    const endpoint = http.url(`download?value=${value}&filename=${id}`)
    const response = await fetch(endpoint);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");

    link.href = url;
    link.download = `${id}.mp4`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    form.reset()
  };

  const prepare = async (url: string) => {
    const { data: response } = await http.post("download", { url });

    return response;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="code"
                    placeholder="Video URL"
                    type="url"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    disabled={isDownloading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button disabled={isDownloading || !form.formState.isValid}>
            {isDownloading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isDownloading ? 'Downloading' : 'Start Download'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
