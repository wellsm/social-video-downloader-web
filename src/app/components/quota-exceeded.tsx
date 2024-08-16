import { Button } from "@/components/ui/button";
import { t } from "i18next";

export function QuotaExceeded() {
  return (
    <div
      id="alert-additional-content-1"
      className="p-4 mb-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900"
      role="alert"
    >
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-xl font-bold">{t('Download quota exceeded')}</h3>
      </div>
      <div className="mt-2 mb-4 text-lg">
        {t('You have exceeded your download quota. To continue downloading, contact support for additional options')}
      </div>
      <div className="hidden">
        <Button className="font-bold text-lg">Buy Quota</Button>
      </div>
    </div>
  );
}
