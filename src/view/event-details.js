import AbstractView from "./abstract.js";
import he from "he";

const BLANK_EVENT = {
  type: ``,
  infoDestination: {
    description: ``,
    pictures: {
      src: [],
      description: ``,
    }
  },
  offers: {
    offer: [],
    isChecked: ``,
  },
  price: ``,
  date: {
    start: new Date(),
    end: new Date(),
  },
  isFavorite: false,
};

const createPhotosTemplate = (photos, description) => {
  return photos.map((src) => `
    <img class="event__photo" src="${src}" alt="${description}">
  `).join(``);
};

const createOfferTemplate = (offers) => {

  const {isChecked} = offers;
  console.log('isChecked',  offers);
  return offers.offer.map((offer) => {
    return (
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.description}-1" type="checkbox" name="event-offer-${offer.description}"${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.description}-1">
          <span class="event__offer-title">${offer.description}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
    );
  }).join(`\n`);
};

const createEventDetailsTemplate = (event) => {
  console.log('event',event);
  const {infoDestination, offers} = event;
  const {src, description} = infoDestination.pictures;
  const photosTemplate = createPhotosTemplate(src, description);
  return `<section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                  ${createOfferTemplate(offers)}
                </div>
              </section>
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description"> ${he.encode(infoDestination.description)}</p>
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
  constructor(event = BLANK_EVENT) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createEventDetailsTemplate(this._event);
  }
}
