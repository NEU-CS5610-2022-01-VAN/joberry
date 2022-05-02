import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";
import { PostItem } from "@/components";
import { Avatar } from "antd";

const team = [
  {
    name: "Chenru Wu",
    link: "https://www.linkedin.com/in/chenru-wu-542a1a1a9/",
    src: "https://media-exp1.licdn.com/dms/image/C5603AQGh0HnzNotU9A/profile-displayphoto-shrink_800_800/0/1627569588969?e=1657152000&v=beta&t=nmNYMbW5Ofd9jhgQlvTeTyCG0Nu7HVsteERfh4P80GQ",
  },
  {
    name: "Xinyi Ren",
    link: "https://www.linkedin.com/in/xinyi-ren-31613362/",
    src: "https://media-exp1.licdn.com/dms/image/C5603AQHkK7H05Ch0-g/profile-displayphoto-shrink_800_800/0/1517593885701?e=1657152000&v=beta&t=SOlgPR_PH5ihpkBPZaNXsE-TIKKb7f5buRXKsMCeqGM",
  },
  {
    name: "Xiaoben Yin",
    link:"https://www.linkedin.com/in/teresa-yin/",
    src: "https://media-exp1.licdn.com/dms/image/D5635AQHg1stKAesO2w/profile-framedphoto-shrink_800_800/0/1643077057984?e=2147483647&v=beta&t=yaRQomxs_AbZWgFQtHqGJ9M3kZIezJzbN7CbeJIzhnY",
  },
];

const Discover = observer(() => {
  const { postStore } = useStoreAndAuth();
  useEffect(() => {
    postStore.getHotCommentPosts();
    postStore.getHotBerryPosts();
  }, []);

  return (
    <div>
      <div className="space-between mg-b-20">
        <div className="white-container mg-r-20">
          <h4 className="color-berry-100">
            HOT
            <span className="mg-l-4 mg-r-12" aria-label="hot" role="img">
              🔥
            </span>
            THIS WEEK
          </h4>
          {postStore.hotCommentPosts.map((post) => (
            <PostItem
              post={post}
              key={post.id}
              className="discover-post-item"
              berryCallback={postStore.getHotCommentPosts}
            />
          ))}
        </div>
        <div className="white-container">
          <div className="align-center">
            <h4 className="color-berry-100">
              MOST BERRIES
              <span className="mg-l-4 mg-r-12" aria-label="berry" role="img">
                🍓
              </span>
              THIS WEEK
            </h4>
          </div>
          {postStore.hotBerryPosts.map((post) => (
            <PostItem
              post={post}
              key={post.id}
              className="discover-post-item"
              berryCallback={postStore.getHotBerryPosts}
            />
          ))}
        </div>
      </div>
      <div
        className="white-container"
        style={{
          padding: "5vw",
          boxSizing: "border-box",
          marginBottom: "10vw",
        }}
      >
        <h4 className="color-berry-100" style={{ textAlign: "center" }}>
          MEET THE TEAM
        </h4>
        <div className="space-around cursor-pointer mg-t-40">
          {team.map(({ src, name, link }) => (
            <div key={name} onClick={() => window.open(link)}>
              <Avatar size={72} src={src} alt={name} />
              <div className="mg-t-12 bold">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Discover;
