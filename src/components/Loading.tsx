import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loading({ width = 18 }: { width?: number }) {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="3"
      animationDuration="0.75"
      width={`${width}`}
      visible={true}
    />
  );
}

export default Loading;
