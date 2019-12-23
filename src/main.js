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
import {render, RenderPosition, getMostCommentedFilms, getMostRatedFilms} from './util.js';

const renderFilm = (film, container) => {
  const popupComponent = new PopupComponent(film);
  const filmComponent = new FilmComponent(film);
  const siteBodyElement = document.querySelector(`body`);
  const poster = filmComponent.getElement().querySelector(`.film-card__poster`);
  const title = filmComponent.getElement().querySelector(`.film-card__title`);
  const comments = filmComponent.getElement().querySelector(`.film-card__comments`);
  const closeButton = popupComponent.getElement().querySelector(`.film-details__close-btn`);

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
    render(siteBodyElement, popupComponent.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  poster.addEventListener(`click`, onFilmClick);

  title.addEventListener(`click`, onFilmClick);

  comments.addEventListener(`click`, onFilmClick);

  closeButton.addEventListener(`click`, onCloseButtonClick);

  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const FILM_CARD_COUNT = 23;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const films = generateFilms(FILM_CARD_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(films).getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters(films);
render(siteMainElement, new SiteMenuComponent(filters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent();
const filmsList = filmListComponent.getElement().querySelector(`.films-list`);

render(siteMainElement, filmListComponent.getElement(), RenderPosition.BEFOREEND);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

if (!films.length) {
  render(filmsList, new NoFilmsComponent().getElement(), RenderPosition.BEFOREEND);
} else {
  const filmsContainerComponent = new FilmsContainerComponent();
  render(filmsList, new FilmsComponent().getElement(), RenderPosition.BEFOREEND);
  render(filmsList, filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);

  const filmListContainer = filmListComponent.getElement().querySelector(`.films-list__container`);

  films.slice(0, showingFilmsCount).forEach((film) => {
    renderFilm(film, filmListContainer);
  });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    let prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
    films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
      renderFilm(film, filmListContainer);
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
    const filmListExtraComponent = new FilmListExtraComponent(title);
    render(filmListComponent.getElement(), filmListExtraComponent.getElement(), RenderPosition.BEFOREEND);
    const filmListExtraContainer = filmListExtraComponent.getElement().querySelector(`.films-list__container`);
    TopFilmsMap[title].forEach((film) => {
      renderFilm(film, filmListExtraContainer);
    });
  });
}

const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${films.length} movies inside`;

export {generateFilms};
