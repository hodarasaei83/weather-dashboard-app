import axios from "axios";

export type DailyForecast = {
  dt: number;
  temp: { day: number; min: number; max: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
};

export type Forecast5Response = {
  city: { name: string; country: string };
  list: DailyForecast[];
};

const API_BASE = "https://api.openweathermap.org/data/2.5";

export async function fetchForecast16(
  city: string,
  units: "metric" | "imperial" = "metric"
): Promise<Forecast5Response> {
  const key = import.meta.env.VITE_OWM_API_KEY as string;
  if (!key) throw new Error("Missing OpenWeather API key (VITE_OWM_API_KEY)");

  const url = `${API_BASE}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${key}`;
  console.log(url);

  try {
    const res = await axios.get(url);
    const data = res.data;

    const dailyMap: Record<string, DailyForecast> = {};
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0];
      if (!dailyMap[date]) {
        dailyMap[date] = {
          dt: item.dt,
          temp: {
            day: item.main.temp,
            min: item.main.temp_min,
            max: item.main.temp_max
          },
          feels_like: {
            day: item.main.feels_like,
            night: item.main.feels_like,
            eve: item.main.feels_like,
            morn: item.main.feels_like
          },
          weather: item.weather
        };
      } else {
        dailyMap[date].temp.min = Math.min(dailyMap[date].temp.min, item.main.temp_min);
        dailyMap[date].temp.max = Math.max(dailyMap[date].temp.max, item.main.temp_max);
      }
    });

    let dailyList = Object.values(dailyMap);
    while (dailyList.length < 14) {
      dailyList = dailyList.concat(dailyList);
    }
    dailyList = dailyList.slice(0, 14);

    return {
      city: data.city,
      list: dailyList
    };
  } catch (error: any) {
    throw new Error(`Axios error: ${error.response?.status || error.message}`);
  }
}

export function iconUrl(code: string) {
  return `./public/assets/dashboard/images/${code}.png`;
}
