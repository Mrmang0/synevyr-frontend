import { ArrowForward } from "@mui/icons-material";
import { useMediaQuery, Box, Divider, IconButton } from "@mui/material";
import { useState } from "react";

 const SizingContainer = ({
    first,
    second,
  }: {
    first: React.ReactElement;
    second: React.ReactElement;
  }) => {
    const [sizes, setSizes] = useState({
      first: "49.5%",
      second: "49.5%",
    });
  
    const hasHeight = useMediaQuery("(min-height:700px)");
  
    return (
      <Box
        height={"calc(100% - 56px)"}
        flexGrow={0}
        flexShrink={0}
        width={"100%"}
        display={"flex"}
      >
        <Box
          display={{
            xs: "none",
            lg: hasHeight ? "flex" : "none",
          }}
          flexBasis={sizes.first}
          maxWidth={sizes.first}
        >
          {first}
        </Box>
        <Box
          display={{
            xs: "none",
            lg: hasHeight ? "flex" : "none",
          }}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Divider
            variant="fullWidth"
            orientation="vertical"
            flexItem
            sx={{ flexGrow: 1, width: 0, margin: "auto" }}
          />
          <Box display={"flex"}>
            <IconButton
              sx={{
                my: 1,
                transition: "rotate 0.3s ease",
                rotate: `${sizes.first == "100%" ? 180 : 0}deg`,
                display: sizes.first != "0%" ? "flex" : "none",
              }}
              onClick={() => {
                if (sizes.second == "0%")
                  setSizes({
                    first: "49.5%",
                    second: "49.5%",
                  });
                else
                  setSizes({
                    first: "100%",
                    second: "0%",
                  });
              }}
            >
              <ArrowForward />
            </IconButton>
            <IconButton
              sx={{
                my: 1,
                transition: "rotate 0.3s ease",
                rotate: `${sizes.second == "100%" ? 0 : 180}deg`,
                display: sizes.second != "0%" ? "flex" : "none",
              }}
              onClick={() => {
                if (sizes.first == "0%")
                  setSizes({
                    first: "49.5%",
                    second: "49.5%",
                  });
                else
                  setSizes({
                    first: "0%",
                    second: "100%",
                  });
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
  
          <Divider
            variant="fullWidth"
            orientation="vertical"
            flexItem
            sx={{ flexGrow: 1, width: 0, margin: "auto" }}
          />
        </Box>
        <Box
          flexBasis={{
            xs: "100%",
            xl: sizes.second,
          }}
          maxWidth={{
            xs: "100%",
            xl: sizes.second,
          }}
        >
          {second}
        </Box>
      </Box>
    );
  };
  
  export default SizingContainer