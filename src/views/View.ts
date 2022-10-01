import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindEvents(fragment: DocumentFragment): void {
    this.parent.innerHTML = ``;
    const eventsMap = this.eventsMap();

    for (let eventkey in eventsMap) {
      const [eventName, selector] = eventkey.split(":");

      fragment.querySelectorAll(selector).forEach((selector) => {
        selector.addEventListener(eventName, eventsMap[eventkey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];

      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }

  regionsMap(): { [key: string]: string } {
    return {};
  }
}
