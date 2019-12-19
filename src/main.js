import FilmComponent from './components/film.js';
import FilmListComponent from './components/film-list.js';
import FilmListExtraComponent from './components/film-list-extra.js';
import {createPopupTemplate} from './components/popup.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import SiteMenuComponent from './components/site-menu.js';
import UserRankComponent from './components/user-rank.js';
import {generateFilms} from './mock/filmmock.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition, getMostCommentedFilms, getMostRatedFilms} from './util.js';


const FILM_CARD_COUNT = 23;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const films = generateFilms(FILM_CARD_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(films).getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters(films);
render(siteMainElement, new SiteMenuComponent(filters).getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent();

render(siteMainElement, filmListComponent.getElement(), RenderPosition.BEFOREEND);
const filmListContainer = filmListComponent.getElement().querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount).forEach((film) => {
  render(filmListContainer, new FilmComponent(film).getElement(), RenderPosition.BEFOREEND);
});

const showMoreButtonComponent = new ShowMoreButtonComponent();
const showMoreButtonContainer = filmListComponent.getElement().querySelector(`.films-list`);
render(showMoreButtonContainer, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

showMoreButtonComponent.getElement().addEventListener(`click`, () => {
  let prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
  films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
    render(filmListContainer, new FilmComponent(film).getElement(), RenderPosition.BEFOREEND);
  });

  if (showingFilmsCount >= films.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
});

const mostRatedFilms = getMostRatedFilms(films);
const mostCommentedFilms = getMostCommentedFilms(films);

const EXTRA_TITLES = [`Top Rated`, `Most Commented`];

const TopFilmsMap = {
  'Top Rated': mostRatedFilms,
  'Most Commented': mostCommentedFilms
};

EXTRA_TITLES.forEach((title) => {
  render(filmListComponent.getElement(), new FilmListExtraComponent(title, TopFilmsMap[title]).getElement(), RenderPosition.BEFOREEND);
});

const siteBodyElement = document.querySelector(`body`);

const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${films.length} movies inside`;

/*render(siteBodyElement, createPopupTemplate(films[0]));*/

export {generateFilms};
