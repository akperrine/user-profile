import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
  constructor(public collection: Collection<T, K>) {}

  render(): void {}

  template(): string {
    return ``;
  }

  abstract renderItem(): void;
}
