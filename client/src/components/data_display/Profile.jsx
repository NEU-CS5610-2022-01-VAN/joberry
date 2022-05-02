import React, { useState } from "react";
import { ProfileHeader, ActivityRecord, Loading } from "@/components";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const tabs = [
  { key: "0", name: "Activities" },
  { key: "1", name: "Posts" },
  { key: "2", name: "Berries" },
  { key: "3", name: "Comments" },
];

const actions = ["", "created a new post", "gave a berry to", "commented on"];

const Profile = (props) => {
  let { user, activity, goToProfile, loading } = props;
  let [key, setKey] = useState("0");
  activity =
    key === "0"
      ? activity
      : activity.filter((item) => item.type === parseInt(key));
  const displayRecords =
    activity &&
    activity.map((record) => ({
      time: record.createdAt,
      action: actions[record.type],
      ...record,
    }));
  
  return (
    <div>
      <ProfileHeader user={user} goToProfile={goToProfile} />

      <div className="white-container mg-t-12">
        {loading ? (
          <Loading />
        ) : (
          <Tabs activeKey={key} onChange={setKey}>
            {tabs.map((item) => (
              <TabPane tab={item.name.toUpperCase()} key={item.key}>
                {displayRecords &&
                  displayRecords.map((item) => (
                    <ActivityRecord activity={item} key={item.id} berryCallback={props.berryCallback} />
                  ))}
              </TabPane>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Profile;
