export class Attributes<T> {
  constructor(public data: T) {}

  get = <K extends keyof T>(dataKey: K): T[K] => {
    if (!this.data[dataKey]) {
      return;
    }
    return this.data[dataKey];
  };

  getAll(): T {
    return this.data;
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
