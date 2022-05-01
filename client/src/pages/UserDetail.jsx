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

  return (
    <div>
      <Profile user={otherUserDetail} activity={otherUserDetail.activities} />
    </div>
  );
});

export default UserDetail;
