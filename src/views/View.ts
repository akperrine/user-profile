import { Model } from "../models/Model";

export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  bindModel() {
    this.model.on("change", () => {
      this.render();
    });
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

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

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
