import {createFilmTemplate} from './components/film.js';
import {createFilmListTemplate} from './components/film-list.js';
import {createFilmListExtraTemplate} from './components/film-list-extra.js';
import {createPopupTemplate} from './components/popup.js';
import {createShowMoreButton} from './components/show-more-button.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createUserRank} from './components/user-rank.js';

const FILM_CARD_COUNT = 5;
const FILM_LIST_EXTRA_COUNT = 2;
const FILM_CARD_EXTRA_COUNT = 2;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRank());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createFilmListTemplate());

const filmSection = document.querySelector(`.films`);
const filmListMain = siteMainElement.querySelector(`.films-list`);
const filmListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(filmListContainer, createFilmTemplate());
}

render(filmListMain, createShowMoreButton());

for (let i = 0; i < FILM_LIST_EXTRA_COUNT; i++) {
  render(filmSection, createFilmListExtraTemplate());
}

const filmListContainerExtra = filmSection.querySelectorAll(`.films-list--extra .films-list__container`);

filmListContainerExtra.forEach((container) => {
  for (let i = 0; i < FILM_CARD_EXTRA_COUNT; i++) {
    render(container, createFilmTemplate());
  }
});

const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, createPopupTemplate());
