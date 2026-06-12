import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ArrowUpDown, Loader2, Search, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ReadOnlyColumn<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

type ReadOnlyRecordsPageProps<T> = {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  totalRecords: number;
  displayedRecords: T[];
  searchQuery: string;
  searchPlaceholder: string;
  onSearchChange: (value: string) => void;
  columns: ReadOnlyColumn<T>[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  emptyTitle: string;
  emptyDescription: string;
  noResultsTitle: string;
  noResultsDescription: string;
  renderRowKey: (row: T) => string | number;
  onExportCSV?: () => void;
};

export default function ReadOnlyRecordsPage<T>({
  badge,
  title,
  description,
  icon: PageIcon,
  totalRecords,
  displayedRecords,
  searchQuery,
  searchPlaceholder,
  onSearchChange,
  columns,
  isLoading,
  error,
  onRetry,
  emptyTitle,
  emptyDescription,
  noResultsTitle,
  noResultsDescription,
  renderRowKey,
  onExportCSV,
}: ReadOnlyRecordsPageProps<T>) {
  const visibleRecords = displayedRecords.length;
  const showSearchEmpty = totalRecords > 0 && visibleRecords === 0;
  const showEmpty = totalRecords === 0;

  return (
    <div className="space-y-8 animate-fade-up">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-800 rounded-l-2xl"></div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="w-fit rounded-full px-4 py-1.5 bg-blue-50 text-blue-800 border-blue-200">
              {badge}
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
              <p className="max-w-2xl text-base leading-7 text-slate-500">{description}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
            <div className="flex items-center gap-2 font-semibold">
              <PageIcon className="h-4 w-4 text-blue-800 dark:text-blue-300" />
              Live banking records
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-blue-800 dark:text-blue-300">
              {totalRecords} total / {visibleRecords} visible
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <Card className="border-slate-200 bg-white shadow-sm dark:bg-slate-900/95">
          <CardContent className="flex items-center gap-3 p-5 text-sm text-slate-600 dark:text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin text-blue-800" />
            Loading records...
          </CardContent>
        </Card>
      ) : null}

      {error ? (
        <Card className="border-rose-200 bg-rose-50/70 shadow-sm dark:border-rose-900 dark:bg-rose-950/60">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-rose-900 dark:text-rose-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Failed to load records</p>
                <p className="text-sm text-rose-800 dark:text-rose-200">{error}</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border-rose-200 dark:border-rose-900 dark:text-rose-100" onClick={onRetry}>
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-slate-200 bg-white shadow-sm dark:bg-slate-900/95">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <PageIcon className="h-5 w-5 text-blue-800" />
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                <ArrowUpDown className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                {totalRecords} {totalRecords === 1 ? "record" : "records"}
              </div>
              <p className="mt-1">Search and browse the current list below.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-300" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-800 focus:bg-white focus:ring-2 focus:ring-blue-800/20"
              />
            </div>
            {onExportCSV && (
              <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 lg:w-fit" onClick={onExportCSV} disabled={totalRecords === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {showSearchEmpty ? (
            <div className="rounded-[1.75rem] border border-dashed border-blue-200 bg-blue-50/70 p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-800 shadow-sm dark:bg-slate-800 dark:text-blue-300">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">{noResultsTitle}</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{noResultsDescription}</p>
            </div>
          ) : null}

          {showEmpty ? (
            <div className="rounded-[1.75rem] border border-dashed border-blue-200 bg-blue-50/70 p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-800 shadow-sm dark:bg-slate-800 dark:text-blue-300">
                <PageIcon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">{emptyTitle}</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">{emptyDescription}</p>
            </div>
          ) : null}

          {!showEmpty && !showSearchEmpty ? (
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    <tr>
                      {columns.map((column) => (
                        <th key={column.key} scope="col" className={cn("px-5 py-4 font-semibold", column.className)}>
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white dark:bg-slate-900">
                    {displayedRecords.map((row) => (
                      <tr key={renderRowKey(row)} className="transition-colors hover:bg-blue-50/60 dark:hover:bg-slate-800">
                        {columns.map((column) => (
                          <td key={`${renderRowKey(row)}-${column.key}`} className={cn("px-5 py-4 text-slate-600 dark:text-slate-300", column.className)}>
                            {column.render(row)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
