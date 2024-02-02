"use client";

import { dataSelect } from "@/types/types";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageChanger from "@/utils/LanguageChanger";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Select = ({
  data,
  arrowIcon,
  style,
  classes,
}: {
  data: dataSelect[];
  arrowIcon?: StaticImageData;
  style?: object;
  classes?: string;
}) => {
  const { i18n } = useTranslation();
  const [openList, setOpenList] = useState(false);
  const [currentLanguge, setCurrentLanguage] = useState(i18n.language);
  const router = useRouter();
  const currentPathname = usePathname();

  const changeLanguage = (value: string) => {
    LanguageChanger(router, currentPathname, value, currentLanguge)
    setOpenList(false)
  }

  const renderItem = (data: dataSelect[]) => {
    return data.map((item, i) => {
      const { flag, value, text } = item;
      return (
        <div
          key={i}
          className="flex relative items-center py-1"
          onClick={() => changeLanguage(value)}
        >
          <Image
            src={flag}
            alt="flag"
            onClick={() => setCurrentLanguage(value)}
            className="rounded w-6  base:w-9 base:rounded-md mr-1 base:mr-0"
          />
          <span>{text}</span>
        </div>
      );
    });
  };

  const curentItem = (data: dataSelect[]) => {
    return data.map((item, i) => {
      const { flag, value, text } = item;
      if (value === currentLanguge) {
        return (
          <div key={i} className="flex ">
            <Image
              src={flag}
              alt="flag"
              className=" rounded w-6 base:w-9 base:rounded-md mr-1 base:mr-0"
            />
            <span className="text-sm">{text}</span>
          </div>
        );
      }
    });
  };

  return (
    <div className={`relative flex justify-between items-center ${classes}`} style={style}>
      <div className=" " onClick={() => setOpenList((state) => !state)}>
        {curentItem(data)}
      </div>
      {arrowIcon && (
        <Image
          src={arrowIcon}
          onClick={(e) => setOpenList((state) => !state)}
          alt="arrow"
          style={
            openList
              ? { transform: "rotate(90deg)", transition: "all .5s" }
              : { transform: "rotate(0)", transition: "all .5s" }
          }
          className="w-7 h-7"
        />
      )}
      {openList && (
        <div className="flex z-50 absolute left-0 top-full w-full min-h-max base:min-w-max base:left-1/2 base:-translate-x-1/2 py-3 px-3 box-border bg-slate-50 bottom-0 flex-col">
          {renderItem(data)}
        </div>
      )}
    </div>
  );
};

export default Select;
