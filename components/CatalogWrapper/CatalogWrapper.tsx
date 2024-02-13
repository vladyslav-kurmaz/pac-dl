"use client";

import PacDlServices from "@/services/PacDlServices";

import CatalogTags from "../CatalogTags/CatalogTags";
import { useEffect, useState } from "react";
import { SimilarVideo, TopTag } from "@/types/types";
import { useTranslation } from "react-i18next";
import CatalogVideo from "../CatalogVideo/CatalogVideo";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CatalogWrapper = () => {
  const { t } = useTranslation("catalogue");
  const [popularTag, setPopularTag] = useState<null | TopTag[]>(null);
  const [activeTag, setActiveTag] = useState(t("allVideo"));
  const [activeVideoOffset, setActiveVideoOffset] = useState(24);
  const [videoData, setVideoData] = useState<SimilarVideo[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const { getPopuliarTags, getAllVideo } = PacDlServices();

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    const screenWidth = window.screen.width;
    if (screenWidth > 1200) {
      setActiveVideoOffset(24);
    } else {
      setActiveVideoOffset(10);
    }
  }, []);

  useEffect(() => {
    console.log(videoData);
  }, [videoData]);

  useEffect(() => {
    console.log(activeTag === "allVideo");

    if (activeTag === t("allVideo")) {
      console.log(1);

      getAllCatalogueVideo(activeVideoOffset, currentPage);
    }
  }, [activeTag]);

  const getTags = async () => {
    try {
      const popularTags = await getPopuliarTags();

      setPopularTag(await popularTags);
    } catch (e) {
      console.error(e);
    }
  };

  const getAllCatalogueVideo = async (offset: number, currentPage: number) => {
    try {
      const popularVideo = await getAllVideo(offset, currentPage);
      setVideoData(await popularVideo.results);
      setAllPages(
        (await popularVideo.count) / offset < 1
          ? 1
          : Math.ceil(popularVideo.count / offset)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const renderPagination = () => {
    // if (currentPage <= allPages) {
    //   return <div className="base:text-base text-[9px]">{currentPage}</div>;
    // }

    return (
      <div className="flex w-full  items-center justify-around ">
        <div className="base:text-base text-[9px] cursor-pointer" onClick={() => setCurrentPage(currentPage)}>{currentPage}</div>
        <div className="base:text-base text-[9px] cursor-pointer" onClick={() => setCurrentPage(currentPage === allPages ? allPages : currentPage + 1)}>{currentPage + 1}</div>
        <div className="base:text-base text-[9px]">...</div>
        <div className="base:text-base text-[9px] cursor-pointer" onClick={() => setCurrentPage(allPages)}>{allPages}</div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="mb-5 base:mb-24">
        {popularTag !== null ? (
          <CatalogTags
            tags={popularTag}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            allVideo={t("allVideo")}
          />
        ) : null}
      </div>

      <div className="flex flex-wrap justify-between mb-[27px] base:mb-[54px] small:justify-center sm:justify-between">
        {videoData && videoData !== null ? (
          <CatalogVideo videoData={videoData} />
        ) : null}
      </div>

      <div className="">
        <div className="ml-auto flex base:w-[240px] w-[150px] justify-between items-center base:mb-[57px] mb-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="40"
            // height="40"
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className={`base:w-10 base:h-10 w-7 h-7 ${
              currentPage === allPages ? "opacity-50" : ""
            }}`}
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              cy="20"
              className="hover:fill-violet-200 transition-all duration-500 hover:transition-all hover:duration-500"
              r="20"
              transform="rotate(180 20 20)"
              fill="#E2E8F0"
            />
            <path
              d="M25.0912 14.0912L13.7775 25.4049M13.7775 25.4049L13.7775 15.2225M13.7775 25.4049L23.9598 25.4049"
              stroke="#1C1917"
            />
          </svg>
          {renderPagination()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="40"
            // height="40"
            className="base:w-10 base:h-10 w-7 h-7 "
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle
              cx="20"
              className="hover:fill-violet-200 transition-all duration-500 hover:transition-all hover:duration-500"
              cy="20"
              r="20"
              fill="#E2E8F0"
            />
            <path
              d="M14.9088 25.9088L26.2225 14.5951M26.2225 14.5951L26.2225 24.7775M26.2225 14.5951L16.0402 14.5951"
              stroke="#1C1917"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CatalogWrapper;
