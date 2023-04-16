import { ChartData } from "../DungeonStatisticsTypes";

export const getKey = <T>(data: ChartData<T>) => data.key;
export const getData = <T>(data: ChartData<T>) => data.count;
