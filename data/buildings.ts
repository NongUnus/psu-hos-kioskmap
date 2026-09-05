import type { Building } from "@/types/kiosk";

/** Mock/sample buildings only — not real PSU Hospital locations. */
export const buildings = [
  {
    id: "mock-building-a",
    name: {
      th: "อาคารตัวอย่าง เอ",
      en: "Sample Building A",
    },
    isMock: true,
  },
] as const satisfies readonly Building[];
