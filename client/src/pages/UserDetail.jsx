import React from "react";
import { observer } from "mobx-react";
import { Profile } from "@/components";

const user = {
  id: 1,
  name: "wcr",
  email: "wcrzrz@gmail.com",
  about:
    "Student @ Northeastern University\n I am an idiot as you might know.\n I wish I could be a Lannister.",
};
const post = {
  id: 1,
  body: "awiefuyaw",
  title: "awefcaw",
};
const activity = [{ id: 1, user, post, type: 1 }];

const UserDetail = observer(() => {
  return <Profile user={user} activity={activity} />;
});

export default UserDetail;
