import AbstractComponent from './abstract-component.js';

export const SortType = {
  DATE: `date-down`,
  RATING: `rating-down`,
  DEFAULT: `default`
};

const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-default=${SortType.DEFAULT} class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-date=${SortType.DATE} class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-rating=${SortType.RATING} class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  getTemplate() {
    return createSortTemplate();
  }
}
