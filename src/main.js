import {createFilmTemplate} from './components/film.js';
import {createFilmListTemplate} from './components/film-list.js';
import {createFilmListExtraTemplate} from './components/film-list-extra.js';
import {createPopupTemplate} from './components/popup.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createUserRank} from './components/user-rank.js';
import {generateFilms} from './mock/filmmock.js';
import {generateFilters} from './mock/filter.js';
import {generatePopup} from './mock/popupmock.js';

const FILM_CARD_COUNT = 23;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRank());

const filters = generateFilters();
render(siteMainElement, createSiteMenuTemplate(filters));

render(siteMainElement, createFilmListTemplate());

const filmSection = document.querySelector(`.films`);
const filmListMain = siteMainElement.querySelector(`.films-list`);
const filmListContainer = document.querySelector(`.films-list__container`);

const films = generateFilms(FILM_CARD_COUNT);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => {
  render(filmListContainer, createFilmTemplate(film));
});

render(filmListMain, createShowMoreButton());
const showMoreButton = filmListMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  let prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
    render(filmListContainer, createFilmTemplate(film));
  });

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});


render(filmSection, createFilmListExtraTemplate(films));

const siteBodyElement = document.querySelector(`body`);

const popup = generatePopup();
render(siteBodyElement, createPopupTemplate(popup));

export {generateFilms};
