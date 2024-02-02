"use client";

import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";

const ButtonThreeState = ({
  text,
  disabled,
  activeB,
  click,
  setActiveB
}: {
  text: string;
  disabled?: boolean;
  activeB?: string;
  click?: () => {}
  setActiveB?: Dispatch<SetStateAction<string>>
}) => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    if(activeB === text) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [activeB])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;     
    
    if (target.name !== activeB) {

      setActiveB && setActiveB(text)

    } 
    click && click();


  }
  
  return (
    <button
      disabled={disabled}
      className={`px-2 max-h-[25px] base:max-h-[52px] py-[7px] text-[9px]  hover:bg-violet1 transition-all duration-500 hover:transition-all hover:duration-500 rounded-[30px] base:px-[30px] base:py-[15px] base:text-base box-border ${active ? 'bg-violet2' : 'bg-slate-200'}`}
      onClick={(e) => handleClick(e)}
      name={text}
    >
      {text}
    </button>
  );
};

export default ButtonThreeState;
