import type { KioskFilters } from "@/lib/kiosk-query";

const filterKeys = ["query", "buildingId", "floorId", "serviceId"] as const;

type SearchParams = Record<string, string | string[] | undefined>;

export function filtersFromSearchParams(searchParams: SearchParams): KioskFilters {
  return filterKeys.reduce<KioskFilters>(
    (filters, key) => ({
      ...filters,
      [key]: typeof searchParams[key] === "string" ? searchParams[key] : "",
    }),
    { query: "", buildingId: "", floorId: "", serviceId: "" },
  );
}

export function createKioskDetailHref(kioskId: string, filters: KioskFilters) {
  const queryString = createFilterQueryString(filters);
  const path = `/kiosk/${encodeURIComponent(kioskId)}`;

  return queryString ? `${path}?${queryString}` : path;
}

export function createKioskListHref(filters: KioskFilters) {
  const queryString = createFilterQueryString(filters);

  return queryString ? `/?${queryString}` : "/";
}

function createFilterQueryString(filters: KioskFilters) {
  const params = new URLSearchParams();

  for (const key of filterKeys) {
    if (filters[key]) {
      params.set(key, filters[key]);
    }
  }

  return params.toString();
}
