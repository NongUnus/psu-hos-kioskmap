import type { Floor } from "@/types/kiosk";

/** Mock/sample floors only — not real PSU Hospital locations. */
export const floors = [
  {
    id: "mock-building-a-level-1",
    buildingId: "mock-building-a",
    name: {
      th: "ชั้นตัวอย่าง 1",
      en: "Sample Level 1",
    },
    mapId: "mock-building-a-level-1-map",
    isMock: true,
  },
] as const satisfies readonly Floor[];
