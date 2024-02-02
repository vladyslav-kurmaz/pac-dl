"use client";
import ButtonNormal from "../Button/ButtonNormal";
import ButtonRounded from "../Button/ButtonRounded";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import PacDlServices from "@/services/PacDlServices";

const Input = ({
  placeholder,
  icon,
  buttonRounded,
  buttonNormal,
  // submit,
}: {
  buttonRounded: string;
  buttonNormal: string;
  placeholder?: string;
  icon?: StaticImageData;
  // submit?: (value: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const {postUrl, getVideoInfo} = PacDlServices();

  useEffect(() => {
    validateInput(inputValue);
  }, [inputValue]);

  const validateInput = (value: string) => {
    const regExp = value.match(/^(https?|http):\/\//);

    if (regExp === null && inputValue.length !== 0) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  const getVieo = async (value: string) => {
    
    try {
      const postRequest = await getVideoInfo(value);
      console.log(await postRequest);
      
    } catch (e) {
      console.log(await e);
    }
  }

  // console.log(submit);
  

  return (
    <label
      htmlFor="mainInput"
      className="flex items-center outline-none border-[7px] base:border-[10px] border-violet1 h-12 base:h-24 relative rounded-xl"
    >
      {icon && (
        <Image
          src={icon}
          alt="icon"
          className="absolute top-1/2 left-2 base:left-7 -translate-y-1/2 w-[10px] h-[10px] base:w-[30px] base:h-[30px]"
        />
      )}
      <input
        id="mainInput"
        placeholder={placeholder}
        type="text"
        className="w-full max-h-full pl-6 pr-2 base:pl-16 rounded-2xl placeholder:text-xs text-xs base:placeholder:text-xl base:text-xl border-none outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="hidden base:block">
        <ButtonRounded text={buttonRounded} />
      </div>
      <div className="base:ml-6 relative -right-[2] base:-right-1">
        <ButtonNormal
          disabled={inputError}
          text={buttonNormal}
          onClick={() => getVieo(inputValue)}
        />
      </div>

      {inputError && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          Наш сервіс не може обробити це посилання.
        </div>
      )}
    </label>
  );
};

export default Input;
