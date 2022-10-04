import React from "react";
import style from "./ModulesCss/Loader.module.css";

export const Loader = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}></div>
    </div>
  );
};
