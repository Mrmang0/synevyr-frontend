import { Box, styled } from "@mui/material";

const StyledContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  overflow: "auto",

  [theme.breakpoints.down("md")]: {
    minHeight: "60vh",
    maxHeight: "none",
  },

  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {},
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "0.4rem",
    backgroundColor: "rgba(0,0,0,.4)",
  },
}));

export default StyledContainer;
