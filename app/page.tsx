import { buildings } from "@/data/buildings";
import { floors } from "@/data/floors";
import { kiosks } from "@/data/kiosks";
import { mockDataNotice } from "@/data/mock-notice";
import { services } from "@/data/services";
import { KioskList } from "@/components/kiosk/kiosk-list";
import { filtersFromSearchParams } from "@/lib/kiosk-url-state";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const initialFilters = filtersFromSearchParams(await searchParams);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-medium tracking-wide text-slate-600">
            Unofficial community prototype
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Find a kiosk
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Browse the currently available kiosk locations. Select a kiosk to
            review its location and services.
          </p>
          <p
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950"
            role="note"
          >
            {mockDataNotice}
          </p>
        </header>

        <KioskList
          buildings={buildings}
          floors={floors}
          initialFilters={initialFilters}
          kiosks={kiosks}
          services={services}
        />
      </div>
    </main>
  );
}
