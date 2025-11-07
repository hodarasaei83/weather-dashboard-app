import React from "react";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import type { DailyForecast } from "../../services/axios/weatherApi";
import { iconUrl } from "../../services/axios/weatherApi";
import { useTranslation } from "react-i18next";
import i18n from "../../lib/utils/i18n";
import { locationOptions } from "../../lib/models/locationOptions";

export type weatherCardProps = {
  city: string;
  forecast: DailyForecast | null;
};

const weatherCard: React.FC<weatherCardProps> = ({ city, forecast }) => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",
        color: theme.palette.mode === "dark" ? "#F3F4F7" : "#003464",
        p: 2,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      })}
    >
      <Box sx={{ marginLeft: "10px" }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ display: "flex", flexDirection: "column" }}>
          <Chip
            icon={<RoomIcon />}
            label={i18n.language === "fa" ? locationOptions.find(c => c.en === city)?.fa : city}
            sx={{
              backgroundColor: "#CDD9E0",
              color: "#3D4852",
              fontWeight: "400",
              fontSize: "16px",
              minWidth: 130,
              paddingRight: "10px",
              "& .MuiChip-label": {
                textAlign: i18n.language === "fa" ? "right" : "left",
                width: "100%",
              },
            }}
          />

        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {forecast
                ? new Date(forecast.dt * 1000).toLocaleDateString(i18n.language, { weekday: "long" })
                : "--"}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "10px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                {forecast
                  ? new Date(forecast.dt * 1000).toLocaleDateString(i18n.language, { year: "numeric", month: "short", day: "2-digit" })
                  : "--"}
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
                {forecast
                  ? new Date(forecast.dt * 1000).toLocaleTimeString(i18n.language, { hour: "2-digit", minute: "2-digit", hour12: true })
                  : "--"}
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: "500" }}>
              {forecast ? Math.round(forecast.temp.day) : "--"}°C
            </Typography>

            {/* Min & Max Temp */}
            {forecast && (
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {t("high")}: {Math.round(forecast.temp.max)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {t("low")}: {Math.round(forecast.temp.min)}
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>

      <Stack sx={{ marginRight: i18n.language === "fa" ? "0px" : "30px", marginLeft: i18n.language === "fa" ? "30px" : "0px" }}>
        <Box sx={{ width: 120 }}>
          <img src={iconUrl("current")} />
          <Typography sx={{ fontSize: "32px" }}>
            {forecast ? t(forecast.weather[0].main) : t("loading")}
          </Typography>
          {forecast && (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {i18n.language === "fa"
                ? `${Math.round(forecast.feels_like.day)} ${t("feelsLike")}`
                : `${t("feelsLike")} ${Math.round(forecast.feels_like.day)}`}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default weatherCard;
