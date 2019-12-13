export const createFilmTemplate = (film) => {
  const {title, rating, releaseDate, duration, genres, poster, description, comments,
    isAddToWatchlistPressed, isMarkAsWatchedPressed, isMarkAsFavoritePressed} = film;
  const year = releaseDate.slice(releaseDate.length - 4, releaseDate.length);
  const genre = genres[0];
  const commentsNumber = `${comments.length === 1 ? `${comments.length} comment` : `${comments.length} comments`}`;
  const buttonAddToWatchlist = isAddToWatchlistPressed ? `film-card__controls-item--active` : ``;
  const buttonMarkAsWatched = isMarkAsWatchedPressed ? `film-card__controls-item--active` : ``;
  const buttonMarkAsFavorite = isMarkAsFavoritePressed ? `film-card__controls-item--active` : ``;
  return (
    `<article class="film-card">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments">${commentsNumber}</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${buttonAddToWatchlist}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${buttonMarkAsWatched}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${buttonMarkAsFavorite}">Mark as favorite</button>
            </form>
          </article>`
  );
};
