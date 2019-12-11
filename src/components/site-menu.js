const createFiltersMarkup = (filter) => {
  const {name, count} = filter;
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name}<span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFiltersMarkup(it)).join(`\n`);

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>

    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};
