"use client";

const ButtonRounded = ({text, disabled}: {text: string, disabled?: boolean}) => {
  return (
    <button disabled={disabled} className={`px-2 max-h-[25px] base:max-h-[52px] py-[7px] text-[9px] bg-violet1 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet2 rounded-[30px] base:px-[30px] base:py-[15px] base:text-base box-border`}>
      {text}
    </button>
  )
}

export default ButtonRounded;