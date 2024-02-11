"use client";
import ButtonNormal from "../Button/ButtonNormal";
import ButtonRounded from "../Button/ButtonRounded";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PacDlServices from "@/services/PacDlServices";
import { useRouter, useSearchParams } from "next/navigation";
import { DataVideo } from "@/types/types";

const Input = ({
  placeholder,
  icon,
  buttonRounded,
  buttonNormal,
  getProps,
  setLoading,
  loading,
  data,
  setVideoData,
}: {
  buttonRounded: string;
  buttonNormal: string;
  placeholder?: string;
  icon?: StaticImageData;
  getProps?: (props: object) => void;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  loading?: boolean;
  data: DataVideo | null;
  setVideoData: Dispatch<SetStateAction<DataVideo | null>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [error500, setError500] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const url = searchParams.get("url");

  useEffect(() => {
    validateInput(inputValue);
  }, [inputValue]);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("error500")) {
      setError500(true);
    } else {
      setError500(false);
    }
  }, []);

  useEffect(() => {
    if (typeof url === "string") {
      setVideoData(null);
      getVideo(url);
      setInputValue(url);
    } else {
      // router.push(`/`);
    }
  }, [url]);

  const validateInput = (value: string) => {
    const regExp = value.match(/^(https?|http):\/\//);

    if (regExp === null && inputValue.length !== 0) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  const getVideo = async (value: string) => {
    router.push(`/download?url=${value}`);
  };

  return (
    <label
      htmlFor="mainInput"
      className="flex items-center outline-none border-[6px] base:border-[10px] border-violet1 h-12 base:h-24 relative rounded-[30px]"
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
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        className="w-full max-h-full pl-6 pr-2 base:pl-16 rounded-2xl placeholder:text-xs text-xs base:placeholder:text-xl base:text-xl border-none outline-none"
        value={inputValue}
        onChange={(e) => {
          setError500(false);
          localStorage.removeItem("error500");
          setInputValue(e.target.value);
        }}
      />
      <div className="hidden base:block">
        <ButtonRounded
          disabled={loading || inputError}
          onClick={async () => {
            setError500(false);
            localStorage.removeItem("error500");
            setInputValue(await navigator.clipboard.readText());
          }}
          text={buttonRounded}
        />
      </div>
      <div className="base:ml-6 relative ">
        <ButtonNormal
          disabled={loading || inputError}
          text={buttonNormal}
          onClick={() => getVideo(inputValue)}
        />
      </div>

      {error500 && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          Сталася технічна проблема спробуйте пізніше
        </div>
      )}

      {inputError && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          Наш сервіс не може обробити ці дані.
        </div>
      )}
    </label>
  );
};

export default Input;
