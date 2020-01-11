import FilmListExtraComponent from '../components/film-list-extra.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsComponent from '../components/films.js';
import NoFilmsComponent from '../components/no-films.js';
import FilmsContainerComponent from '../components/films-container.js';
import MovieController from './movie.js';
import {SortType} from '../components/sort.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {getMostCommentedFilms, getMostRatedFilms} from '../utils/common.js';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class PageController {
  constructor(container, sorting) {
    this._container = container;
    this._films = [];
    this._sortedFilms = [];
    this._showedFilmControllers = [];
    this._showingFilmCount = SHOWING_FILMS_COUNT_ON_START;

    this._noFilmsComponent = new NoFilmsComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._filmsComponent = new FilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = sorting;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    const mainContainer = this._container.getElement();
    const container = mainContainer.querySelector(`.films-list`);

    if (!this._films.length) {
      render(container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._filmsComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

    const filmsContainerComponent = this._filmsContainerComponent.getElement();

    const newFilms = this._renderFilms(filmsContainerComponent, this._films.slice(0, this._showingFilmCount));
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._renderShowMoreButton(this._films);

    this._renderExtraFilms();
  }

  _renderFilms(filmsContainerComponent, films) {
    return films.map((film) => {
      const movieController = new MovieController(filmsContainerComponent, this._onDataChange, this._onViewChange);
      movieController.render(film);
      return movieController;
    });
  }

  _renderSortedFilms(films) {
    const filmsContainerComponent = this._filmsContainerComponent.getElement();

    filmsContainerComponent.innerHTML = ``;

    this._showingFilmCount = SHOWING_FILMS_COUNT_ON_START;
    this._showedFilmControllers = [];
    const newFilms = this._renderFilms(filmsContainerComponent, films.slice(0, this._showingFilmCount));
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    if (this._showMoreButtonComponent._element) {
      remove(this._showMoreButtonComponent);
    }

    this._renderShowMoreButton(films);
  }

  _renderExtraFilms() {
    const mostRatedFilms = getMostRatedFilms(this._films);
    const mostCommentedFilms = getMostCommentedFilms(this._films);

    const EXTRA_TITLES = [`Top Rated`, `Most Commented`];

    const mainContainer = this._container.getElement();

    const topFilmsMap = {
      'Top Rated': mostRatedFilms,
      'Most Commented': mostCommentedFilms
    };

    EXTRA_TITLES.forEach((title) => {
      const filmListExtraComponent = new FilmListExtraComponent(title);
      render(mainContainer, filmListExtraComponent, RenderPosition.BEFOREEND);
      const filmListExtraContainer = filmListExtraComponent.getElement().querySelector(`.films-list__container`);
      this._renderFilms(filmListExtraContainer, topFilmsMap[title]);
    });
  }

  _renderShowMoreButton(films) {
    if (this._showingFilmCount >= films.length) {
      return;
    }

    const mainContainer = this._container.getElement();
    const container = mainContainer.querySelector(`.films-list`);
    render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmCount;
      const filmsContainerComponent = this._filmsContainerComponent.getElement();
      this._showingFilmCount = this._showingFilmCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const newFilms = this._renderFilms(filmsContainerComponent, films.slice(prevFilmsCount, this._showingFilmCount));
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._sortedFilms = this._films.slice().sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case SortType.RATING:
        this._sortedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        this._sortedFilms = this._films;
        break;
    }

    this._renderSortedFilms(this._sortedFilms);
  }
}
