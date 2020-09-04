export const parseTimeToArray = (date) => {
  const year = date.getFullYear();

  let month = date.getMonth();
  month = (month < 9) ? `0${month + 1}` : `${month + 1}`;

  let day = date.getDate();
  day = (day < 10) ? `0${day}` : `${day}`;

  let hours = date.getHours();
  hours = (hours < 10) ? `0${hours}` : `${hours}`;

  let minutes = date.getMinutes();
  minutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;

  return [year, month, day, hours, minutes];
};

export const renderDate = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);
  return `${String(year).slice(-2)}/${month}/${day} ${hours}:${minutes}`;
};

export const renderDateHoursMin = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
