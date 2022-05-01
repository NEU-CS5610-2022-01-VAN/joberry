import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Profile } from "@/components";
import { useParams } from "react-router-dom";
import { useStoreAndAuth } from "@/utils";

const UserDetail = observer(() => {
  const { id } = useParams();
  const { userStore } = useStoreAndAuth();
  const { otherUserDetail } = userStore;

  useEffect(() => {
    userStore.getUserDetail(id);
    return () => {};
  }, []);
  const post = {
    id: 1,
    body: "awiefuyaw",
    title: "awefcaw",
  };
  const activity = [{ id: 1, otherUserDetail, post, type: 1 }];
  return (
    <div>
      <Profile user={otherUserDetail} activity={activity} />
    </div>
  );
});

export default UserDetail;
