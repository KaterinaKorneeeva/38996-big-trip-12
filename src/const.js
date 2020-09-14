export const TRANSPORT_TYPE = [
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

export const DESTINATION = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`
];

export const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;


export const TRANSFER = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const ACTIVITY = [`check-in`, `sightseeing`, `restaurant`];

export const Offer = {
  "Train": [{price: 50, description: `Add luggage`}, {price: 20, description: `Switch to comfort class`}, {price: 20, description: `Add meal`}],
  "Taxi": [{price: 50, description: `Add luggage`}, {price: 20, description: `Switch to comfort class`}, {price: 20, description: `Order Uber`}],
  "Ship": [{price: 50, description: `Travel by train`}, {price: 20, description: `Choose seats`}],
  "Transport": [{price: 50, description: `Add luggage`}, {price: 20, description: `Switch to comfort class`}, {price: 20, description: `Add meal`}],
  "Plane": [{price: 50, description: `Add luggage`}, {price: 20, description: `Switch to comfort class`}, {price: 20, description: `Choose seats`}],
  "Flight": [{price: 50, description: `Travel by train`}, {price: 20, description: `Order Uber`}, {price: 20, description: `Choose seats`}],
  "Drive": [{price: 50, description: `Travel by train`}],
  "Bus": [{price: 50, description: `Travel by train`}],
  "Check-in": [{price: 50, description: `Travel by train`}, {price: 20, description: `Order Uber`}, {price: 20, description: `Choose seats`}],
  "Sightseeing": [{price: 50, description: `Travel by train`}],
  "Restaurant": [{price: 50, description: `Travel by train`}],
};

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

