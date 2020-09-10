import AbstractView from "./abstract.js";

const createPhotosTemplate = (photos) => {
  return photos.map((photo) => `
    <img class="event__photo" src="${photo}" alt="Event photo">
  `).join(``);
};

const createOfferTemplate = (offers) => {
  return offers.map((offer) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}"${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.title}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const createEventDetailsTemplate = (event) => {
  const {infoDestination, offers} = event;
  const photosTemplate = createPhotosTemplate(infoDestination.photos);
  return `<section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                  ${createOfferTemplate(offers)}
                </div>
              </section>
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description"> ${infoDestination.description}</p>
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${photosTemplate}
                  </div>
                </div>
                </div>
              </section>
        </section>`;
};

// export default class EventDetails {
export default class EventDetails extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventDetailsTemplate(this._event);
  }
}
