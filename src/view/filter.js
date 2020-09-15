import AbstractView from "./abstract.js";
const createFilterItemTemplate = (filters) => {
  return filters.map((filter) => `
    <div class="trip-filters__filter">
      <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" checked>
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>
  `).join(``);
};

const createFilterTemplate = (filters) => {
  const itemsTemplate = createFilterItemTemplate(filters);
  return `<form class="trip-filters" action="#" method="get">
          ${itemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};
export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}
