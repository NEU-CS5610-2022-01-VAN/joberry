import React from 'react';
import { Spin } from "antd";

export default function Loading(props) {
  return (
    <div className="loading">
      <Spin size="large" {...props}/>
    </div>
  );
}
