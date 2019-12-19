import {createFilmTemplate} from './film.js';
import {createElement} from '../util.js';

const createFilmListExtraTemplate = (title, sortedFilms) => {

  const sortedFilmsMarkup = sortedFilms.map((sortedFilm) => {
    return createFilmTemplate(sortedFilm);
  }).join(`\n`);

  return (
    `<section class="films-list--extra">
       <h2 class="films-list__title">${title}</h2>
       <div class="films-list__container">
       ${sortedFilmsMarkup}
       </div>
     </section>`
  );
};

export default class FilmsListExtra {
  constructor(title, films) {
    this._title = title;
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._title, this._films);
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
