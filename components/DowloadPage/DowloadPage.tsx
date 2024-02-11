"use client";
import { useTranslation } from "react-i18next";

import { DataVideo, DowloadFormat, SimilarVideo } from "@/types/types";
import ButtonCategories from "../Button/ButtonCategories";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import ButtonRounded from "../Button/ButtonRounded";
import PacDlServices from "@/services/PacDlServices";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import RenderTags from "../Tags/Tags";

const DowloadPage = ({
  dataVideo,
  similarVideo,
}: {
  dataVideo: DataVideo;
  similarVideo: SimilarVideo[];
}) => {
  const [videoFormat, setVideoFormat] = useState("popular");
  const [moreDescription, setMoreDescription] = useState(false);
  const [moreFormats, setMoreFormats] = useState(false);
  const { t } = useTranslation("elements");
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
  const [formatData, setFormatData] = useState<DowloadFormat[] | null>(null);

  useEffect(() => {
    // console.log(videoFormat);

    switch (videoFormat) {
      case "popular": {
        setFormatData([...video]);
        break;
      }
      case "hd": {
        setFormatData(
          video.filter(
            (item) =>
              +item.format_note.slice(0, item.format_note.length - 1) >= 720
          )
        );
        break;
      }
      case "audio": {
        setFormatData([...audio_only]);
        break;
      }
      case "all-formats": {
        setFormatData([...video, ...audio_only, ...video_only]);
        break;
      }
    }
  }, [videoFormat]);

  const renderFormats = () => {
    return formatData?.map((item, i) => {
      const { download_url, ext, format_note, resolution } = item;
      const downloadUrl = `${download_url}&title=${encodeURIComponent(
        title.replace(/[ |]/g, "+")
      )}`;

      const renderItem = (
        <div className="flex justify-between items-center mb-3 lg:mb-6" key={i}>
          <div>
            {ext} - {format_note} ({resolution})
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
    });
  };


  const onHightlightAll = () => {
    setHightlightAll(tag);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hightlightAll.join(", "));
  };
  const searchParams = useSearchParams();

  const renderSimilarVideo = () => {
    return similarVideo?.map((item) => {
      const { title, video_url, preview_url, id } = item;
      // console.log(video_url);

      return (
        <div
          // href={`/download?url=${video_url}`}
          onClick={() => {
            // router.push(`/`);
            // searchParams.delete()

            router.push(`/download?url=${video_url}`);
          }}
          className="flex flex-col items-center mb-[30px] "
          key={id}
        >
          <Image
            src={preview_url}
            width={1000}
            height={1000}
            alt={title}
            className="w-[166px] h-[92px] lg:w-[269px] lg:h-[150px] mb-2 rounded-[16px] md:mb-0"
          />
          <div className="text-[9px] md:text-[16px]">{title}</div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="mb-7 base:mb-32 w-full max-w-[347px] md:max-w-lg relative left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="flex flex-col w-full items-center relative mb-7 base:mb-12 z-20 md:items-start md:flex-row md:justify-around base:justify-between">
          <div className="relative w-full max-w-[347px]  max-h-[192px]  md:mr-2 mr-0 base:mb-24 base:max-w-[633px] base:max-h-[365px] rounded-[15px] base:rounded-[20px]">
            <Image
              src={dataVideo.preview}
              alt={dataVideo.title}
              className="w-full h-full max-w-[347px] mb-3 md:mb-0 max-h-[192px] base:max-w-[603px] base:max-h-[345px] rounded-[15px] base:rounded-[20px]"
              width={1000}
              height={1000}
            />
          </div>

          <div className=" w-full base:w-[457px] md:w-[307px] mt-3 md:mt-0">
            <div className="mb-[21px] base:mb-[22px] text-[16px] font-semibold base:text-[24px]">
              {t("media")}
            </div>

            <div className="flex justify-between items-center mb-5 base:mb-10">
              <ButtonCategories
                text={t("popular")}
                onClick={() => {}}
                name="popular"
                active={videoFormat}
                setActive={setVideoFormat}
              />
              <ButtonCategories
                text={t("hd")}
                onClick={() => {}}
                name="hd"
                active={videoFormat}
                setActive={setVideoFormat}
              />
              <ButtonCategories
                text={t("audio")}
                onClick={() => {}}
                name="audio"
                active={videoFormat}
                setActive={setVideoFormat}
              />
              <ButtonCategories
                text={t("all-formats")}
                onClick={() => {}}
                name="all-formats"
                active={videoFormat}
                setActive={setVideoFormat}
              />
            </div>

            <div
              className={`mb-[29px] base:mb-23 ${
                moreFormats
                  ? "max-h-[10000px] transition-all duration-700 ease-linear"
                  : "lg:max-h-[213px] max-h-[110px] transition-all duration-300  overflow-hidden"
              }`}
            >
              {renderFormats()}
            </div>

            {formatData && formatData.length > 3 ? (
              <button
                className="flex justify-between items-center"
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

        <div className="flex flex-wrap justify-start w-full relative z-20 base:max-w-[1118px] mb-8 base:mb-24">
          <div className="flex justify-between w-full items-center mb-0 md:mb-3">
            <div className="text-[16px] font-semibold base:text-[24px]">
              {t("tags-video")}
            </div>
            <div className="flex">
              <ButtonRounded
                text={t("highlightAll")}
                onClick={onHightlightAll}
              />
              <ButtonRounded
                text={t("copy")}
                style={"ml-2 base:ml-6"}
                onClick={copyAll}
              />
            </div>
          </div>

          <div className="">
            {tag.map((item, i) => {
              return <RenderTags key={i} tag={item} hightlightAll={hightlightAll} setHightLightAll={setHightlightAll}/>
            })}
          </div>
        </div>

        <div className="w-full mb-8 relative z-20 md:mb-24 transition-all duration-500 ">
          <div className="mr-2 md:mr-6 mb-4 md:mb-[26px] text-[16px] font-semibold base:text-[24px]">
            {t("description")}
          </div>

          {description.length > 0 ? (
            <div
              className={`text-[13px] base:text-[24px] mb-3 base:mb-6 transition-all duration-500 
              ${
                moreDescription
                  ? "max-h-[1000px] transition-all duration-500 ease-linear"
                  : "max-h-[100px] text-ellipsis overflow-hidden transition-all duration-300 openDescription"
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

          {description.length > 250 ? (
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

            <div className="w-full flex flex-wrap justify-between small:flex-col sm:flex-row">
              {similarVideo?.length > 0 ? renderSimilarVideo() : null}
              {/* <div className="flex flex-col items-center mr-1">
                <div className="relative w-[166px] h-[93px] mb-1 base:mb-2  lg:w-[269px] lg:h-[149px] rounded-[15px] base:rounded-[20px]"></div>
                <div className="w-[70%] h-[8px] mb-3 base:mb-6  base:h-[22px] "></div>
              </div>

              <div className="flex flex-col items-center mr-1">
                <div className="relative w-[166px] h-[93px] mb-1 base:mb-2 lg:w-[269px] lg:h-[149px] rounded-[15px] base:rounded-[20px]"></div>
                <div className="w-[70%] h-[8px] mb-3 base:mb-6  base:h-[22px] "></div>
              </div>

              <div className="flex flex-col items-center mr-1">
                <div className="relative w-[166px] h-[93px] mb-1 base:mb-2 lg:w-[269px] lg:h-[149px] rounded-[15px] base:rounded-[20px]"></div>
                <div className="w-[70%] h-[8px] mb-3 base:mb-6  base:h-[22px] "></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-[166px] h-[93px] mb-1 base:mb-2 lg:w-[269px] lg:h-[149px] rounded-[15px] base:rounded-[20px]"></div>
                <div className="w-[70%] h-[8px] mb-3 base:mb-6  base:h-[22px] "></div>
              </div> */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DowloadPage;
