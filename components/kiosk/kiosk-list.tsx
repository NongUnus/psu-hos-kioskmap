"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { filterKiosks, type KioskFilters } from "@/lib/kiosk-query";
import { createKioskDetailHref } from "@/lib/kiosk-url-state";
import type { Building, Floor, Kiosk, Service } from "@/types/kiosk";

type KioskListProps = {
  buildings: readonly Building[];
  floors: readonly Floor[];
  initialFilters: KioskFilters;
  kiosks: readonly Kiosk[];
  services: readonly Service[];
};

export function KioskList({
  buildings,
  floors,
  initialFilters,
  kiosks,
  services,
}: KioskListProps) {
  const [filters, setFilters] = useState<KioskFilters>(initialFilters);

  const matchingKiosks = useMemo(
    () => filterKiosks({ buildings, floors, kiosks, services }, filters),
    [buildings, filters, floors, kiosks, services],
  );
  const hasActiveFilters = Object.values(filters).some(Boolean);

  function clearFilters() {
    setFilters({ query: "", buildingId: "", floorId: "", serviceId: "" });
  }

  return (
    <section aria-labelledby="available-kiosks-heading" className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2
          className="text-xl font-semibold tracking-tight text-slate-950"
          id="available-kiosks-heading"
        >
          Available sample kiosks
        </h2>
        <p aria-live="polite" className="text-sm text-slate-600">
          {matchingKiosks.length}{" "}
          {matchingKiosks.length === 1 ? "kiosk" : "kiosks"}
          {hasActiveFilters ? " match" : " available"}
        </p>
      </div>

      <form
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        onSubmit={(event) => event.preventDefault()}
        role="search"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-slate-950"
              htmlFor="kiosk-search"
            >
              Search kiosks
            </label>
            <input
              aria-describedby="kiosk-search-help"
              className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-950 shadow-xs outline-none placeholder:text-slate-500 focus:border-sky-700 focus:ring-2 focus:ring-sky-200"
              id="kiosk-search"
              onChange={(event) =>
                setFilters((current) => ({ ...current, query: event.target.value }))
              }
              placeholder="Name, location, building, or service"
              type="search"
              value={filters.query}
            />
            <p className="mt-1 text-sm text-slate-600" id="kiosk-search-help">
              Matches partial names, location descriptions, buildings, floors,
              and services.
            </p>
          </div>

          <FilterSelect
            id="building-filter"
            label="Building"
            onChange={(value) =>
              setFilters((current) => ({ ...current, buildingId: value }))
            }
            options={buildings.map((building) => ({
              label: building.name.en,
              value: building.id,
            }))}
            value={filters.buildingId}
          />
          <FilterSelect
            id="floor-filter"
            label="Floor"
            onChange={(value) =>
              setFilters((current) => ({ ...current, floorId: value }))
            }
            options={floors.map((floor) => ({
              label: floor.name.en,
              value: floor.id,
            }))}
            value={filters.floorId}
          />
          <FilterSelect
            id="service-filter"
            label="Service"
            onChange={(value) =>
              setFilters((current) => ({ ...current, serviceId: value }))
            }
            options={services.map((service) => ({
              label: service.name.en,
              value: service.id,
            }))}
            value={filters.serviceId}
          />
          <div className="flex items-end">
            <button
              className="min-h-11 w-full rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700 disabled:cursor-not-allowed disabled:text-slate-400"
              disabled={!hasActiveFilters}
              onClick={clearFilters}
              type="button"
            >
              Clear search and filters
            </button>
          </div>
        </div>
      </form>

      {matchingKiosks.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {matchingKiosks.map((kiosk) => {
            const building = buildings.find(
              (candidate) => candidate.id === kiosk.buildingId,
            );
            const floor = floors.find(
              (candidate) => candidate.id === kiosk.floorId,
            );
            const kioskServices = kiosk.serviceIds
              .map((serviceId) =>
                services.find((candidate) => candidate.id === serviceId),
              )
              .filter((service): service is Service => service !== undefined);
            return (
              <li key={kiosk.id}>
                <Link
                  className="block min-h-44 w-full rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-400 hover:bg-sky-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                  href={createKioskDetailHref(kiosk.id, filters)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {kiosk.name.en}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {kiosk.name.th}
                      </p>
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
                      <dd>
                        {kioskServices.map((service) => service.name.en).join(", ")}
                      </dd>
                    </div>
                  </dl>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
          <h3 className="text-lg font-semibold text-slate-950">No sample kiosks match</h3>
          <p className="mt-2 text-slate-700">
            Try changing your search or clearing the current filters.
          </p>
          <button
            className="mt-4 min-h-11 rounded-lg bg-sky-800 px-4 text-sm font-medium text-white transition hover:bg-sky-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            onClick={clearFilters}
            type="button"
          >
            Clear search and filters
          </button>
        </div>
      )}

      <p className="text-sm text-slate-700">
        Select a sample kiosk to view its location and service details.
      </p>
    </section>
  );
}

type FilterSelectProps = {
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  value: string;
};

function FilterSelect({
  id,
  label,
  onChange,
  options,
  value,
}: FilterSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-950" htmlFor={id}>
        {label}
      </label>
      <select
        className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-950 shadow-xs outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-200"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">All {label.toLowerCase()}s</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
