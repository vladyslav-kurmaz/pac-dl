"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ButtonThreeState from "../Button/ButtonThreeState";
import { useState, useEffect } from "react";
import PacDlServices from "@/services/PacDlServices";

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
  const [dataTop, setTopData] = useState([]);
  const { getTopVideo } = PacDlServices();

  useEffect(() => {
    if (active === day) {
      getTopData('day');
    } else if (active === week) {
      getTopData('week');
    } else {
      getTopData('month');
    }

    
    console.log(dataTop);
  }, [active]);

  const getTopData = async (active: string) => {
    const screenWidth = window.screen.width;
    if (screenWidth > 1000) {
      try {
        const getTop = await getTopVideo(active, 8, 1);
        setTopData(await getTop);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const getTop = await getTopVideo(active, 4, 1);
        setTopData(await getTop);
      } catch (e) {
        console.error(e);
      }
    }
  };

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
