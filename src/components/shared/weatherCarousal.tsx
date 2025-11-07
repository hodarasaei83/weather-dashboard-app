import React, { useRef, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import type { DailyForecast } from "../../services/axios/weatherApi";
import { useTranslation } from "react-i18next";

type Props = {
  days: DailyForecast[];
};

const weatherCarousel: React.FC<Props> = ({ days }) => {
  const { t, i18n } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Box
      ref={carouselRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        pb: 1,
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
        cursor: isDragging ? "grabbing" : "grab",
        flexWrap: "nowrap",
        width: "100%",
        userSelect: "none",
      }}
    >
      {days.map((d, index) => {
        const date = new Date(d.dt * 1000);
        const weekday = date.toLocaleDateString(i18n.language, { weekday: "short" });
        const iconUrl = `./public/assets/dashboard/images/${d.weather[0].icon}.png`;

        return (
          <Paper
            key={index}
            sx={(theme) => ({
              flex: "0 0 auto",
              width: 100,
              textAlign: "center",
              p: 1,
              marginTop: "30px",
              borderRadius: "24px",
              backgroundColor: theme.palette.mode === "dark" ? "#3F4861" : "rgba(205, 217, 224, 1)",
              boxShadow: 2,
              minHeight: "266px",
              color: theme.palette.mode === "dark" ? "#E1E9EE" : "#003464",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            })}
          >
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "#E1E9EE" : "#003464",
                marginTop: "20px"
              })}
            >
              {index === 0 ? t("today") : weekday}
            </Typography>

            <Box
              sx={{
                height: "2.5px",
                width: "100%",
                background: "linear-gradient(to right, #36363600, #7E7E7E, #36363600)",
                borderRadius: 2,
                my: 2
              }}
            />

            <Box
              component="img"
              src={iconUrl}
              alt={d.weather[0].description}
              sx={{ width: 80 }}
            />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {Math.round(d.temp.day)}°C
            </Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default weatherCarousel;
