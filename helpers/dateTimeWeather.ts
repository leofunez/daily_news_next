/**
 * Formats a given date and fetches live temperature for Bogotá, Colombia.
 * @param {Date} date - Optional date object (defaults to current time)
 * @returns {Promise<string>} e.g., "Aug 15, 2026 12:40 pm GMT, Bogotá 24°C"
 */
export default async function getFormattedDateTimeWithWeather(date = new Date()): Promise<string> {
  // 1. Format date/time using Intl.DateTimeFormat
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

  const parts = formatter.formatToParts(date);
  const partMap = Object.fromEntries(parts.map(p => [p.type, p.value]));

  // Reconstruct date string matching target format: "Aug 15, 2026 12:40 pm GMT"
  const formattedDate = `${partMap.month} ${partMap.day}, ${partMap.year} ${partMap.hour}:${partMap.minute} ${partMap.dayPeriod.toLowerCase()} GMT`;

  // 2. Fetch real-time weather for Bogotá (Lat: 4.7110, Lon: -74.0721)
  let temperatureString = "Bogotá --°C";
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=4.7110&longitude=-74.0721&current_weather=true'
    );
    const data = await res.json();
    const temp = Math.round(data.current_weather.temperature);
    temperatureString = `Bogotá ${temp}°C`;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }

  return `${formattedDate}, ${temperatureString}`;
}
