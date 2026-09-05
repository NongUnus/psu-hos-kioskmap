"use client";

import { useState } from "react";

import type { Building, Floor, Kiosk, Service } from "@/types/kiosk";

type KioskListProps = {
  buildings: readonly Building[];
  floors: readonly Floor[];
  kiosks: readonly Kiosk[];
  services: readonly Service[];
};

export function KioskList({
  buildings,
  floors,
  kiosks,
  services,
}: KioskListProps) {
  const [selectedKioskId, setSelectedKioskId] = useState<string | null>(null);

  const selectedKiosk = kiosks.find((kiosk) => kiosk.id === selectedKioskId);

  return (
    <section aria-labelledby="available-kiosks-heading" className="space-y-4">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          className="text-xl font-semibold tracking-tight text-slate-950"
          id="available-kiosks-heading"
        >
          Available sample kiosks
        </h2>
        <p className="text-sm text-slate-600">{kiosks.length} shown</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2" role="list">
        {kiosks.map((kiosk) => {
          const building = buildings.find(
            (candidate) => candidate.id === kiosk.buildingId,
          );
          const floor = floors.find((candidate) => candidate.id === kiosk.floorId);
          const kioskServices = kiosk.serviceIds
            .map((serviceId) =>
              services.find((candidate) => candidate.id === serviceId),
            )
            .filter((service): service is Service => service !== undefined);
          const isSelected = kiosk.id === selectedKioskId;

          return (
            <li key={kiosk.id}>
              <button
                aria-pressed={isSelected}
                className={`min-h-44 w-full rounded-xl border p-5 text-left shadow-sm transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700 ${
                  isSelected
                    ? "border-sky-700 bg-sky-50 ring-1 ring-sky-700"
                    : "border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50"
                }`}
                onClick={() => setSelectedKioskId(kiosk.id)}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {kiosk.name.en}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{kiosk.name.th}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-950">
                    Sample
                  </span>
                </div>

                <dl className="mt-5 space-y-2 text-sm text-slate-700">
                  <div className="flex gap-2">
                    <dt className="font-medium text-slate-950">Building:</dt>
                    <dd>{building?.name.en ?? kiosk.buildingId}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-slate-950">Floor:</dt>
                    <dd>{floor?.name.en ?? kiosk.floorId}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-slate-950">Services:</dt>
                    <dd>{kioskServices.map((service) => service.name.en).join(", ")}</dd>
                  </div>
                </dl>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-live="polite" className="min-h-7 text-sm text-slate-700">
        {selectedKiosk ? (
          <p>
            Selected: <span className="font-medium">{selectedKiosk.name.en}</span>
            {". "}
            {selectedKiosk.locationDescription.en}
          </p>
        ) : (
          <p>Select a sample kiosk to view its sample location description.</p>
        )}
      </div>
    </section>
  );
}
