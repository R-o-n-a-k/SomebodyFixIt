import React from "react";
import "./Loader.css";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <>
      <ThreeDots
        visible={true}
        height="50"
        width="50"
        radius="9"
        color="#EF8354"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </>
  );
}

export default Loader;
