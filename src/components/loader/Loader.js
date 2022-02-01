import React from "react";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (<div class="loader-container">
    <div class="loader-child">
      <Rings color="#00BFFF" height={150} width={150} />
    </div>
  </div>
  );
};
export default Loader;
