import type { MapDefinition } from "@/types/kiosk";

/** Mock map metadata only. No real or usable PSU Hospital floor plan is included. */
export const maps = [
  {
    id: "mock-building-a-level-1-map",
    buildingId: "mock-building-a",
    floorId: "mock-building-a-level-1",
    assetPath: "/maps/mock-building-a-level-1.svg",
    isMock: true,
  },
] as const satisfies readonly MapDefinition[];
