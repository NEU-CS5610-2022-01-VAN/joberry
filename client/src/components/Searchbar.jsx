import React, { useState } from "react";
import { Input } from "antd";
import { Icon } from "@/components";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const Searchbar = observer((props) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const makeSearch = () => navigate(`/search/${keyword}`);
  return (
    <>
      <Input
        placeholder="Search for posts"
        className="mg-r-12"
        suffix={
          <Icon
            className="cursor-pointer"
            onClick={makeSearch}
            type="icon-search"
          />
        }
        onChange={(e) => setKeyword(e.target.value)}
        onPressEnter={makeSearch}
        {...props}
      />
    </>
  );
});

export default Searchbar;