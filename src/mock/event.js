import {getRandomInteger, getRandomItem, getRandomBoolean} from "../utils/common.js";
import {TRANSPORT_TYPE, DESTINATION, DESCRIPTION_TEXT, Offer} from "../const.js";

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);


export const generateRandomDescription = () => {
  const descriptions = DESCRIPTION_TEXT.split(`.`);

  return descriptions.slice([getRandomInteger(0, descriptions.length - 1)], [getRandomInteger(0, descriptions.length - 1)])
  .join(`.`);
};

export const getPhotos = () => {
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

const generateOfferbyType = (type) => {
  for (const key in Offer) {
    if (key === type) {
      return Offer[key];
    }
  }
  return [];
};

export const generateOffers = (type) => {

  const offerList = generateOfferbyType(type);
  const typeOffer = {
    offer: offerList,
    isChecked: Boolean(getRandomInteger(0, 1)),
  };
  return typeOffer;
};

const typeTest = getRandomItem(TRANSPORT_TYPE);

export const generateEvent = () => ({
  id: generateId(),
  type: getRandomItem(TRANSPORT_TYPE),
  infoDestination: {
    name: getRandomItem(DESTINATION),
    description: generateRandomDescription(),
    pictures: {
      src: getPhotos(),
      description: generateRandomDescription(),
    }
  },
  price: generatePrice(),
  date: generateDate(),
  offers: generateOffers(typeTest),
  // test: generateOffers(typeTest),
  isFavorite: getRandomBoolean(),


});
