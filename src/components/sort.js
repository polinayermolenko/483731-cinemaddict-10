import AbstractComponent from './abstract-component.js';

export const SortType = {
  DATE: `date-down`,
  RATING: `rating-down`,
  DEFAULT: `default`
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type=${SortType.DEFAULT} class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type=${SortType.DATE} class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type=${SortType.RATING} class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (sortType === this._currentSortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
