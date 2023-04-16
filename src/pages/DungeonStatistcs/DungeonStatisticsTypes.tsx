import { Dayjs } from "dayjs";

export type DungeonRun = {
  name: string;
  members: RunMember[];
  periodStart: string;
  periodEnd: string;
  timeSpent: string;
  timeGate: string;
  inTime: boolean;
  keyLevel: number;
  scroe: number;
  completedAt: string;
};

export type SearchResult<T> = {
  result: T[];
  count: number;
};

export type ChartData<T> = {
  key: T;
  count: number;
};

export type NumberChartData = ChartData<number>;

export type ChartResponse = {
  byKey: ChartData<number>[];
  byMember: ChartData<number>[];
  byHours: ChartData<number>[];
  byDays: ChartData<number>[];
  byMonths: ChartData<number>[];
  timeline: ChartData<Date>[];
  ratio: ChartData<boolean>[];
};

export type RunMember = {
  name: string;
  rio: number;
};

export type DungeonStatisticsState = {
  dungeons: DungeonRun[];
  charts?: ChartResponse;
  totalCount: number;
  search: string;
  start?: Dayjs;
  end?: Dayjs;
  descending: boolean;
  skip: number;
  take: number;
  minKey: number;
  maxKey: number;
  names: string[];
  dungeonsMeta: {
    name: string;
    shortName: string;
    dungeonId: number;
  }[];
  dungeonId: number
};
