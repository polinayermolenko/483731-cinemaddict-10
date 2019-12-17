import {createFilmTemplate} from './film.js';
import {createElement} from '../util.js';

const EXTRA_TITLES = [`Top Rated`, `Most Commented`];

const getMostCommentedFilms = (films) => {
  return films.slice().sort((film1, film2) => {
    return film2.comments.length - film1.comments.length;
  })
.slice(0, 2);
};

const getMostRatedFilms = (films) => {
  return films.slice()
 .sort((film1, film2) => {
   return film2.rating - film1.rating;
 })
.slice(0, 2);
};

const createFilmListExtraMarkup = (extraFilm) => {
  const {title, topFilms} = extraFilm;
  const sortedFilmsMarkup = topFilms.map((it) => {
    return createFilmTemplate(it);
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


const createFilmListExtraTemplate = (films) => {

  const topFilmsMap = {
    'Top Rated': getMostRatedFilms(films),
    'Most Commented': getMostCommentedFilms(films)
  };


  const generateExtraFilms = () => {
    return EXTRA_TITLES.map((title) => {
      return {
        title,
        topFilms: topFilmsMap[title]
      };
    });
  };

  const extraFilms = generateExtraFilms();

  return extraFilms.map((it) => {
    return createFilmListExtraMarkup(it);
  }).join(`\n`);
};

export default class FilmsListExtra {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmListExtraTemplate(this._films);
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
