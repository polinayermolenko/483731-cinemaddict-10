import FilmListComponent from './components/film-list.js';
import PageController from './controllers/page.js';
import SiteMenuComponent from './components/site-menu.js';
import UserRankComponent from './components/user-rank.js';
import SortComponent from './components/sort.js';
import {generateFilms} from './mock/filmmock.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const FILM_CARD_COUNT = 23;

const films = generateFilms(FILM_CARD_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new UserRankComponent(films), RenderPosition.BEFOREEND);

const filters = generateFilters(films);
render(siteMainElement, new SiteMenuComponent(filters), RenderPosition.BEFOREEND);

render(siteMainElement, new SortComponent(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListComponent();

render(siteMainElement, filmListComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmListComponent);

pageController.render(films);

const footerStatistic = document.querySelector(`.footer__statistics p`);
footerStatistic.textContent = `${films.length} movies inside`;

export {generateFilms};
