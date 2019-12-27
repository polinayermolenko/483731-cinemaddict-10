import AbstractComponent from './abstract-component.js';

const createFilmListTemplate = () => {
  return (
    `<section class="films">
       <section class="films-list"></section>
     </section>`
  );
};

export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmListTemplate();
  }
}
