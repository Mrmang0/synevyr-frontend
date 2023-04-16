import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing/Landing";
import TheGrateBoostPage from "./pages/Tgb/TheGrateBoostPage";
import { setDefaultOptions } from "date-fns";
import { uk } from "date-fns/locale";
import { useEffect } from "react";
import RosterPage from "./pages/Roster/RosterPage";
import DungeonStatisticsPage from "./pages/DungeonStatistcs/DungeonStatisticsPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fafafa",
    },
    secondary: {
      main: "rgba(24, 53, 62, 0.33)",
    },
  },
  typography: {
    fontFamily: "'Jura', sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(54, 73, 92, 0.23)",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff55",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            sx: { backgroundColor: "rgba(54, 73, 92, 0.9)" },
          },
        },
      },
    },
    
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  { path: "/tgb", element: <TheGrateBoostPage /> },
  { path: "/roster", element: <RosterPage /> },
  { path: "/dstats", element: <DungeonStatisticsPage /> },
]);

function App() {
  const isXs = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    theme.typography.htmlFontSize = isXs ? 14 : 16;
  }, [isXs]);

  useEffect(() => {
    setDefaultOptions({ locale: uk });
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
