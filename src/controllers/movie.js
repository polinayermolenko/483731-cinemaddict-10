import PopupComponent from '../components/popup.js';
import FilmComponent from '../components/film.js';
import RatingComponent from '../components/rating.js';
import {render, RenderPosition, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._popupContainer = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._popupComponent = null;
    this._filmComponent = null;
    this._ratingComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldPopupComponent = this._popupComponent;
    this._popupContainer = document.querySelector(`body`);
    this._popupComponent = new PopupComponent(film);
    this._filmComponent = new FilmComponent(film);
    this._ratingComponent = new RatingComponent(film);

    this._filmComponent.setPosterClickHandler(() => this._showPopup());
    this._filmComponent.setTitleClickHandler(() => this._showPopup());
    this._filmComponent.setCommentsClickHandler(() => this._showPopup());
    this._popupComponent.setCloseButtonClickHandler(this._onCloseButtonClick);

    this._filmComponent.setWatchlistFilmClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddToWatchlistPressed: !film.isAddToWatchlistPressed
      }));
    });

    this._filmComponent.setWatchedFilmClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isMarkAsWatchedPressed: !film.isMarkAsWatchedPressed
      }));
    });

    this._filmComponent.setFavoriteFilmClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isMarkAsFavoritePressed: !film.isMarkAsFavoritePressed
      }));
    });

    this._popupComponent.setWatchlistPopupClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddToWatchlistPressed: !film.isAddToWatchlistPressed
      }));
    });

    this._popupComponent.setWatchedPopupClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isMarkAsWatchedPressed: !film.isMarkAsWatchedPressed
      }));
    });

    this._popupComponent.setFavoritePopupClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isMarkAsFavoritePressed: !film.isMarkAsFavoritePressed
      }));
    });

    this._popupComponent.setCloseButtonClickHandler(() => this._hidePopup());

    if (oldPopupComponent && oldFilmComponent) {
      replace(this._popupComponent, oldPopupComponent);
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }

    if (film.isMarkAsWatchedPressed) {
      const ratingContainer = this._popupComponent.getElement().querySelector(`.form-details__top-container`);
      render(ratingContainer, this._ratingComponent, RenderPosition.AFTEREND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hidePopup();
    }
  }

  _showPopup() {
    this._onViewChange();

    this._mode = Mode.EDIT;
    render(this._popupContainer, this._popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _hidePopup() {
    this._popupComponent.getElement().remove();

    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      this._hidePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
