import type { Kiosk } from "@/types/kiosk";

/**
 * Mock kiosks only. Positions are normalized (0–1) and do not identify a real
 * PSU Hospital kiosk or real-world location.
 */
export const kiosks = [
  {
    id: "mock-kiosk-a-001",
    name: {
      th: "ตู้บริการตัวอย่าง 1",
      en: "Sample Kiosk 1",
    },
    buildingId: "mock-building-a",
    floorId: "mock-building-a-level-1",
    mapId: "mock-building-a-level-1-map",
    position: { x: 0.5, y: 0.5 },
    locationDescription: {
      th: "ตำแหน่งตัวอย่างเท่านั้น ไม่ใช่ตำแหน่งจริงในโรงพยาบาล",
      en: "Sample position only; not a real hospital location.",
    },
    serviceIds: ["mock-general-service"],
    isMock: true,
  },
] as const satisfies readonly Kiosk[];
