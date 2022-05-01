import React, { useEffect } from "react";
import { PostItem, Searchbar, Loading } from "@/components";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";
import { useParams } from "react-router-dom";
import { Empty } from "antd";

const SearchResult = observer(() => {
  const { postStore } = useStoreAndAuth();
  const search = useParams();

  useEffect(() => {
    postStore.searchPost(search);
    return () => {};
  }, [search]);
  const { postList } = postStore;

  const berryCallback = () => postStore.searchPost(search);

  return (
    <>
      <div className="mg-t-12">
        <h3
          className="color-berry-100"
          style={{ margin: "4vh", textAlign: "center" }}
        >
          Search Result
        </h3>
        <div className=" justify-center">
          <Searchbar
            style={{
              border: "1px solid white",
              borderRadius: "10vw",
              marginBottom: "5vh",
              marginTop: "2vh",
              height: "5vh",
              width: "40vw",
            }}
            size="large"
          />
        </div>
      </div>
      {postList.length > 0 && (
        <div className="white-container mg-t-12">
          {postStore.loading ? (
            <Loading />
          ) : (
            postList.map((item) => (
              <PostItem
                post={item}
                key={item.id}
                berryCallback={berryCallback}
              />
            ))
          )}
        </div>
      )}
      {postList.length === 0 && (
        <div
          style={{
            height: "30vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty
            description={
              <div className="fz-18 color-base-80">
                No result, try something else!
              </div>
            }
          ></Empty>
        </div>
      )}
    </>
  );
});

export default SearchResult;
