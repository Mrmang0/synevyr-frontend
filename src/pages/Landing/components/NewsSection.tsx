import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { NewsItem } from "../LandingTypes";
import { Grid } from "@mui/material";
import StoryCard from "./StoryCard";

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  const [newsLoading] = useFetch<NewsItem[]>(
    "http://localhost:5127/api/news",
    (response) => {
      setNews(response);
    }
  );


  return (
    <Grid container gap={8}>
      {news.map((x) => (
        <Grid item xs={12}>
          <StoryCard key={x.link} {...x}></StoryCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default NewsSection;
