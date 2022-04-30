import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";
import { Icon } from "@/components";
import { Input, Button } from "antd";

const ProfileTerm = observer(({ term }) => {
  const { userStore } = useStoreAndAuth();
  const { userProfile } = userStore;
  const cannotModify = term === "email";
  const termClassName = cannotModify ? "color-base-60" : "";
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(userProfile[term]);

  const confirmEdit = ()=> {
    userStore.updateProfileTerm(term, content);
    userStore.updateProfile().then(()=> {
      setEditing(false);
      setContent(userProfile[term])
    });
  }

  const cancelEdit = () => {
    setContent(userProfile[term]);
    setEditing(false);
  }

  return (
    <div
      className="align-center"
      style={{
        borderBottom: "1px solid #f5f5f5",
        lineHeight: "10vh",
        width: "40vw",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={"bold " + termClassName} style={{ width: "15vw" }}>
        {term.toUpperCase()}
      </div>
      {!editing ? (
        <div className={termClassName}>
          {userProfile[term] || "Not specified"}
        </div>
      ) : (
        <div className="align-center">
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
          <Button type="link" size="small" onClick={confirmEdit}>Confirm</Button>
          <Button type="link" size="small" onClick={cancelEdit}>Cancel</Button>
        </div>
      )}

      {!cannotModify && hovered ? (
        <div
          className="mg-l-24 cursor-pointer"
          onClick={() => setEditing(true)}
        >
          <Icon type="icon-edit" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

export default ProfileTerm;
