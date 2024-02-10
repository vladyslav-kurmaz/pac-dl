"use client";

const ButtonRounded = ({
  text,
  disabled,
  style,
  onClick
}: {
  text: string;
  disabled?: boolean;
  style?: string;
  onClick?: () => void
}) => {
  return (
    <button
      disabled={disabled}
      className={`px-2 max-h-[25px] disabled:text-violet-100 disabled:hover:bg-violet-100 base:max-h-[52px] py-[7px] text-[9px] bg-violet1 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet2 rounded-[30px] base:px-[30px] base:py-[15px] base:text-base box-border ${style}`}
      onClick={() => onClick && onClick()}
 
    >
      {text}
    </button>
  );
};

export default ButtonRounded;
