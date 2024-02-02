"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ButtonThreeState from "../Button/ButtonThreeState";
import { useState } from "react";

const TopVideo = ({
  day,
  week,
  month,
  catalogue,
}: {
  day: string;
  week: string;
  month: string;
  catalogue: string;
}) => {
  const [active, setActive] = useState(day);
  const getData = () => {};

  return (
    <div className="">
      <div className="flex jus">
        <div className="mr-2 base:mr-6">
          <ButtonThreeState
            text={day}
            activeB={active}
            setActiveB={setActive}
          />
        </div>
        <div className="mr-2 base:mr-6">
          <ButtonThreeState
            text={week}
            activeB={active}
            setActiveB={setActive}
          />
        </div>
        <div className="mr-2 base:mr-6">
          <ButtonThreeState
            text={month}
            activeB={active}
            setActiveB={setActive}
          />
        </div>
      </div>

      <div className=""></div>

      <Link
        href={"/catalogue"}
        className="flex items-center justify-end text-xs base:text-[22px]"
      >
        {catalogue}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 base:ml-5 w-3 h-3 base:w-[20px] base:h-[18px]"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path d="M0 10H20M20 10L11 1M20 10L11 19" stroke="#1C1917" />
        </svg>
      </Link>
    </div>
  );
};

export default TopVideo;
