"use client";

// Кнопка інпута приймає {text, disabled, onClick, style}
const ButtonNormal = ({
  text,
  disabled,
  onClick,
  style
}: {
  text: string;
  disabled?: boolean;
  onClick: () => void;
  style?: string
}) => {
  return (
    <button
      disabled={disabled}
      className={`px-4 text-[9px] py-3 bg-violet2  disabled:text-violet-200 disabled:hover:bg-violet2 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet1 rounded-md base:rounded-2xl base:px-14 base:py-7 base:text-base box-border ${style}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default ButtonNormal;
