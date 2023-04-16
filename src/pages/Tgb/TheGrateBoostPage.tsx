import { useEffect } from "react";
import { useDefaultReducer } from "../../hooks/useDefaultReducer";
import {
  TheGrateBoostPeriod,
  TheGrateBoostRun,
  TheGrateBoostState,
} from "./TheGrateBoostTypes";
import useFetch from "../../hooks/useFetch";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { HeroImg } from "../Landing/Landing";
import AppNavigationBar, { FooterBar } from "../../components/AppBar";
import { formatDistanceToNowStrict } from "date-fns";
import TheGrateBoostTable from "./components/TheGreatBoostTable";
import PeriodSelector from "./components/PeriodsSelector";

const initialState: TheGrateBoostState = {
  periods: [],
  currentPeriod: undefined,
  lastUpdate: new Date(0),
  runs: [],
};

const TheGrateBoostPage = () => {
  const [state, dispatch] = useDefaultReducer(initialState);
  const [lastUpdateLoading] = useFetch<{ lastUpdate: string }>(
    "https://synevyr.co/api/tgb/lastUpdate",
    (response) =>
      dispatch({ type: "lastUpdate", payload: new Date(response.lastUpdate) })
  );
  const [periodsLoading] = useFetch<TheGrateBoostPeriod[]>(
    `https://synevyr.co/api/tgb/periods`,
    (response) => {
      dispatch({ type: "periods", payload: response.reverse() });
    }
  );

  useEffect(() => {
    dispatch({ type: "currentPeriod", payload: state.periods[0] });
  }, [state.periods]);

  const [runsLoading] = useFetch<TheGrateBoostRun[]>(
    `https://synevyr.co/api/tgb?start=${state.currentPeriod?.start}`,
    (response) => {
      dispatch({ type: "runs", payload: response });
    },
    {
      ready: !!state.currentPeriod?.start,
    }
  );

  return (
    <>
      <HeroImg blur={0.5} brightnes={12} />
      <Grid container justifyContent={"center"} alignItems={"center"} gap={1}>
        <Grid
          container
          item
          md={9}
          xs={11}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={4}
        >
          <Grid item md={2.5} xs={12}>
            <PeriodSelector
              onChange={(x) => {
                const item = state.periods.find(
                  (y) => y.start == x.target.value
                );
                dispatch({ type: "currentPeriod", payload: item });
              }}
              loading={periodsLoading}
              state={state}
            />
          </Grid>

          <Typography
            fontSize={{
              md: "4rem",
              xs: "2rem",
            }}
            variant="h1"
          >
            The Great Boost
          </Typography>
          <Grid
            item
            lg={2.5}
            md={3}
            xs={12}
            container
            justifyContent={{ md: "flex-end", sm: "center", xs: "flex-start" }}
          >
            <Typography>
              Останнє оновлення{" "}
              {lastUpdateLoading ? (
                <CircularProgress />
              ) : (
                formatDistanceToNowStrict(state.lastUpdate)
              )}{" "}
              назад
            </Typography>
          </Grid>
        </Grid>
        <AppNavigationBar />
        <Grid container item md={9} xs={12} my={4} component={Paper}>
          <TheGrateBoostTable runs={state.runs} loading={runsLoading} />
        </Grid>

        <Grid
          md={9}
          container
          item
          mb={4}
          justifyContent={"space-between"}
          direction={{
            md: "row",
            xs: "column",
          }}
        >
          <Grid item xs={4}>
            <Typography my={2} variant="h3" textAlign={"center"} paragraph>
              Про івент
            </Typography>
            <Divider />
            <Typography p={4} textAlign={"justify"} lineHeight={1.75}>
              Кожен тиждень в нашій гільдії проходить подія, в якій більш
              досвідчені гравці допомагають новеньким одягатися та освоюватися в
              Mythic+ контенті. Оскільки ми розуміємо, що будь-чий час цінний та
              всі дії мають приносити користь (більш практичними словами,
              будь-яка робота має бути оплаченою), були створені приємні умови
              як для тих, кому допомагають, так і для тих хто допомагає.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h3" my={2} textAlign={"center"} paragraph>
              Призи
            </Typography>
            <Divider sx={{ width: "100%" }} />
            <Box p={4}>
              <Typography paragraph textAlign={"center"}>
                1 Місце -{" "}
                {Math.round(
                  clamp(
                    (state.runs[0]?.score ?? 1) *
                      Math.log(state.runs[0]?.score ?? 1) *
                      3.2891,
                    5000,
                    50000
                  )
                ).toString()}{" "}
                золота ({state.runs[0]?.name})
              </Typography>
              <Typography paragraph textAlign={"center"}>
                2 Місце -{" "}
                {Math.round(
                  clamp(
                    (state.runs[1]?.score ?? 1) *
                      Math.log(state.runs[1]?.score ?? 1) *
                      2.6185,
                    2500,
                    25000
                  )
                ).toString()}{" "}
                золота ({state.runs[1]?.name})
              </Typography>
              <Typography paragraph textAlign={"center"}>
                3 Місце -{" "}
                {Math.round(
                  clamp(
                    (state.runs[2]?.score ?? 1) *
                      Math.log(state.runs[1]?.score ?? 1) *
                      2.093,
                    1000,
                    10000
                  )
                ).toString()}{" "}
                золота ({state.runs[2]?.name})
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography my={2} variant="h3" textAlign={"center"} paragraph>
              Правила
            </Typography>
            <Divider sx={{ width: "100%" }} />
            <List sx={{ px: 2 }}>
              <ListItem sx={{ textAlign: "justify", lineHeight: 1.75 }}>
                1. «Новачками» вважаються саме мейн-персонажі в нашій гільдії,
                альти не можуть брати участі саме в цьому конкурсі.*
              </ListItem>
              <ListItem sx={{ textAlign: "justify", lineHeight: 1.75 }}>
                2. Забіг не йде у рахунок досвідченому гравцю, якщо це сприяло
                підвищенню його рейтингу на raider.io
              </ListItem>
              <ListItem sx={{ textAlign: "justify", lineHeight: 1.75 }}>
                3. Якщо після отримання бажаної допомоги персонаж, який її
                отримав, перестає брати участь у житті гільдії, йому
                забороняється надалі приймати участь в цій події в будь-якій
                ролі.
              </ListItem>
              <ListItem sx={{ textAlign: "justify", lineHeight: 1.75 }}>
                4. Для того, щоб створити групу з допомагаючих та приймаючих
                допомогу, між першими та другими має бути різниця не менш, ніж в
                250 балів рейтингу на raider.io
              </ListItem>
              <ListItem sx={{ textAlign: "justify", lineHeight: 1.75 }}>
                5. Призовий фонд розділять три гравця, які за тиждень набрали
                більше всіх балів (надали найбільше допомоги новачкам) <br />
                * Альти не можуть приймати участь саме в цьому конкурсі, але
                мають право на допомогу від гільдійців та всіх бажаючих поза ним
                у вільний час.
                <br /> ** Життя гільдії - це походи в актуальний рейд та Mythic+
                контент в складі гільдійських груп
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
      <FooterBar />
    </>
  );
};

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export default TheGrateBoostPage;
