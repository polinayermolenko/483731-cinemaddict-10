const FILTER_NAMES = [`Watchlist`, `History`, `Favorites`];

const filterMap = {
  'Watchlist': `isAddToWatchlistPressed`,
  'History': `isMarkAsWatchedPressed`,
  'Favorites': `isMarkAsFavoritePressed`
};

export const generateFilters = (films) => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: countValues(films, it)
    };
  });
};

const countValues = (films, filter) => {
  return films.reduce((acc, film) => {
    return acc + Number(film[filterMap[filter]]);
  }, 0);
};
