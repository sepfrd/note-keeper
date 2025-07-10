export const convertToLocalISOString = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  const isoStringWithoutTimezone = `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
  const currentTimezone = getCurrentTimezoneISOString();

  return isoStringWithoutTimezone + currentTimezone;
};

export const getCurrentTimezoneISOString: () => string = () => {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
};

export const removeTimezone = (date: string) => date.replace(/([+-]\d{2}:?\d{2}|Z)$/, "");
