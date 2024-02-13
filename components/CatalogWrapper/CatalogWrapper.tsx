"use client";

import PacDlServices from "@/services/PacDlServices";

import CatalogTags from "../CatalogTags/CatalogTags";
import { useEffect, useState } from "react";
import { SimilarVideo, TopTag } from "@/types/types";
import { useTranslation } from "react-i18next";
import CatalogVideo from "../CatalogVideo/CatalogVideo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingCatalogueVideos from "../LoadingSkeleton/LoadingCatalogueVideos";
import LoadingCatalogueTags from "../LoadingSkeleton/LoadingCatalogueTags";

const CatalogWrapper = () => {
  const { t } = useTranslation("catalogue");
  const [popularTag, setPopularTag] = useState<null | TopTag[]>(null);
  const [activeTag, setActiveTag] = useState(t("allVideo"));
  const [activeVideoOffset, setActiveVideoOffset] = useState(24);
  const [videoData, setVideoData] = useState<SimilarVideo[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const { getPopuliarTags, getAllVideo, getFilterVideo } = PacDlServices();
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(false);

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

  // useEffect(() => {
  //   console.log(videoData);
  // }, [videoData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  useEffect(() => {
    getAllCatalogueVideo(activeVideoOffset, currentPage, activeTag);
  }, [activeTag, currentPage]);

  const getTags = async () => {
    try {
      const popularTags = await getPopuliarTags();

      setPopularTag(await popularTags);
    } catch (e) {
      console.error(e);
    }
  };

  const getAllCatalogueVideo = async (
    offset: number,
    currentPage: number,
    activeTag: string
  ) => {
    try {
      const popularVideo =
        activeTag === t("allVideo")
          ? await getAllVideo(offset, currentPage)
          : await getFilterVideo(activeTag, offset, currentPage);
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
    return (
      <div className="flex w-full  items-center justify-around ">
        <div
          className="base:text-base text-[9px] cursor-pointer"
          onClick={() => setCurrentPage(currentPage)}
        >
          {currentPage}
        </div>
        <div
          className="base:text-base text-[9px] cursor-pointer"
          onClick={() =>
            setCurrentPage(
              currentPage === allPages ? allPages : currentPage + 1
            )
          }
        >
          {currentPage === allPages ? "" : currentPage + 1}
        </div>
        <div className="base:text-base text-[9px]">...</div>
        <div
          className="base:text-base text-[9px] cursor-pointer"
          onClick={() => setCurrentPage(allPages)}
        >
          {allPages}
        </div>
      </div>
    );
  };

  const renderTags =
    !loadingTags && popularTag !== null ? (
      <CatalogTags
        tags={popularTag}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        allVideo={t("allVideo")}
      />
    ) : (
      <LoadingCatalogueTags />
    );

  const renderVideos =
    !loadingVideos && videoData !== null && videoData.length !== 0 ? (
      <CatalogVideo videoData={videoData} />
    ) : (
      <LoadingCatalogueVideos count={activeVideoOffset} />
    );

  const renderVideoMessage =
    !loadingVideos && videoData !== null && videoData.length === 0 ? (
      <div className="text-[13px] base:text-2xl h-[200px] base:h-[400px] flex items-center justify-center">
        {t("not-video")}
      </div>
    ) : null;

  return (
    <div className="">
      <div className="mb-5 base:mb-24">{renderTags}</div>

      <div className="flex flex-wrap justify-between mb-[27px] base:mb-[54px] small:justify-center sm:justify-between">
        {/* {videoData && videoData !== null ? (
          <CatalogVideo videoData={videoData} />
        ) : null} */}
        {renderVideoMessage}
        {renderVideos}
      </div>

      <div className="">
        {/* <div className="ml-auto flex base:w-[240px] w-[150px] justify-between items-center base:mb-[57px] mb-7"> */}
          {loadingVideos ? null : (
            <div className="ml-auto flex base:w-[240px] w-[150px] justify-between items-center base:mb-[57px] mb-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
                }}
                className={`base:w-10 base:h-10 w-7 h-7 ${
                  currentPage === 1
                    ? "opacity-50 hover:bg:bg-slate-200"
                    : "cursor-pointer"
                }`}
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
                // className="base:w-10 base:h-10 w-7 h-7 "
                className={`base:w-10 base:h-10 w-7 h-7 ${
                  currentPage === allPages
                    ? "opacity-50 hover:bg:bg-slate-200"
                    : "cursor-pointer"
                }`}
                onClick={() => {
                  setCurrentPage(
                    currentPage === allPages ? allPages : currentPage + 1
                  );
                }}
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
            {/* </> */}
            </div>
          )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CatalogWrapper;
