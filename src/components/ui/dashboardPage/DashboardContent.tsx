import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import WeatherCard from "../../shared/weatherCard";
import WeatherCarousel from "../../shared/weatherCarousal";
import { AreaChart, Area, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import { fetchForecast16, type DailyForecast } from "../../../services/axios/weatherApi";
import { useEffect, useMemo, useState } from "react";

export type DashboardContentProps = {
    mode: "light" | "dark";
    setMode: (m: "light" | "dark") => void;
  };
  
  const DashboardContent: React.FC<DashboardContentProps> = ({ mode, setMode }) => {
    const { t } = useTranslation();
    const [city, setCity] = useState("Tehran");
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState<DailyForecast[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    const units = "metric" as const;
  
    const load = async (q: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchForecast16(q, units);
        setCity(data.city.name);
        setDays(data.list);
      } catch (e: any) {
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      load(city);
    }, []);
  
    const firstDay = useMemo(() => (days.length ? days[0] : null), [days]);
  
    const chartData = days.map((d) => ({
      date: new Date(d.dt * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      temp: d.temp.day,
    }));

    return (
        <>
        <Container maxWidth="xl" sx={{ py: 2, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12 }}>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} width="100%">
          <Box flex={5}>
            <WeatherCard city={city} forecast={firstDay} />
          </Box>
          <Box flex={7}>
            <Paper sx={(theme) => ({
              p: 2,
              borderRadius: 3,
              height: "190px",
              width: "744px",
              backgroundColor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",
            })}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                {t("avgMonthlyTemp")}
              </Typography>

              <ResponsiveContainer width="100%" height={150} >
                <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00bcd4" stopOpacity={0.8} />   {/* teal */}
                      <stop offset="50%" stopColor="#3f51b5" stopOpacity={0.9} />  {/* blue */}
                      <stop offset="100%" stopColor="#9c27b0" stopOpacity={0.99} /> {/* purple */}
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} horizontal stroke={mode === "dark" ? "#444" : "#ccc"} strokeDasharray="3 3" />

                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: mode === "dark" ? "#fff" : "#000" }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: mode === "dark" ? "#fff" : "#000" }}
                    domain={[0, 40]}
                    tickFormatter={(value) => `${value}°C`}
                    tickCount={5}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: mode === "dark" ? "#333" : "#fff",
                      color: mode === "dark" ? "#fff" : "#000",
                    }}
                  />

                  <Area
                    type="linear"
                    dataKey="temp"

                    fill="url(#colorTemp)"
                    fillOpacity={0.1}
                  />

                  <Line
                    type="linear"
                    dataKey="temp"
                    stroke="url(#colorTemp)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Box>
        </Grid>

        <Grid size={{ xs: 12 }} sx={(theme) => ({
          backgroundColor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",
        })}>

          <Box
            sx={{
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              padding: "30px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)"
            }}
          >
            <Typography sx={(theme) => ({
              color: theme.palette.mode === "dark" ? "#E1E9EE" : "#003464",
              fontWeight: "600",
              fontSize: "24px"
            })}>
              {t("twoWeeks")}
            </Typography>
            <WeatherCarousel days={days} />
          </Box>
        </Grid>
      </Grid>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <Paper sx={{ display: "inline-block", px: 2, py: 1, borderRadius: 999 }}>
            {t("loading")}
          </Paper>
        </Box>
      )}

      {error && (
        <Box sx={{ position: "fixed", bottom: 16, left: 0, right: 0, textAlign: "center" }}>
          <Paper color="error" sx={{ display: "inline-block", px: 2, py: 1, borderRadius: 999 }}>
            {error}
          </Paper>
        </Box>
      )}

    </Container>
        </>
    )
}

export default DashboardContent;