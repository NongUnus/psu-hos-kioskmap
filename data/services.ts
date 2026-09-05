import type { Service } from "@/types/kiosk";

/** Mock/sample services only — not real PSU Hospital kiosk functions. */
export const services = [
  {
    id: "mock-general-service",
    name: {
      th: "บริการตัวอย่างทั่วไป",
      en: "Sample general service",
    },
    isMock: true,
  },
] as const satisfies readonly Service[];
