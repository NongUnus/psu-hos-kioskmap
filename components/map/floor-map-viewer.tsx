"use client";

import { useState } from "react";

import type {
  Building,
  Floor,
  Kiosk,
  MapDefinition,
} from "@/types/kiosk";

type FloorMapViewerProps = {
  building?: Building;
  floor?: Floor;
  kiosk: Kiosk;
  map?: MapDefinition;
};

export function FloorMapViewer({
  building,
  floor,
  kiosk,
  map,
}: FloorMapViewerProps) {
  const [mapAssetUnavailable, setMapAssetUnavailable] = useState(false);
  const buildingName = building?.name.en ?? kiosk.buildingId;
  const floorName = floor?.name.en ?? kiosk.floorId;

  if (!map || mapAssetUnavailable) {
    return (
      <section
        aria-labelledby="floor-map-heading"
        className="rounded-xl border border-dashed border-slate-300 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2
          className="text-xl font-semibold tracking-tight text-slate-950"
          id="floor-map-heading"
        >
          Floor map
        </h2>
        <p className="mt-2 text-slate-700">
          A floor map is not available for {buildingName}, {floorName}. The
          kiosk location description above remains available as text.
        </p>
      </section>
    );
  }

  const textAlternative = `Selected kiosk: ${kiosk.name.en}. Building: ${buildingName}. Floor: ${floorName}. Location: ${kiosk.locationDescription.en}`;

  return (
    <section aria-labelledby="floor-map-heading" className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2
          className="text-xl font-semibold tracking-tight text-slate-950"
          id="floor-map-heading"
        >
          Floor map
        </h2>
        {map.isMock ? (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-950">
            Sample floor map
          </span>
        ) : null}
      </div>

      {map.isMock ? (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          This is a fictional sample floor map. It does not represent the PSU
          Hospital layout.
        </p>
      ) : null}

      <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="relative">
          <img
            alt={`Floor map for ${buildingName}, ${floorName}.`}
            className="block h-auto w-full"
            onError={() => setMapAssetUnavailable(true)}
            src={map.assetPath}
          />
          <div
            aria-hidden="true"
            className="absolute z-10 flex min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-sky-800 px-2 text-center text-xs font-bold text-white shadow-lg"
            style={{ left: `${kiosk.position.x * 100}%`, top: `${kiosk.position.y * 100}%` }}
          >
            Kiosk
          </div>
        </div>
        <figcaption className="space-y-2 border-t border-slate-200 p-4 text-sm leading-6 text-slate-700">
          <p>
            <span className="font-medium text-slate-950">Selected kiosk marker:</span>{" "}
            the labeled “Kiosk” marker identifies {kiosk.name.en}.
          </p>
          <p>{textAlternative}</p>
        </figcaption>
      </figure>
    </section>
  );
}
