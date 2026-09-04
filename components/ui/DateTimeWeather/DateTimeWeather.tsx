"use client";

import { useState, useEffect } from "react";
import type { JSX } from "react";

// Styles
import styles from "./DateTimeWeather.module.css";

export default function DateTimeWeather(): JSX.Element {
  const [dateTimeWeather, setDateTimeWeather] = useState("");

  useEffect(() => {
    const updateDateTimeWeather = async () => {
      // Format date/time using Intl.DateTimeFormat
      const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
        timeZone: 'America/Bogota'
      });

      const now = new Date();
      const parts = formatter.formatToParts(now);
      const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));
      const formattedDate = `${partMap.month} ${partMap.day}, ${partMap.year} ${partMap.hour}:${partMap.minute} ${partMap.dayPeriod.toLowerCase()} GMT`;

      // Fetch real-time weather for Bogotá
      let temperatureString = "Bogotá --°C";
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=4.7110&longitude=-74.0721&current_weather=true'
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (data.current_weather?.temperature !== undefined) {
          const temp = Math.round(data.current_weather.temperature);
          temperatureString = `Bogotá ${temp}°C`;
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }

      setDateTimeWeather(`${formattedDate}, ${temperatureString}`);
    };

    updateDateTimeWeather();
    const interval = setInterval(updateDateTimeWeather, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <p className={styles.dateTime}>{dateTimeWeather}</p>;
}
