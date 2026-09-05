import type {
  Building,
  Floor,
  Kiosk,
  MapDefinition,
  Service,
} from "@/types/kiosk";

type KioskDetailData = {
  buildings: readonly Building[];
  floors: readonly Floor[];
  kiosks: readonly Kiosk[];
  maps: readonly MapDefinition[];
  services: readonly Service[];
};

export function getKioskDetail(
  kioskId: string,
  { buildings, floors, kiosks, maps, services }: KioskDetailData,
) {
  const kiosk = kiosks.find((item) => item.id === kioskId);

  if (!kiosk) {
    return undefined;
  }

  return {
    kiosk,
    building: buildings.find((item) => item.id === kiosk.buildingId),
    floor: floors.find((item) => item.id === kiosk.floorId),
    map: maps.find((item) => item.id === kiosk.mapId),
    services: kiosk.serviceIds
      .map((serviceId) => services.find((item) => item.id === serviceId))
      .filter((service): service is Service => service !== undefined),
  };
}
