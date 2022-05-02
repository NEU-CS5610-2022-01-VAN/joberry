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
  const berryCallback = () => userStore.getUserDetail(id);
  return (
    <div>
      <Profile loading={userStore.loading} user={otherUserDetail} activity={otherUserDetail.activities} berryCallback={berryCallback} />
    </div>
  );
});

export default UserDetail;
