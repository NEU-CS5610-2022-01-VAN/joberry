import React from 'react';
import { Empty, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return (
      <div style={{height:"70vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Empty description={<div className="fz-18 color-base-80">Opps... 404 Not Found!</div>}>
          <Button
            shape="round"
            type="primary"
            size="large"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Empty>
      </div>
    );
}

export default NotFound