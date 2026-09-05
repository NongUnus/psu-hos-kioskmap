import type { Building, Floor, Kiosk, Service } from "@/types/kiosk";

export type KioskFilters = {
  query: string;
  buildingId: string;
  floorId: string;
  serviceId: string;
};

type KioskQueryData = {
  buildings: readonly Building[];
  floors: readonly Floor[];
  kiosks: readonly Kiosk[];
  services: readonly Service[];
};

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export function filterKiosks(
  { buildings, floors, kiosks, services }: KioskQueryData,
  filters: KioskFilters,
) {
  const query = normalize(filters.query);

  return kiosks.filter((kiosk) => {
    if (filters.buildingId && kiosk.buildingId !== filters.buildingId) {
      return false;
    }

    if (filters.floorId && kiosk.floorId !== filters.floorId) {
      return false;
    }

    if (filters.serviceId && !kiosk.serviceIds.includes(filters.serviceId)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const building = buildings.find((item) => item.id === kiosk.buildingId);
    const floor = floors.find((item) => item.id === kiosk.floorId);
    const kioskServices = kiosk.serviceIds
      .map((serviceId) => services.find((item) => item.id === serviceId))
      .filter((service): service is Service => service !== undefined);
    const searchableText = [
      kiosk.name.en,
      kiosk.name.th,
      kiosk.locationDescription.en,
      kiosk.locationDescription.th,
      building?.name.en,
      building?.name.th,
      floor?.name.en,
      floor?.name.th,
      ...kioskServices.flatMap((service) => [service.name.en, service.name.th]),
    ]
      .filter((value): value is string => Boolean(value))
      .map(normalize);

    return searchableText.some((value) => value.includes(query));
  });
}
