import {
  Grid,
  Skeleton,
  Paper,
  Box,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { DungeonRun } from "../DungeonStatisticsTypes";
import React from "react";

export const CardSkeleton = () => {
  return (
    <Box
      display={"block"}
      p={2}
      width={"100%"}
      component={Skeleton}
      height={350}
      variant="rounded"
    ></Box>
  );
};

export const DungeonCard = React.memo(
  ({ dungeon }: { dungeon: DungeonRun }) => {
    return (
      <Box
        component={Paper}
        p={2}
        width={"100%"}
        height={350}
        position={"relative"}
      >
        <Box
          sx={{
            backgroundImage: `url(https://render.worldofwarcraft.com/eu/zones/${dungeon.name
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll("'", "")}-small.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(43%)",
            position: "absolute",
            inset: 0,
            zIndex: -1,
          }}
        ></Box>
        <Stack
          direction={"row"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          my={2}
        >
          <Typography
            fontSize={{
              xl: "1.05rem",
              lg: "1.02rem",
              md: "1.05rem",
              xs: "1rem",
            }}
          >
            {dungeon.name} {dungeon.keyLevel}
          </Typography>
          <Typography variant="body2" fontSize={"0.80rem"}>
            {formatDistanceToNowStrict(new Date(dungeon.completedAt))} тому
          </Typography>
        </Stack>
        <Divider />
        <Stack direction={"row"} justifyContent={"space-around"}>
          <Stack m={2}>
            {dungeon.members.map((dungeon) => (
              <Box key={dungeon.rio + dungeon.name}>
                <Typography paragraph variant="body2">
                  {dungeon.name} {dungeon.rio}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Stack m={2}>
            <Typography paragraph variant="body2">
              Час: {dungeon.timeSpent?.split(".")[0] ?? ""} /{" "}
              {dungeon.timeGate?.split(".")[0]}
            </Typography>
            <Typography variant="body2" paragraph>
              Рахунок: {dungeon.scroe}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    );
  }
);
