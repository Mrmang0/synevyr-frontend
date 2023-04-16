import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Link,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const imageUrl = "https://i.ytimg.com/vi/hVKWLcI8dgY/maxresdefault.jpg";

const CardStyled = styled(Card)(({ theme }) => ({
  transition: "max-height 0.3s ease",
  boxShadow: theme.shadows[10],
  position: "relative",
  "& hr": {
    transition: "width 0.6s cubic-bezier(0.87, 0, 0.13, 1)",
    width: "60%",
    margin: "16px auto",
  },
  ["&:hover"]: {
    "& hr": {
      width: "90%",
    },
    "& img": {},
  },

  "& a": {
    color: theme.palette.primary.main,
  },

  "& p:has(img)": {
    textAlign: "center",
  },

  "& img": {
    maxWidth: "100%",
    boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
    borderRadius: ".3rem"
  },

  "& iframe": {
    display: "none",
  },
}));

const ShadowBox = styled(Box)(({ theme }) => ({
  boxShadow: "inset 10px 5px 50px rgba(0,0,0,.4)",
  "&:hover": {
    boxShadow: "inset 5px 5px 10px rgba(0,0,0,.3)",
  },
}));

const StoryCard = ({
  title,
  description,
  image,
  link,
  category,
  pubDate,
}: {
  title: string;
  pubDate: string;
  description: string;
  image: string;
  link: string;
  category: string;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const checkSize = (e: HTMLDivElement) => {
    setHeight(e?.clientHeight ?? 0);
    cardRef.current = e;
  };

  const [open, setOpen] = useState(false);

  if (!image) {
    const div = document.createElement("div");
    div.innerHTML = description;
    image = div.querySelector("img")?.src ?? "";
  }
  return (
    <CardStyled ref={checkSize} sx={{ maxHeight: open ? "auto" : "1000px" }}>
      <CardHeader
        titleTypographyProps={{ textAlign: "center" }}
        title={title}
        subheaderTypographyProps={{ textAlign: "right" }}
        subheader={
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography target="_blank" component={Link} href={link}>
              Відкрити оригінал
            </Typography>
            <Typography>
              {category} {format(new Date(pubDate), "dd MMMM yy, hh:mm")}
            </Typography>
          </Box>
        }
      />
      <Divider sx={{ my: 1 }} variant="middle" />
      <Grid container>
        <Grid item md={12} sm={12} px={{ xs: 1, lg: 4 }}>
          <CardContent>
            {category != "IcyVeins" && (
              <Box display={"flex"} justifyContent={"center"}>
                <img src={image}></img>
              </Box>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: description.replaceAll(
                  "parent=www.icy-veins.com",
                  "parent=" + window.location.host
                ),
              }}
            ></div>
          </CardContent>
        </Grid>
      </Grid>
      {(height === 1000 || open) && (
        <Box
          width={"100%"}
          position={open ? "relative" : "absolute"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"flex-end"}
          bottom={0}
          left={0}
          height={200}
          sx={{
            background:
              "linear-gradient(transparent,#2f373f99, #2f373fCC, #2f373f)",
          }}
        >
          <Button
            sx={{ mb: 4 }}
            variant="outlined"
            onClick={() => {
              setOpen(!open);
              if (open) cardRef.current?.scrollIntoView();
            }}
          >
            {!open ? "Показати повну версію" : "Сховати"}
          </Button>
        </Box>
      )}
    </CardStyled>
  );
};

export default StoryCard;
