import {createElement} from '../util.js';

const createUserRank = (films) => {
  let userProfile = ``;
  let watchedMoviesTotal = films.filter((film) => {
    return film.isMarkAsWatchedPressed;
  });
  watchedMoviesTotal = watchedMoviesTotal.length;
  switch (true) {
    case watchedMoviesTotal <= 10 && watchedMoviesTotal > 0 :
      userProfile = `Novice`;
      break;

    case watchedMoviesTotal <= 20:
      userProfile = `Fan`;
      break;

    case watchedMoviesTotal > 20:
      userProfile = `Movie Buff`;
      break;

    default:
      userProfile = userProfile;
  }

  return (
    ` <section class="header__profile profile">
    <p class="profile__rating">${userProfile}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

export default class UserRank {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createUserRank(this._films);
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
