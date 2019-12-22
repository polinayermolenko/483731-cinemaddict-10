import {createElement} from '../util.js';

const createFilmsTemplate = () => {
  return (
    `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`
  );
};

export default class Films {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
