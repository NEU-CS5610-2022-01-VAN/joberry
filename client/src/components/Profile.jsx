import React, { useState } from "react";
import { ProfileHeader, ActivityRecord } from "@/components";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const tabs = [
  { key: "0", name: "Activities" },
  { key: "1", name: "Posts" },
  { key: "2", name: "Berries" },
  { key: "3", name: "Comments" },
];

const Profile = (props) => {

  const { user, activity } = props;
  const [key, setKey] = useState("0");
  const displayRecords = key === "0" ? activity : activity.filter(item => item.type === parseInt(key));
  return (
    <div>
      <ProfileHeader user={user} />
      <div className="white-container mg-t-12">
        <Tabs activeKey={key} onChange={setKey}>
          {tabs.map((item) => (
            <TabPane tab={item.name} key={item.key}>
              {displayRecords.map((item) => (
                <ActivityRecord activity={item} key={item.id} />
              ))}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
