"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const ButtonCategories = ({
  text,
  disabled,
  onClick,
  name,
  active,
  setActive
}: {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  name?: string;
  active?: string;
  setActive?: Dispatch<SetStateAction<string>>;
}) => {

  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    if (active === name) {
      // setButtonActive(true)
    }
  }, [active])


  return (
    <button
      disabled={disabled}
      className={`px-2 text-[9px] py-[7px]  disabled:text-violet-200 disabled:hover:bg-violet2 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-slate-200 rounded-[30px] base:px-[15px] base:py-[15px] base:text-base box-border ${active === name ? 'bg-violet2': ''}`}
      onClick={() => {
        onClick()
        name && setActive && setActive(name);
      }}
    >
      {text}
    </button>
  );
};

export default ButtonCategories;
