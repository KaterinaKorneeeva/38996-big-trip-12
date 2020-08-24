import {getRandomInteger, getRandomItem} from "../utils.js";
import {TRANSPORT_TYPE, DESTINATION, DESCRIPTION_TEXT, OFFERS} from "../const.js";

const generateRandomDescription = () => {
  const descriptions = DESCRIPTION_TEXT.split(`.`);

  return descriptions.slice([getRandomInteger(0, descriptions.length - 1)], [getRandomInteger(0, descriptions.length - 1)])
  .join(`.`);
};

const getPhotos = () => {
  const photos = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const generatePrice = () => getRandomInteger(20, 500);

const generateDate = () => {
  const startDate = new Date();
  const maxDaysGap = 1;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  startDate.setDate(startDate.getDate() + daysGap);
  startDate.setHours(getRandomInteger(0, 23));
  startDate.setMinutes(getRandomInteger(0, 59));

  const endDate = new Date(startDate.getTime() + (getRandomInteger(0, 90) * getRandomInteger(0, 60) * getRandomInteger(0, 1000)));

  const eventDate = {
    start: startDate,
    end: endDate
  };

  return eventDate;
};

export const generateEvent = () => ({
  type: getRandomItem(TRANSPORT_TYPE),
  destination: getRandomItem(DESTINATION),
  description: generateRandomDescription(),
  photos: getPhotos(),
  price: generatePrice(),
  date: generateDate(),
  offers: OFFERS,
});
