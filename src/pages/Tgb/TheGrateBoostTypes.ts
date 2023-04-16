export type TheGrateBoostPeriod = {
  start: string;
  end: string;
};

export type Carriage = {
  id: string;
  characterId: number;
  rio: number;
  name: string;
};

export type TheGrateBoostRun = {
  name: string;
  timeInKeys: string;
  score: number;
  pictureUrl: string;
  keysClosed: number;
  carriages: Carriage[];
};

export type TheGrateBoostState = {
  currentPeriod?: TheGrateBoostPeriod;
  periods: TheGrateBoostPeriod[];
  lastUpdate: Date;
  runs: TheGrateBoostRun[];
};
