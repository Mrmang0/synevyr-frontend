import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { HeroImg } from "../Landing/Landing";
import AppNavigationBar from "../../components/AppBar";
import useFetch from "../../hooks/useFetch";
import {
  ChartResponse,
  DungeonRun,
  DungeonStatisticsState,
  SearchResult,
} from "./DungeonStatisticsTypes";
import { useDefaultReducer } from "../../hooks/useDefaultReducer";
import { useEffect, useMemo, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { ArrowForward, ArrowUpward } from "@mui/icons-material";
import StyledContainer from "../../components/StyledContainer";
import { ChartContainer } from "./components/BarChart";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { CardSkeleton, DungeonCard } from "./components/DungeonCard";
import _ from "lodash";
import SizingContainer from "./components/SizingContainer";

const initialState: DungeonStatisticsState = {
  dungeons: [],
  charts: undefined,
  search: "",
  end: undefined,
  start: undefined,
  descending: true,
  skip: 0,
  take: 12,
  totalCount: 10,
  maxKey: 0,
  minKey: 0,
  names: [],
  dungeonsMeta: [],
  dungeonId: -1,
};

const DungeonStatisticsPage = () => {
  const [state, dispatch] = useDefaultReducer(initialState);
  const [headerHeight, setHeaderHeight] = useState(0);
  const debouncedSearch = useDebounce(state.search, 300);
  const debouncedMaxKey = useDebounce(state.maxKey, 300);
  const debouncedMinKey = useDebounce(state.minKey, 300);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // const onSearchChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   const target = e.target as HTMLInputElement;

  //   if (target.value.length > 2 || target.value.length == 0) {
  //     dispatch({ type: "search", payload: target.value });
  //     dispatch({ type: "skip", payload: 0 });
  //   }
  // };

  const onAutocompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<string> | undefined
  ) => {
    dispatch({ type: "search", payload: value.join(",") });
  };

  const onInputChange =
    (type: keyof DungeonStatisticsState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: type, payload: e.currentTarget.value });
      dispatch({ type: "skip", payload: 0 });
    };

  const onDateTimeChange =
    (type: keyof DungeonStatisticsState) =>
    (value: Dayjs | null, context: unknown) => {
      dispatch({ type: type, payload: value?.hour(0).minute(0) });
      dispatch({ type: "skip", payload: 0 });
    };

  const dungeonsLoadurl = useMemo(() => {
    let result = `https://synevyr.co/api/dungeons?names=${debouncedSearch}&descending=${state.descending}&skip=${state.skip}&take=${state.take}&minKey=${debouncedMinKey}&maxKey=${debouncedMaxKey}&dungeonId=${state.dungeonId}`;

    if (state.start) {
      result += `&start=${state.start.toISOString()}`;
    }
    if (state.end) result += `&end=${state.end.toISOString()}`;
    return result;
  }, [state, debouncedSearch, debouncedMaxKey, debouncedMinKey]);

  const chartsLoadUrl = useMemo(() => {
    let result = `https://synevyr.co/api/dungeons/charts?names=${debouncedSearch}&minKey=${debouncedMinKey}&maxKey=${state.maxKey}&dungeonId=${state.dungeonId}`;

    if (state.start) {
      result += `&start=${state.start.toISOString()}`;
    }
    if (state.end) result += `&end=${state.end.toISOString()}`;
    return result;
  }, [state, debouncedSearch, debouncedMaxKey, debouncedMinKey]);

  const [dungeonsLoading] = useFetch<SearchResult<DungeonRun>>(
    dungeonsLoadurl,
    (response) => {
      if (state.skip === 0)
        dispatch({ type: "dungeons", payload: response.result });
      else
        dispatch({
          type: "dungeons",
          payload: [...state.dungeons, ...response.result],
        });

      dispatch({ type: "totalCount", payload: response.count });
    }
  );

  const [namesLoading] = useFetch<SearchResult<string[]>>(
    `https://synevyr.co/api/members/search?name=`,
    (response) => {
      dispatch({ type: "names", payload: response });
    }
  );
  const [dungeonNamesLoading] = useFetch<SearchResult<string[]>>(
    `https://synevyr.co/api/dungeons/names`,
    (response) => {
      dispatch({ type: "dungeonsMeta", payload: response });
    }
  );

  const [dungeonChartsLoading] = useFetch<ChartResponse>(
    chartsLoadUrl,
    (response) => {
      dispatch({
        type: "charts",
        payload: response,
      });
    }
  );

  useEffect(() => {
    let height = 0;

    containerRef.current?.addEventListener("resize", () => {
      containerRef.current?.childNodes.forEach((x, i) => {
        if (i > 0 && i < 3) height += (x as HTMLDivElement).clientHeight;
      });
      setHeaderHeight(height);
    });

    containerRef.current?.childNodes.forEach((x, i) => {
      if (i > 0 && i < 3) height += (x as HTMLDivElement).clientHeight;
    });

    setHeaderHeight(height);
  }, [containerRef]);

  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;

    const callback = _.throttle((e: Event) => {
      if (
        div.scrollHeight - (div.scrollTop + div.clientHeight) < 600 &&
        state.totalCount > state.dungeons.length
      ) {
        dispatch({ type: "skip", payload: state.dungeons.length });
      }
    }, 200);

    div.addEventListener("scroll", callback);

    return () => {
      div.removeEventListener("scroll", callback);
    };
  }, [state.totalCount, state.dungeons, scrollRef]);

  return (
    <Stack height={"100vh"} ref={containerRef}>
      <HeroImg blur={0.5} brightnes={10} />
      <Grid container justifyContent={"center"} p={2}>
        <Typography
          variant="h1"
          fontSize={{
            md: "4rem",
            xs: "2rem",
          }}
        >
          Статистика по підземеллям
        </Typography>
      </Grid>
      <AppNavigationBar />
      <Grid
        container
        justifyContent={"center"}
        flexGrow={0}
        height={`calc(100vh - ${headerHeight}px - 6rem)`}
      >
        <Grid
          item
          container
          md={10}
          xs={11}
          my={4}
          justifyContent={"center"}
          height={"100%"}
        >
          <Stack gap={4} flexGrow={0} height={"100%"} width={"100%"}>
            <Grid container justifyContent={"center"} gap={1} width={"100%"}>
              <TextField
                onChange={onInputChange("minKey")}
                label="Мін ключ"
              ></TextField>
              <TextField
                onChange={onInputChange("maxKey")}
                label="Макс ключ"
              ></TextField>
              <Autocomplete
                multiple
                options={state.names}
                getOptionLabel={(x) => x}
                onChange={onAutocompleteChange}
                slotProps={{
                  paper: {
                    sx: {
                      backgroundColor: "rgba(54, 73, 92, 0.9)",
                    },
                  },
                }}
                sx={{ flexGrow: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="пошук"
                    placeholder="Woofsou"
                    sx={{ height: 56, flexGrow: 1 }}
                  />
                )}
              ></Autocomplete>

              <DatePicker
                label="З"
                value={state.start}
                onChange={onDateTimeChange("start")}
                slotProps={{
                  desktopPaper: {
                    sx: { backgroundColor: "rgba(54, 73, 92, 0.9)" },
                  },
                  mobilePaper: {
                    sx: { backgroundColor: "rgba(54, 73, 92, 0.9)" },
                  },
                }}
              />
              <DatePicker
                label="По"
                value={state.end}
                onChange={onDateTimeChange("end")}
                slotProps={{
                  desktopPaper: {
                    sx: { backgroundColor: "rgba(54, 73, 92, 0.9)" },
                  },
                  mobilePaper: {
                    sx: { backgroundColor: "rgba(54, 73, 92, 0.9)" },
                  },
                }}
              />
              <FormControl sx={{ minWidth: 100 }}>
                <InputLabel>Підземелля</InputLabel>
                <Select
                  label="Підземелля"
                  value={state.dungeonId}
                  onChange={(e, val) => {
                    dispatch({
                      type: "dungeonId",
                      payload: e.target.value,
                    });
                  }}
                  MenuProps={{
                    disableScrollLock: true,
                    disablePortal: true,
                    PaperProps: {
                      sx: { backgroundColor: "rgba(54, 73, 92, 0.8)" },
                    },
                  }}
                >
                  <MenuItem value={-1}>Всі</MenuItem>
                  {state.dungeonsMeta.map((x) => (
                    <MenuItem key={x.dungeonId} value={x.dungeonId}>
                      {x.shortName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch({ type: "skip", payload: 0 });
                  dispatch({ type: "descending", payload: !state.descending });
                }}
              >
                <ArrowUpward
                  sx={{
                    rotate: state.descending ? "0deg" : "180deg",
                    transition: "rotate 0.3s ease",
                  }}
                />
              </Button>
            </Grid>
            <SizingContainer
              first={
                <Box width={"100%"}>
                  {((!dungeonChartsLoading && state.charts) ||
                    state.charts) && <ChartContainer charts={state.charts} />}
                </Box>
              }
              second={
                <Box
                  component={StyledContainer}
                  height={"100%"}
                  width={"100%"}
                  flexShrink={0}
                  display={"flex"}
                  ref={scrollRef}
                >
                  <Box
                    width={"100%"}
                    flexShrink={0}
                    gap={{ md: 2, xs: 1 }}
                    display={"grid"}
                    alignItems={"center"}
                    gridTemplateColumns={"repeat(auto-fit, minmax(450px, 1fr))"}
                  >
                    {state.dungeons.map((x, i) => (
                      <DungeonCard
                        key={(x.completedAt + x.scroe, i)}
                        dungeon={x}
                      ></DungeonCard>
                    ))}
                    {state.totalCount > state.dungeons.length &&
                      [0, 1, 2, 3].map((x) => (
                        <CardSkeleton key={"chart-" + x} />
                      ))}
                  </Box>
                </Box>
              }
            />
          </Stack>
        </Grid>
      </Grid>
      {/* <FooterBar /> */}
    </Stack>
  );
};

export default DungeonStatisticsPage;
