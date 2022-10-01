import { Collection } from "../models/Collection";
import { UserList } from "./UserList";
import { User } from "../models/User";
import { UserProps } from "../models/User";

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {}

  render(): void {
    this.parent.innerHTML = ``;
    const templateElement = document.createElement("template");

    for (let model of this.collection.models) {
      let itemParent = document.createElement("div");
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    }

    this.parent.append(templateElement.content);
  }

  abstract renderItem(model: T, itemParent: Element): void;
}
