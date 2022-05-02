import React, { useState } from "react";
import { Input } from "antd";
import { Icon } from "@/components";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const Searchbar = observer((props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const makeSearch = () => {
    keyword && navigate(`/search/${keyword}`);
    setKeyword("");
  };

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
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={makeSearch}
      />
    </>
  );
});

export default Searchbar;
