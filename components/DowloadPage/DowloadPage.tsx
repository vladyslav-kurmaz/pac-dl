"use client";
import { useTranslation } from "react-i18next";

import { DataVideo, DowloadFormat, SimilarVideo } from "@/types/types";
import ButtonCategories from "../Button/ButtonCategories";
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonRounded from "../Button/ButtonRounded";
import Link from "next/link";
import { useRouter } from "next/navigation";
import notFound from "@/assets/image/error/image_not_found.webp";

import RenderTags from "../Tags/Tags";
import visualActiveFormat from "@/utils/visualActiveFormat";

const DowloadPage = ({
  dataVideo,
  similarVideo,
}: {
  dataVideo: DataVideo;
  similarVideo: SimilarVideo[];
}) => {
  // активний формат відео
  const [videoFormat, setVideoFormat] = useState("popular");
  // показувати чи ні опис
  const [moreDescription, setMoreDescription] = useState(false);
  // показувати чи ні більше форматів
  const [moreFormats, setMoreFormats] = useState(false);
  // функція перекладу
  const { t } = useTranslation("elements");
  // масив вибраних тегів
  const [hightlightAll, setHightlightAll] = useState<string[]>([]);
  const router = useRouter();

  const {
    title,
    description,
    video,
    video_only,
    audio_only,
    id,
    tag,
    uploader_url,
    preview,
  } = dataVideo;
  const [formatData, setFormatData] = useState<DowloadFormat[] | string>("");

  // визваємо функцію для відображення даних з активного формату 
  useEffect(() => {
    visualActiveFormat(videoFormat, video, audio_only, video_only, setFormatData, t)
  }, [videoFormat]);

  // функція рендерить формати 
  const renderFormats = () => {
    return typeof formatData !== "string" ? (
      formatData?.map((item, i) => {
        const { download_url, ext, format_note, resolution, product_type } =
          item;
        const downloadUrl = `${download_url}&title=${encodeURIComponent(
          title?.replace(/[ |]/g, "+")
        )}`;

        const renderItem = (
          <div
            className="flex justify-between items-center mb-3 lg:mb-3"
            key={i}
          >
            <div>
              {ext ? `${ext} - ` : "mp4 - "}{" "}
              {format_note ? format_note : product_type}{" "}
              {resolution ? `(${resolution})` : ""}
            </div>
            <Link
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[75px] text-[9px] flex justify-center items-center py-[7px]  bg-violet2 disabled:text-violet-200 disabled:hover:bg-violet2 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet1 rounded-[30px] lg:rounded-[30px] lg:w-[164px] lg:py-[15px]  lg:text-base box-border"
            >
              {t("download")}
            </Link>
          </div>
        );

        return renderItem;
      })
    ) : (
      <div className="text-[9px] lg:text-base">{formatData}</div>
    );
  };

  // функція для виділення тегів
  const onHightlightAll = () => {
    setHightlightAll(tag);
  };

  // функція для копіювання тегів
  const copyAll = () => {
    navigator.clipboard.writeText(hightlightAll?.join(", "));
  };

  // фунція для виводу схожих відео
  const renderSimilarVideo = () => {
    return similarVideo?.map((item) => {
      const { title, video_url, preview_url, id } = item;

      return (
        <Link
          href={`/download?url=${video_url}`}
          onClick={() => {
            router.push(`/download?url=${video_url}`);
          }}
          className="flex flex-col items-center mb-[30px] w-[166px] lg:w-[269px] cursor-pointer"
          key={id}
        >
          {/* визначає чи є посилання на фото в негативному випадку вставляє заглушку notFound */}
          {preview_url ? (
            <Image
              src={preview_url}
              width={1000}
              height={1000}
              alt={title}
              className="w-[166px] h-[92px] lg:w-[269px] lg:h-[150px] mb-2 rounded-[16px] md:mb-0"
            />
          ) : (
            <Image
              src={notFound}
              alt={"image not found"}
              className="w-[166px] h-[92px] lg:w-[269px] lg:h-[150px] mb-2 rounded-[16px] md:mb-0 "
              width={1000}
              height={1000}
            />
          )}
          <div className="text-[9px] md:text-[16px] text-center">
            {title?.length > 50 ? `${title?.slice(0, 50)}...` : title}
          </div>
        </Link>
      );
    });
  };

  return (
    <>
      <div className="mb-7 base:mb-32 w-full max-w-[347px] md:max-w-lg relative left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="flex flex-col w-full items-center relative mb-7 base:mb-12 z-20 md:items-start md:flex-row md:justify-around base:justify-between">
          <div className="relative w-full max-w-[347px]  max-h-[192px]  md:mr-2 mr-0 base:mb-24 base:max-w-[633px] base:max-h-[365px] rounded-[15px] base:rounded-[20px]">
            {preview?.length > 0 ? (
              <Image
                src={preview}
                alt={title}
                className="w-full h-full max-w-[347px] object-contain mb-3 md:mb-0 max-h-[192px] base:max-w-[603px] base:max-h-[345px] rounded-[15px] base:rounded-[20px]"
                width={1000}
                height={1000}
              />
            ) : (
              <Image
                src={notFound}
                alt={"image not found"}
                className="w-full h-full max-w-[347px] mb-3 md:mb-0 max-h-[192px] base:max-w-[603px] base:max-h-[345px] rounded-[15px] base:rounded-[20px]"
                width={1000}
                height={1000}
              />
            )}
          </div>

          <div className=" w-full base:w-[457px] md:w-[307px] mt-3 md:mt-0">
            <div className="mb-[21px] base:mb-[22px] text-[16px] font-semibold base:text-[24px]">
              {t("media")}
            </div>

            <div className="flex justify-between items-center mb-5 base:mb-10">
              <ButtonCategories
                text={t("popular")}
                onClick={() => setMoreFormats(false)}
                name="popular"
                active={videoFormat}
                setActive={setVideoFormat}
              />
              <ButtonCategories
                text={t("hd")}
                onClick={() => setMoreFormats(false)}
                name="hd"
                active={videoFormat}
                setActive={setVideoFormat}
              />
              <ButtonCategories
                text={t("audio")}
                onClick={() => setMoreFormats(false)}
                name="audio"
                active={videoFormat}
                setActive={setVideoFormat}
              />
              <ButtonCategories
                text={t("all-formats")}
                onClick={() => setMoreFormats(false)}
                name="all-formats"
                active={videoFormat}
                setActive={setVideoFormat}
              />
            </div>

            <div
              className={`mb-2 base:mb-[20px] ${
                moreFormats
                  ? "max-h-[10000px] transition-all duration-500 ease-in-out overflow-hidden"
                  : "lg:max-h-[195px] max-h-[115px] transition-all duration-500 ease-in-out overflow-hidden"
              }`}
            >
              {renderFormats()}
            </div>

            {Array.isArray(formatData) && formatData?.length > 3 ? (
              <button
                className="flex justify-between items-center transition-all"
                onClick={() => setMoreFormats((state) => !state)}
              >
                <span className="mr-2 base:mr-5  text-[12px] base:text-[22px]">
                  {moreFormats ? t("less-formats") : t("more-formats")}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-[11px] base:w-5 base:h-[22px]"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path d="M0 10H20M20 10L11 1M20 10L11 19" stroke="#1C1917" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-start relative z-20 base:max-w-[1118px] mb-8 base:mb-24">
          <div className="flex justify-between w-full items-center mb-2 md:mb-3">
            <div className="text-[16px] font-semibold base:text-[24px]">
              {t("tags-video")}
            </div>
            <div className="flex">
              <ButtonRounded
                style={tag?.length > 0 ? "flex" : "hidden"}
                text={t("highlightAll")}
                onClick={() => onHightlightAll()}
              />
              <ButtonRounded
                disabled={tag?.length > 0 ? false : true}
                text={t("copy")}
                style={`ml-2 base:ml-6 ${tag?.length > 0 ? "flex" : "hidden"}`}
                onClick={copyAll}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            {tag?.length > 0 ? (
              tag?.map((item, i) => {
                return (
                  <RenderTags
                    key={i}
                    tag={item}
                    hightlightAll={hightlightAll}
                    setHightLightAll={setHightlightAll}
                  />
                );
              })
            ) : (
              <div className="text-[13px] base:text-[24px]">
                {t("tags-not-found")}
              </div>
            )}
          </div>
        </div>

        <div className="w-full mb-8 relative z-20 md:mb-24 transition-all duration-500 ">
          <div className="mr-2 md:mr-6 mb-4 md:mb-[26px] text-[16px] font-semibold base:text-[24px]">
            {t("description")}
          </div>

          {description?.length > 0 ? (
            <div
              className={`text-[13px] base:text-[24px] mb-3 base:mb-6 transition-all duration-500 
              ${
                moreDescription
                  ? "max-h-[1000px] transition-all overflow-hidden duration-500"
                  : "max-h-[120px] text-ellipsis overflow-hidden transition-all ease-in-out duration-500 openDescription"
              }
              `}
            >
              {description}
            </div>
          ) : (
            <div className="text-[13px] base:text-[24px] mb-3 base:mb-6 transition-all duration-300">
              {t("description-none")}
            </div>
          )}

          {description?.length > 250 ? (
            <button
              className="flex justify-between items-center"
              onClick={() => setMoreDescription((state) => !state)}
            >
              <span className="mr-2 base:mr-5 text-[12px] base:text-[22px]">
                {moreDescription
                  ? t("less-description")
                  : t("more-description")}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-[11px] base:w-5 base:h-[22px]"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path d="M0 10H20M20 10L11 1M20 10L11 19" stroke="#1C1917" />
              </svg>
            </button>
          ) : null}
        </div>

        {similarVideo?.length > 0 ? (
          <div className="flex justify-start relative z-20 w-full flex-col items-start">
            <div className="mr-2 md:mr-6 mb-4 md:mb-[26px] text-[16px] font-semibold base:text-[24px]">
              {t("similar-video")}
            </div>

            <div
              className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-4 gap-x-4 justify-items-center"
            >
              {similarVideo?.length > 0 ? renderSimilarVideo() : null}
            
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DowloadPage;



