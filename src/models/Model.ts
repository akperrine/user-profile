import { AxiosPromise, AxiosResponse } from "axios";
import { Callback } from "./Eventing";

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface ModelAttributes<T> {
  get<K extends keyof T>(dataKey: K): T[K];
  getAll(): T;
  set(update: T): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attributes: ModelAttributes<T>
  ) {}

  fetch(): void {
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    } else {
      this.sync.fetch(id).then((response: AxiosResponse) => {
        this.set(response.data);
      });
    }
  }

  get get() {
    return this.attributes.get;
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.events.trigger("save");
      })
      .catch(() => {
        console.log(`error`);
      });

    this.events.trigger("saved");
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
}
