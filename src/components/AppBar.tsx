import { AppBar, IconButton, Link, MenuItem, Toolbar } from "@mui/material";
import { FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WarcraftLogs from "../imgs/warcraftlogs.png";

const AppNavigationBar = () => {
  const navigate = useNavigate();

  const setRoute = (route: string) => () => {
    navigate(route);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AppBar position="relative" sx={{ flexGrow: 0 }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <MenuItem onClick={setRoute("/")}>Новини</MenuItem>
        <MenuItem onClick={setRoute("/roster")}>Ростер</MenuItem>
        {/* <MenuItem onClick={setRoute("/")}>Contacts</MenuItem> */}
        <MenuItem onClick={setRoute("/dstats")}>Прогерс</MenuItem>
        <MenuItem onClick={setRoute("/tgb")}>TGB</MenuItem>
      </Toolbar>
    </AppBar>
  );
};

export const FooterBar = () => {
  return (
    <AppBar position="relative" sx={{ flexGrow: 0, width: "100%" }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton href="https://discord.gg/brwY46YDZ8" target="_blank">
          <FaDiscord />
        </IconButton>
        <IconButton
          href="https://www.warcraftlogs.com/guild/eu/silvermoon/synevyr"
          target="_blank"
        >
          <img height={24} width={24} src={WarcraftLogs} alt="" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigationBar;
