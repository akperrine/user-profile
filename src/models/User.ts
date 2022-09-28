import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";
import { Eventing } from "./Eventing";
import { Model } from "./Model";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

export const rootUrl = "http://localhost:3000/users";
const buildUserInstance = (json: UserProps): User => User.buildUser(json);

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps) {
    return new User(
      new Eventing(),
      new ApiSync<UserProps>(rootUrl),
      new Attributes<UserProps>(attrs)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection(rootUrl, buildUserInstance);
  }

  //   get fullName() {
  //     const name = this.get("id");
  //     return console.log(name);
  //   }
}
