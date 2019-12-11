import {generateFilms} from './filmmock.js';

const FILTER_NAMES = [`Watchlist`, `History`, `Favorites`];

const filterMap = {
  'Watchlist': `isAddToWatchlistPressed`,
  'History': `isMarkAsWatchedPressed`,
  'Favorites': `isMarkAsFavoritePressed`
};

export const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: countValues(generateFilms(20), it)
    };
  });
};

const countValues = (films, filter) => {
  return films.map((film) => {
    return film[filterMap[filter]];
  }).reduce((acc, cur) => {
    return acc + Number(cur);
  });
};
