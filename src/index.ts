import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserForm } from "./views/UserForm";
import { UserShow } from "./views/UserShow";

const user = User.buildUser({ name: "Perrine", age: 20 });

const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();

  console.log(userEdit);
} else {
  throw new Error("root element not found");
}
