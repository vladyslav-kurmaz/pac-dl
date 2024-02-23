"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ButtonThreeState from "../Button/ButtonThreeState";
import { useState, useEffect } from "react";
import PacDlServices from "@/services/PacDlServices";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Spinner from "@/components/spiner/spiner";

import notFound from "@/assets/image/error/image_not_found.webp";
import { SimilarVideo } from "@/types/types";

const TopVideo = ({
  day,
  week,
  month,
  catalogue,
  topError,
  titleNotFound,
}: {
  day: string;
  week: string;
  month: string;
  catalogue: string;
  topError: string;
  titleNotFound: string;
}) => {
  const [active, setActive] = useState(day);
  const [dataTop, setTopData] = useState<SimilarVideo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { getTopVideo } = PacDlServices();
  const router = useRouter();
  const { t } = useTranslation("catalogue");

  useEffect(() => {
    if (active === day) {
      getTopData("day");
    } else if (active === week) {
      getTopData("week");
    } else {
      getTopData("month");
    }
  }, [active]);

  const getTopData = async (active: string) => {
    setLoading(true);
    const screenWidth = window.screen.width;
    setTopData(null);
    if (screenWidth > 1200) {
      try {
        const getTop = await getTopVideo(active, 8, 1);
        setTopData(await getTop.results);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    } else {
      try {
        const getTop = await getTopVideo(active, 4, 1);
        setTopData(await getTop.results);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };

  const renderTopVideo = (dataTop: SimilarVideo[]) => {
    return dataTop?.length > 0 ? (
      dataTop?.map((item, i) => {
        const { title, preview_url, video_url, description } = item;
        const titlePrev =
          title?.length > 0
            ? title?.length > 49
              ? `${title?.slice(0, 50)}...`
              : title
            : description
            ? description?.slice(0, 51)
            : titleNotFound;

        return (
          <Link
            href={`/download?url=${video_url}`}
            onClick={() => {
              localStorage.removeItem("error500");
              // router.push(`/download?url=${video_url}`);
            }}
            className="flex flex-col items-center  cursor-pointer"
            key={i}
          >
            {preview_url ? (
              <Image
                src={preview_url}
                width={1000}
                height={1000}
                alt={title}
                className="w-[166px] object-contain h-[92px] base:w-[219px] base:h-[130px] lg:w-[269px] lg:h-[150px] mb-2 rounded-[16px] md:mb-2"
              />
            ) : (
              <Image
                src={notFound}
                alt={"image not found"}
                className="w-[166px] h-[92px] object-contain base:w-[219px] base:h-[130px] lg:w-[269px] lg:h-[150px] mb-2 rounded-[16px] md:mb-0 "
                width={1000}
                height={1000}
              />
            )}
            <div className="text-[9px] md:text-[12px] base:text-[14px] lg:text-[16px] lg:max-w-[265px]  max-w-[165px] text-center">
              {titlePrev}
            </div>
          </Link>
        );
      })
    ) : (
      <div className="text-[9px] md:text-[24px] base:h-[240px] h-[200px] w-full lg:max-w-[505px] max-w-[265px] mb-3 flex items-center justify-center text-center">
        {topError}
      </div>
    );
  };

  return (
    <div className="">
      <div className="flex mb-3 base:mb-6">
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

      <div
        className={` ${
          dataTop && dataTop?.length > 0
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sml:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center"
            : "flex flex-wrap justify-center"
        }`}
      >
        {loading && (
          <div className="base:h-[440px] w-full h-[340px] flex justify-center items-center">
            <Spinner />
          </div>
        )}
        {dataTop !== null && renderTopVideo(dataTop)}
      </div>

      <Link
        href={"/catalogue?tag=All+video&page=1"}
        className="mt-3 flex items-center justify-end text-xs base:text-[22px]"
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
