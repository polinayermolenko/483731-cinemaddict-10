import FilmComponent from './components/film.js';
import FilmListComponent from './components/film-list.js';
import FilmListExtraComponent from './components/film-list-extra.js';
import PopupComponent from './components/popup.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import SiteMenuComponent from './components/site-menu.js';
import UserRankComponent from './components/user-rank.js';
import SortComponent from './components/sort.js';
import FilmsComponent from './components/films.js';
import NoFilmsComponent from './components/no-films.js';
import FilmsContainerComponent from './components/films-container.js';
import {generateFilms} from './mock/filmmock.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {getMostCommentedFilms, getMostRatedFilms} from './utils/common.js';

const renderFilm = (film, container) => {
  const popupComponent = new PopupComponent(film);
  const filmComponent = new FilmComponent(film);
  const siteBodyElement = document.querySelector(`body`);

  const hidePopup = () => {
    popupComponent.getElement().remove();
  };

  const onCloseButtonClick = () => {
    hidePopup();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      hidePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFilmClick = () => {
    render(siteBodyElement, popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.setPosterClickHandler(onFilmClick);
  filmComponent.setTitleClickHandler(onFilmClick);
  filmComponent.setCommentsClickHandler(onFilmClick);

  popupComponent.setCloseButtonClickHandler(onCloseButtonClick);

  render(container, filmComponent, RenderPosition.BEFOREEND);
};

const FILM_CARD_COUNT = 23;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const films = generateFilms(FILM_CARD_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(films), RenderPosition.BEFOREEND);

const filters = generateFilters(films);
render(siteMainElement, new SiteMenuComponent(filters), RenderPosition.BEFOREEND);

render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent();
const filmsList = filmListComponent.getElement().querySelector(`.films-list`);

render(siteMainElement, filmListComponent, RenderPosition.BEFOREEND);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

if (!films.length) {
  render(filmsList, new NoFilmsComponent(), RenderPosition.BEFOREEND);
} else {
  const filmsContainerComponent = new FilmsContainerComponent();
  render(filmsList, new FilmsComponent(), RenderPosition.BEFOREEND);
  render(filmsList, filmsContainerComponent, RenderPosition.BEFOREEND);

  const filmListContainer = filmListComponent.getElement().querySelector(`.films-list__container`);

  films.slice(0, showingFilmsCount).forEach((film) => {
    renderFilm(film, filmListContainer);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsList, showMoreButtonComponent, RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    let prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
      renderFilm(film, filmListContainer);
    });

    if (showingFilmsCount >= films.length) {
      remove(showMoreButtonComponent);
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
    const filmListExtraComponent = new FilmListExtraComponent(title);
    render(filmListComponent.getElement(), filmListExtraComponent, RenderPosition.BEFOREEND);
    const filmListExtraContainer = filmListExtraComponent.getElement().querySelector(`.films-list__container`);
    TopFilmsMap[title].forEach((film) => {
      renderFilm(film, filmListExtraContainer);
    });
  });
}

const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${films.length} movies inside`;

export {generateFilms};
