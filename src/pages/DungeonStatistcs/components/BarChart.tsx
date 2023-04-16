import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bar } from "@visx/shape";
import { SeriesPoint } from "@visx/shape/lib/types";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import {
  ChartData,
  ChartResponse,
  NumberChartData,
} from "../DungeonStatisticsTypes";
import { getData, getKey } from "./ChartFunctions";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ParentSize } from "@visx/responsive";
import locale from "date-fns/esm/locale/uk";

const verticalMargin = 120;
const leftMargin = 40;

type TooltipData = {
  bar: SeriesPoint<ChartData<number>>;
  key: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};

export type BarStackProps<T> = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data: ChartData<T>[];
  title: string;
  xLabel: string;
  yLabel: string;
};
const anotherWhite = "#6c5efb";
export const white = "#ffffffAA";
export const background = "#eaedff33";
const defaultMargin = { top: 40, right: 0, bottom: -40, left: 0 };
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};

type ResponsiveBarchartProps<T> = {
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data: ChartData<T>[];
  title: string;
  xLabel: string;
  yLabel: string;
};

export default function BarChart<T>({
  width,
  height,
  events = false,
  margin = defaultMargin,
  data,
  title,
  xLabel,
  yLabel,
}: BarStackProps<T>) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  const xMax = width - leftMargin * 2;
  const yMax = height - margin.top - 100;
  const xScale = useMemo(
    () =>
      scaleBand<any>({
        range: [2, xMax],
        round: true,
        domain: [...data.map(getKey<T>)],
        padding: 0.2,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getData))],
      }),
    [yMax, data]
  );

  if (width < 299) return null;
  // bounds

  let tooltipTimeout: number;

  return width < 10 ? null : (
    <Box
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <svg ref={containerRef} width={width} height={height}>
        <Group
          left={leftMargin - 10}
          width={width - leftMargin}
          top={verticalMargin / 2}
        >
          {data.map((d) => {
            const key = getKey<T>(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getData(d)) ?? 0) - 60;
            const barX = xScale(key);
            const barY = yScale(d.count);
            return (
              <Bar
                key={`bar-${key}`}
                x={barX && 10 + barX}
                y={barY}
                ry={10}
                width={barWidth}
                height={barHeight - margin.bottom}
                fill="url(#Gradient1)"
                onClick={() => {
                  if (events)
                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  // TooltipInPortal expects coordinates to be relative to containerRef
                  // localPoint returns coordinates relative to the nearest SVG, which
                  // is what containerRef is set to in this example.
                  const eventSvgCoords = localPoint(event);
                  const left = barX && barX + barWidth / 2;
                  showTooltip({
                    tooltipData: {
                      bar: {
                        "0": 0,
                        "1": 0,
                        data: d,
                      } as any,
                    } as any,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  });
                }}
              />
            );
          })}
        </Group>
        <AxisLeft
          tickFormat={(x) => x.toString()}
          stroke={white}
          tickStroke={white}
          tickLabelProps={{
            fill: white,
            fontSize: 12,
          }}
          left={leftMargin + 2}
          top={margin.top}
          scale={yScale}
        />
        <AxisBottom
          left={leftMargin}
          top={yMax - margin.bottom}
          scale={xScale}
          tickFormat={(x) => String(x)}
          stroke={white}
          tickStroke={white}
          tickLabelProps={{
            fill: white,
            fontSize: 12,
            textAnchor: "middle",
          }}
        />
        <defs>
          <linearGradient id="Gradient1" gradientTransform="rotate(90)">
            <stop stopColor="#cadcdc80" offset="0%" />
            <stop stopColor="#71bac350" offset="35%" />
            <stop stopColor="#71bac350" offset="75%" />
            <stop stopColor="transparent" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div style={{ color: anotherWhite }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>
            {xLabel} : {tooltipData.bar.data.key}
          </div>
          <div>
            <small>
              {yLabel} : {tooltipData.bar.data.count}
            </small>
          </div>
        </TooltipInPortal>
      )}
    </Box>
  );
}

export const ChartContainer = ({ charts }: { charts: ChartResponse }) => {
  const [chartIndex, setChartIndex] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  const chartProps = [
    {
      title: "По рівню ключа",
      xLabel: "Рівень ключа",
      yLabel: "Кількість ключів",
      data: charts.byKey,
    },
    {
      title: "По годинам",
      xLabel: "Година",
      yLabel: "Кількість ключів",
      data: charts.byHours,
    },
    {
      title: "По дням",
      xLabel: "День",
      yLabel: "Кількість ключів",
      data: charts.byDays.map((x) => ({
        key: locale.localize?.day(x.key),
        count: x.count,
      })),
    },
    {
      title: "По місяцям",
      xLabel: "Місяць",
      yLabel: "Кількість ключів",
      data: charts.byMonths.map((x) => ({
        key: locale.localize?.month(x.key - 1),
        count: x.count,
      })),
    },
    {
      title: "По гільдійцям в ключі",
      xLabel: "Гільдійців",
      yLabel: "Кількість ключів",
      data: charts.byMember,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setChartIndex(newValue);
  };

  useEffect(() => {
    if (chartRef.current) {
      const callback = (e: WheelEvent) => {
        const r = chartIndex + e.deltaY / 100;
        if (r > 0) {
          setChartIndex(r % chartProps.length);
        } else {
          const r = chartIndex + e.deltaY / 100;
          setChartIndex(r < 0 ? chartProps.length - 1 : r);
        }
      };
      chartRef.current.addEventListener("wheel", callback);

      return () => chartRef?.current?.removeEventListener("wheel", callback);
    }
  }, [chartRef.current, charts, chartIndex]);

  return (
    <Grid
      container
      height={"100%"}
      direction={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      overflow={"hidden"}
      component={Paper}
    >
      <Grid item container justifyContent={"center"}>
        <Tabs value={chartIndex} onChange={handleChange}>
          {chartProps.map((x) => (
            <Tab key={x.title} sx={{ fontWeight: 600 }} label={x.title} />
          ))}
        </Tabs>
      </Grid>
      <Divider flexItem />
      <Grid
        container
        height={"calc(100% - 100px)"}
        item
        ref={chartRef}
        width={"100%"}
        overflow={"none"}
      >
        <ParentSize>
          {(parent) => {
            return chartProps.map((x, i) => (
              <TabPanel value={chartIndex} key={i} index={i}>
                <BarChart
                  height={parent.height}
                  width={parent.width}
                  {...chartProps[chartIndex]}
                ></BarChart>
              </TabPanel>
            ));
          }}
        </ParentSize>
      </Grid>
    </Grid>
  );
};

function ParentSizedBarChart<T>({
  data,
  title,
  xLabel,
  yLabel,
  margin,
  events,
}: ResponsiveBarchartProps<T>) {
  return (
    <ParentSize>
      {(parent) => (
        <BarChart
          data={data}
          height={parent.height}
          width={parent.width}
          title={title}
          xLabel={xLabel}
          yLabel={yLabel}
        />
      )}
    </ParentSize>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
