/**
 * Domain types for the kiosk locator.
 *
 * The initial data set is intentionally mock-only. These types remain free of
 * presentation concerns so approved source data can replace it later.
 */

export type LocalizedText = {
  th: string;
  en: string;
};

export type NormalizedPosition = {
  /** Horizontal position from 0 (left) to 1 (right). */
  x: number;
  /** Vertical position from 0 (top) to 1 (bottom). */
  y: number;
};

export type Building = {
  id: string;
  name: LocalizedText;
  isMock: true;
};

export type Floor = {
  id: string;
  buildingId: Building["id"];
  name: LocalizedText;
  mapId: MapDefinition["id"];
  isMock: true;
};

export type Service = {
  id: string;
  name: LocalizedText;
  isMock: true;
};

export type MapDefinition = {
  id: string;
  buildingId: Building["id"];
  floorId: Floor["id"];
  /** Placeholder only; no floor-plan asset has been supplied or published. */
  assetPath: string;
  isMock: true;
};

export type Kiosk = {
  id: string;
  name: LocalizedText;
  buildingId: Building["id"];
  floorId: Floor["id"];
  mapId: MapDefinition["id"];
  position: NormalizedPosition;
  locationDescription: LocalizedText;
  serviceIds: Service["id"][];
  isMock: true;
};
