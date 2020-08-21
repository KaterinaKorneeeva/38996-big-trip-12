// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


export const renderDate = (date) => {
  const [year, month, day, hours, minutes] = parseTimeToArray(date);

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};



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


