import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { Icon } from "@/components";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";

const Searchbar = observer((props) => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [keyword, setKeyword] = useState("");
  const makeSearch = () => {
    keyword && navigate(`/search/${keyword}`);
  };
  useEffect(() => {
    if (search) {
      setKeyword(search);
    } else {
      setKeyword("");
    }
    return () => {};
  }, [search]);

  return (
    <>
      <Input
        {...props}
        placeholder="Search for posts"
        suffix={
          <Icon
            className="cursor-pointer mg-r-8"
            onClick={makeSearch}
            type="icon-search"
          />
        }
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={makeSearch}
      />
    </>
  );
});

export default Searchbar;
