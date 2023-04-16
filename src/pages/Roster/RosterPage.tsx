import {
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HeroImg } from "../Landing/Landing";
import AppNavigationBar, { FooterBar } from "../../components/AppBar";
import useFetch from "../../hooks/useFetch";
import { Children, useState } from "react";
import { GuildMember, RosterPageState } from "./RoosterPageTypes";
import StyledContainer from "../../components/StyledContainer";
import { useDefaultReducer } from "../../hooks/useDefaultReducer";
import useDebounce from "../../hooks/useDebounce";
import RosterTable from "./components/RoosterTable";

const initialState: RosterPageState = {
  isDescending: true,
  search: "",
  sortField: "Rio",
  roster: [],
};

const Roster = () => {
  const [state, dispatch] = useDefaultReducer(initialState);

  const debouncedSearch = useDebounce(state.search, 300);

  const [rosterLoading] = useFetch<GuildMember[]>(
    `https://synevyr.co/api/roster?descending=${state.isDescending}&search=${debouncedSearch}&sortField=${state.sortField}`,
    (roster) => {
      dispatch({ type: "roster", payload: roster });
    }
  );

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 2 || e.currentTarget.value.length == 0)
      dispatch({ type: "search", payload: e.currentTarget.value });
  };

  const onHeaderCellClick = (name: string) => {
    if (name == state.sortField)
      dispatch({ type: "isDescending", payload: !state.isDescending });
    else dispatch({ type: "sortField", payload: name });
  };

  return (
    <Stack sx={{ height: "100vh", margin: 0 }} alignItems={"center"}>
      <HeroImg blur={0.5} brightnes={12} />
      <Grid container justifyContent={"center"}>
        <Typography my={4} variant="h1" fontSize={{ md: "4rem", xs: "2rem" }}>
          Ростер
        </Typography>
      </Grid>
      <AppNavigationBar />
      <Grid container md={9} xs={12} flexGrow={"1 !important"}>
        <Stack width={"100%"} gap={4} my={4}>
          <TextField
            onChange={onSearchChange}
            label="пошук"
            placeholder="Woofsou"
            fullWidth
          />
          <RosterTable onHeaderCellClick={onHeaderCellClick} state={state} />
        </Stack>
      </Grid>
      <FooterBar />
    </Stack>
  );
};

export default Roster;
