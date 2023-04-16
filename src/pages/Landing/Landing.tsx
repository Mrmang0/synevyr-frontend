import { Box, Grid, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Hero from "../../imgs/hero.jpg";
import WarcraftLogs from "../../imgs/warcraftlogs.png";
import { FaDiscord } from "react-icons/fa";
import StoryCard from "./components/StoryCard";
import AppNavigationBar, { FooterBar } from "../../components/AppBar";
import NewsSection from "./components/NewsSection";

export const HeroImg = styled("div")<{ blur: number; brightnes?: number }>(
  ({ theme, blur, brightnes }) => ({
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100vh",
    position: "fixed",
    filter: `blur(${blur}px) brightness(${
      60 - (brightnes ? brightnes : blur) * 2
    }%)`,
    backgroundImage: `linear-gradient(to right top, #3a3a4299, #575e6b99, #72859699, #8db0c099, #a9dce7AA), url(${Hero})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionY: blur,
    zIndex: -10,
  })
);

const RootContainer = styled(Grid)(({ theme }) => ({
  height: "calc(100vh - 64px)",
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh - 56px)",
  },
}));

const LensFlare = styled(Box)(() => ({
  "@keyframes pulsate": {
    "0%": {
      transform: "scale(1)",
      backgroundColor: "#fff",
    },
    "50%": {
      transform: "scale(1.2)",
      backgroundColor: "#fafafa11",
    },
    "100%": {
      transform: "scale(1)",
      backgroundColor: "#fff",
    },
  },

  width: 150,
  height: 150,
  left: "13%",
  top: "50%",
  zIndex: -5,
  position: "absolute",
  filter: "blur(123px)",
  backgroundColor: "#0ee7dd",
  animation: "pulsate 10s infinite ease",
}));

const LandingPage = () => {
  const containerRef = useRef(null);
  const [scrollDown, setScrollDown] = useState(0);

  useEffect(() => {
    const callback = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled = winScroll / height;
      setScrollDown(scrolled);
    };

    const eventListener = document.addEventListener("scroll", callback);
    return () => document.removeEventListener("scroll", callback);
  }, []);

  return (
    <Box ref={containerRef} justifyContent={"center"}>
      <HeroImg blur={scrollDown * 8} />
      <RootContainer
        container
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item position={"sticky"} mx={2} top={10}>
          <Typography variant="h1">Synevyr</Typography>
          <Typography variant="h3">
            Українська World of Warcraft гільдія
          </Typography>
        </Grid>
      </RootContainer>
      <AppNavigationBar />
      <Grid container xs={12} xl={8} lg={9} my={6} mx={"auto"}>
        <NewsSection />
      </Grid>
      <FooterBar />
    </Box>
  );
};

export default LandingPage;
