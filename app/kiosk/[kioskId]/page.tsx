import Link from "next/link";
import { notFound } from "next/navigation";

import { buildings } from "@/data/buildings";
import { floors } from "@/data/floors";
import { kiosks } from "@/data/kiosks";
import { mockDataNotice } from "@/data/mock-notice";
import { services } from "@/data/services";
import { getKioskDetail } from "@/lib/kiosk-detail";
import {
  createKioskListHref,
  filtersFromSearchParams,
} from "@/lib/kiosk-url-state";

type KioskDetailPageProps = {
  params: Promise<{ kioskId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function KioskDetailPage({
  params,
  searchParams,
}: KioskDetailPageProps) {
  const { kioskId } = await params;
  const filters = filtersFromSearchParams(await searchParams);
  const detail = getKioskDetail(kioskId, { buildings, floors, kiosks, services });

  if (!detail) {
    notFound();
  }

  const { kiosk, building, floor, services: kioskServices } = detail;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link
          className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          href={createKioskListHref(filters)}
        >
          Back to kiosk list
        </Link>

        <header className="space-y-4">
          <p className="text-sm font-medium tracking-wide text-slate-600">
            Unofficial community prototype
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {kiosk.name.en}
          </h1>
          <p className="text-lg text-slate-700">{kiosk.name.th}</p>
          <p
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950"
            role="note"
          >
            {mockDataNotice}
          </p>
        </header>

        <section
          aria-labelledby="kiosk-details-heading"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2
            className="text-xl font-semibold tracking-tight text-slate-950"
            id="kiosk-details-heading"
          >
            Kiosk details
          </h2>

          <dl className="mt-5 space-y-5 text-slate-700">
            <div>
              <dt className="text-sm font-medium text-slate-950">Building</dt>
              <dd className="mt-1">{building?.name.en ?? kiosk.buildingId}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-950">Floor</dt>
              <dd className="mt-1">{floor?.name.en ?? kiosk.floorId}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-950">Available services</dt>
              <dd className="mt-2">
                <ul className="list-inside list-disc space-y-1">
                  {kioskServices.map((service) => (
                    <li key={service.id}>{service.name.en}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-950">
                Location / landmark
              </dt>
              <dd className="mt-1">{kiosk.locationDescription.en}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
