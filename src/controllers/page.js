import FilmComponent from '../components/film.js';
import FilmListExtraComponent from '../components/film-list-extra.js';
import PopupComponent from '../components/popup.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsComponent from '../components/films.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {getMostCommentedFilms, getMostRatedFilms} from '../utils/common.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

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

export default class PageController {
  constructor(container) {
    this._container = container.getElement();

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsComponent = new FilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const mainContainer = this._container;
    const container = mainContainer.querySelector(`.films-list`);
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    if (!films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
    } else {
      render(container, this._filmsComponent, RenderPosition.BEFOREEND);
      render(container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

      const filmsContainerComponent = this._filmsContainerComponent.getElement();
      films.slice(0, showingFilmsCount).forEach((film) => {
        renderFilm(film, filmsContainerComponent);
      });

      render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        let prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
        films.slice(prevFilmsCount, showingFilmsCount).forEach((film) => {
          renderFilm(film, filmsContainerComponent);
        });

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });

      const mostRatedFilms = getMostRatedFilms(films);
      const mostCommentedFilms = getMostCommentedFilms(films);

      const EXTRA_TITLES = [`Top Rated`, `Most Commented`];

      const topFilmsMap = {
        'Top Rated': mostRatedFilms,
        'Most Commented': mostCommentedFilms
      };


      EXTRA_TITLES.forEach((title) => {
        const filmListExtraComponent = new FilmListExtraComponent(title);
        render(mainContainer, filmListExtraComponent, RenderPosition.BEFOREEND);
        const filmListExtraContainer = filmListExtraComponent.getElement().querySelector(`.films-list__container`);
        topFilmsMap[title].forEach((film) => {
          renderFilm(film, filmListExtraContainer);
        });
      });
    }
  }
}