import Link from "next/link";

import { mockDataNotice } from "@/data/mock-notice";

export default function KioskNotFound() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-sm font-medium tracking-wide text-slate-600">
          Unofficial community prototype
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Sample kiosk not found
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          The kiosk ID in this link does not match a kiosk in the current sample
          data.
        </p>
        <p
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950"
          role="note"
        >
          {mockDataNotice}
        </p>
        <Link
          className="inline-flex min-h-11 items-center rounded-lg bg-sky-800 px-4 text-sm font-medium text-white transition hover:bg-sky-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          href="/"
        >
          Browse sample kiosks
        </Link>
      </div>
    </main>
  );
}
