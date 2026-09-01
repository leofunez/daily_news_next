export default function formatPostDate(dateString: string): string {
  // Maneja casos donde la fecha sea inválida, nula o indefinida
  if (!dateString) return "";

  const date = new Date(dateString);

  // 1. Get the short month short name (ej: "Aug")
  const month = date.toLocaleString('en-US', { month: 'short' });

  // 2. Get the day and fill with 0 at left if it is less than 10
  const day = String(date.getDate()).padStart(2, '0');

  // 3. Get the year in 4 digits
  const year = date.getFullYear();

  // 4. Get the hour and minutes in a 12 hours format with am/pm
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, '0');

  return `${month} ${day}, ${year} - ${formattedHours}:${minutes} ${ampm}`;
}
