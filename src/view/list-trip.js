import AbstractView from "./abstract.js";

const createListTripTemplate = () => `<ul class="trip-days"></ul>`;

export default class ListTrip extends AbstractView {
  getTemplate() {
    return createListTripTemplate();
  }
}
