import React, { useEffect } from "react";
import { PostItem } from "@/components";
import { Searchbar } from "@/components";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";
import { useParams } from "react-router-dom";

const SearchResult = observer(() => {
  const { postStore } = useStoreAndAuth();
  const search = useParams();
  useEffect(() => {
   postStore.searchPost(search)
    return () => {};
  }, [search]);
  return (
    <>
      <div className="mg-t-12">
        <Searchbar style={{ border:"1px solid white", borderRadius:"10vw", marginTop:"5vh", marginBottom:"5vh" }} size="large"
/>
      </div>
      <div className="white-container mg-t-12">
        {postStore.postList.map((item) => (
          <PostItem post={item} key={item.id} />
        ))}
      </div>
    </>
  );
});

export default SearchResult;
