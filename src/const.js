import {getRandomInteger} from "./utils/common.js";

const TRANSPORT_TYPE = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

const DESTINATION = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const OFFERS = [
  {
    title: `Add luggage`,
    price: 50,
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    title: `Switch to comfort class`,
    price: 100,
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    title: `Add meal`,
    price: 15,
    isChecked: Boolean(getRandomInteger(0, 1)),
  },

  {
    title: `Choose seats`,
    price: 5,
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    title: `Travel by train`,
    price: 40,
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    title: `Order Uber`,
    price: 20,
    isChecked: Boolean(getRandomInteger(0, 1)),
  }
];

export {TRANSPORT_TYPE, DESTINATION, DESCRIPTION_TEXT, OFFERS};
