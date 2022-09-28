import { User, UserProps } from "./models/User";
import { Collection } from "./models/Collection";
import axios, { AxiosResponse } from "axios";
import { rootUrl } from "./models/User";

const user = User.buildUser({ id: 1 });

const collection = User.buildUserCollection();

collection.on("change", () => {
  console.log(collection);
});

collection.fetch();
