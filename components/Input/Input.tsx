"use client";
import ButtonNormal from "../Button/ButtonNormal";
import ButtonRounded from "../Button/ButtonRounded";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PacDlServices from "@/services/PacDlServices";
import { useRouter, useSearchParams } from "next/navigation";
import { DataVideo } from "@/types/types";
import { useTranslation } from "react-i18next";

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
  errors,
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
  errors: string[];
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);
  const [error500, setError500] = useState(false);
  const [required, setRequired] = useState(false);
  const [errorNotFindVideo, setErrorNotFindVideo] = useState(false);
  const [errorLongRequest, setErrorLongRequest] = useState(false);
  const [errorDontSupport, setErrorDontSupport] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const url = searchParams.get("url");

  console.log();

  useEffect(() => {
    validateInput(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setTimeout(() => localStorage.clear(), 10000);

    if (typeof window !== "undefined" && localStorage.getItem("error500")) {
      setError500(true);
    } else {
      setError500(false);
    }

    if (
      typeof window !== "undefined" &&
      localStorage.getItem("errorNotFindVideo")
    ) {
      setErrorNotFindVideo(true);
    } else {
      setErrorNotFindVideo(false);
    }

    if (
      typeof window !== "undefined" &&
      localStorage.getItem("errorLongRequest")
    ) {
      setErrorLongRequest(true);
    } else {
      setErrorLongRequest(false);
    }

    if (
      typeof window !== "undefined" &&
      localStorage.getItem("errorDontSupport")
    ) {
      setErrorDontSupport(true);
    } else {
      setErrorDontSupport(false);
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
    if (value.length === 0) {
      setRequired(true);
    } else {
      router.push(`/download?url=${value}`);
    }
  };

  return (
    <label
      htmlFor="mainInput"
      className="flex items-center outline-none border-[6px] base:border-[10px] border-violet1 h-12 base:h-24 relative rounded-[12px] base:rounded-[30px]"
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
          setRequired(false);
          setErrorNotFindVideo(false);
          setErrorDontSupport(false);
          localStorage.removeItem("error500");
          localStorage.removeItem("errorNotFindVideo");
          localStorage.removeItem("errorLongRequest");
          localStorage.removeItem("errorDontSupport");
          setInputValue(e.target.value);
        }}
      />
      <div className="hidden base:block">
        <ButtonRounded
          disabled={loading || inputError}
          onClick={async () => {
            setError500(false);
            setRequired(false);
            setErrorNotFindVideo(false);
            setErrorDontSupport(false);
            localStorage.removeItem("error500");
            localStorage.removeItem("errorNotFindVideo");
            localStorage.removeItem("errorLongRequest");
            localStorage.removeItem("errorDontSupport");
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

      {required && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          {errors[0]}
        </div>
      )}

      {error500 && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          {errors[1]}
        </div>
      )}

      {inputError && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          {errors[2]}
        </div>
      )}

      {errorNotFindVideo && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          {errors[3]}
        </div>
      )}

      {errorLongRequest && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          {errors[4]}
        </div>
      )}
      {errorDontSupport && (
        <div className="absolute base:-bottom-9 -bottom-7 text-rose-600 text-xs base:text-base left-0">
          {errors[5]}
        </div>
      )}
    </label>
  );
};

export default Input;
