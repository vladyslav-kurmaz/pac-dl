"use client";

import PacDlServices from "@/services/PacDlServices";

import CatalogTags from "../CatalogTags/CatalogTags";
import { useEffect, useState } from "react";
import { SimilarVideo, TopTag } from "@/types/types";
import { useTranslation } from "react-i18next";
import CatalogVideo from "../CatalogVideo/CatalogVideo";
import { useSearchParams } from "next/navigation";
import LoadingCatalogueVideos from "../LoadingSkeleton/LoadingCatalogueVideos";
import LoadingCatalogueTags from "../LoadingSkeleton/LoadingCatalogueTags";
import Link from "next/link";

// компонент обгортки каталога це суто клієнський компонент
const CatalogWrapper = () => {
  const { t } = useTranslation("catalogue");
  // отримуємо популяні теги
  const [popularTag, setPopularTag] = useState<null | TopTag[]>(null);
  // хмінюється при виборі активного тегу
  const [activeTag, setActiveTag] = useState(t("allVideo"));
  // в залежності від ширини екрану відображається різна кількість відео
  const [activeVideoOffset, setActiveVideoOffset] = useState(24);
  // Сюди зберігаємо всіх відео що є в каталозі
  const [videoData, setVideoData] = useState<SimilarVideo[] | null>(null);
  // Активна сторінка
  const [currentPage, setCurrentPage] = useState(1);
  // Всі сторінки
  const [allPages, setAllPages] = useState(1);
  // Сервіси що використовуємо в каталозі
  const { getPopuliarTags, getAllVideo, getFilterVideo } = PacDlServices();
  // статус завантаження тегів та відео
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // отримання тегів та сторнки з пошукових параметрів
  const searchParams = useSearchParams();
  const tagParams = searchParams.get("tag");
  const page = searchParams.get("page");

  // при завантаженні сторінки отримуємо перелік тегів
  useEffect(() => {
    getTags();
  }, []);

  // в залежності від ширини екрану відображається різна кількість відео
  useEffect(() => {
    const screenWidth = window.screen.width;
    if (screenWidth > 1200) {
      setActiveVideoOffset(24);
    } else {
      setActiveVideoOffset(10);
    }
  }, []);

  // при зміні тега в пошукових параметрах змінюється тег і в додатку аналогічно і 
  useEffect(() => {
    tagParams && setActiveTag(tagParams);
  }, [tagParams]);

  // аналогічно і зі сторінкою
  useEffect(() => {
    page && setCurrentPage(+page);
  }, [page]);

  // useEffect(() => {}, [currentPage]);

  // коли змінюється активний тег переходимо на першу сторінку
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  // отримуємо відео в залежності від кількості відео активної сторінки та активного тега
  useEffect(() => {
    getAllCatalogueVideo(activeVideoOffset, currentPage, activeTag);
  }, [activeTag, currentPage]);

  // фукція запиту на отримання тегів
  const getTags = async () => {
    setLoadingTags(true);
    try {
      const popularTags = await getPopuliarTags();
      setLoadingTags(false);
      setPopularTag(await popularTags);
      // setPopularTag([]);
    } catch (e) {
      console.error(e);
      setLoadingTags(false);
    }
  };

  // функція запиту на отримання всіх відео
  const getAllCatalogueVideo = async (
    offset: number,
    currentPage: number,
    activeTag: string
  ) => {
    setLoadingVideos(true);
    try {
      // якщо activeTag === "Всі відео" || activeTag === "All video" тоді робимо запит на всі відео
      // якщо ні тоді запускає іншу функцію для отримання відфільрованих відео по тегу
      const popularVideo =
        activeTag === "Всі відео" || activeTag === "All video"
          ? await getAllVideo(offset, currentPage) // функція для отримання всіх відео
          : await getFilterVideo(activeTag, offset, currentPage); // функція для отримання відфільтрованих по тегам
      setVideoData(await popularVideo.results); 
      // setVideoData([]);
      setAllPages(
        (await popularVideo.count) / offset < 1
          ? 1
          : Math.ceil(popularVideo.count / offset)
      ); //встановлення всіх сторінок
      setLoadingVideos(false);
    } catch (e) {
      setLoadingVideos(false);
      console.error(e);
    }
  };

  // функція рендингу цифр пагінації на сторінці 
  const renderPagination = () => {
    return (
      <div className="flex w-full  items-center justify-around ">
        <Link
          href={`/catalogue?tag=${activeTag}&page=${currentPage}`}
          className="base:text-base text-[9px] cursor-pointer"

          // onClick={() => setCurrentPage(currentPage)}
        >
          {currentPage}
        </Link>
        <Link
          href={`/catalogue?tag=${activeTag}&page=${
            currentPage === allPages ? allPages : currentPage + 1
          }`}
          className="base:text-base text-[9px] cursor-pointer"

        >
          {currentPage === allPages ? "" : currentPage + 1}
        </Link>
        <div className="base:text-base text-[9px]">...</div>
        <Link
          href={`/catalogue?tag=${activeTag}&page=${allPages}`}
          className="base:text-base text-[9px] cursor-pointer"
          onClick={() => setCurrentPage(allPages)}
        >
          {allPages}
        </Link>
      </div>
    );
  };

  // рендеринг тегів якщо не відбувається процес завантаження
  // стейт не дорівнює нулю та не дорівнює пустому масиву
  const renderTags =
    !loadingTags && popularTag !== null && popularTag?.length !== 0 ? (
      <CatalogTags
        tags={popularTag}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        allVideo={t("allVideo")}
      />
    ) : null;

  // рендеринг скелетона якщо відбувається завантаження 
  const renderLoaderTags = loadingTags ? <LoadingCatalogueTags /> : null;

  // рендеринг повідомлення що тегів нема якщо теги не завантажується масив тегів дорівнює нулю або 
  //  теги не завантажуються і стейт не дорівнює null
  const renderMessageTags =
    (!loadingTags && popularTag && popularTag?.length === 0) ||
    (!loadingTags && popularTag === null) ? (
      <div className=" text-[13px] base:text-2xl text-center">
        {t("not-tags")}
      </div>
    ) : null;

  // рендеринг скелетона якщо відбувається завантаження 
  const renderLoaderVideo = loadingVideos ? (
    <LoadingCatalogueVideos count={activeVideoOffset} />
  ) : null;

  // рендеринг відео якщо не відбувається процес завантаження
  // стейт не дорівнює нулю та не дорівнює пустому масиву
  const renderVideos =
    !loadingVideos && videoData !== null && videoData?.length !== 0 ? (
      <CatalogVideo videoData={videoData} />
    ) : null;

  // рендеринг повідомлення що відео нема якщо відео не завантажується масив відео дорівнює нулю або 
  //  відео не завантажуються і стейт не дорівнює null
  const renderVideoMessage =
    (!loadingVideos && videoData?.length === 0) ||
    (!loadingVideos && videoData === null) ? (
      <div className="text-[13px] text-center md:mb-12 mb-7 base:text-2xl w-full col-span-4 ">
        {t("not-video")}
      </div>
    ) : null;

  // рендер сторінки
  return (
    <div className="">
      <div className="mb-5 base:mb-24">
        {renderTags} {renderLoaderTags} {renderMessageTags}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 sml:grid-cols-3 lg:grid-cols-4 gap-x-4 justify-items-center"
      >
        {renderLoaderVideo}
        {renderVideoMessage}
        {renderVideos}
      </div>

      <div className="">
        {videoData?.length === 0 ||
        videoData === null ||
        videoData === undefined ? null : (
          <div className="ml-auto flex base:w-[240px] w-[150px] justify-between items-center base:mb-[57px] mb-7">
            <Link
              href={`/catalogue?tag=${activeTag}&page=${
                currentPage === 1 ? 1 : currentPage - 1
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  
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
            </Link>

            {renderPagination()}
            <Link
              href={`/catalogue?tag=${activeTag}&page=${
                currentPage === allPages ? allPages : currentPage + 1
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogWrapper;
