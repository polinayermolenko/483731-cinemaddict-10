import AbstractComponent from './abstract-component.js';

const createFilmsContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmList extends AbstractComponent {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
