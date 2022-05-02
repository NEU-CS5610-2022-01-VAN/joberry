import React from 'react';
import { Spin } from "antd";

export default function Loading(props) {
  const {className, ...otherProps} = props
  return (
    <div className={`loading ${className}`}>
      <Spin size="large" {...otherProps} />
    </div>
  );
}
