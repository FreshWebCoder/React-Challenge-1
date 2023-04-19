export type RotationType = 'normal' | 'reverse';
export type IntervalIdType = {
  opened: NodeJS.Timer | null;
  idle: NodeJS.Timer | null;
};
export type FeatureStatusType = {
  rotation: boolean;
  size: boolean;
  timer: boolean;
};
