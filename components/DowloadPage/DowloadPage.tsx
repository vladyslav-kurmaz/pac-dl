"use client";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Input from "../Input/Input";
import clipIcon from "@/assets/image/icons/clip.webp";
import { DataVideo, DowloadFormat, SimilarVideo } from "@/types/types";
import ButtonCategories from "../Button/ButtonCategories";
import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonRounded from "../Button/ButtonRounded";
import PacDlServices from "@/services/PacDlServices";
import Link from "next/link";

const DowloadPage = ({
  dataVideo,
  similarVideo,
}: {
  dataVideo: DataVideo;
  similarVideo: SimilarVideo[] | null;
}) => {
  const [videoFormat, setVideoFormat] = useState("popular");
  const [moreDescription, setMoreDescription] = useState(false);
  const [moreFormats, setMoreFormats] = useState(false);
  const { t } = useTranslation("elements");
  const [hightlightAll, setHightlightAll] = useState<string[]>([]);

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
    console.log(videoFormat);

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

  // const format = (data: DowloadFormat[]) => {
  //   return (
  //     <div
  //       className="flex justify-between items-center mb-6 base:mb-[54px]"
  //       // key={i}
  //     >
  //       <div>
  //         {/* mp4 - {dataVideo.formats_note[i]} ({item}) */}
  //       </div>
  //       <button
  //         // onClick={() => dowloadsVideo(uploader_url, item)}
  //         className="px-4 text-[9px] py-3 bg-violet2 disabled:text-violet-200 disabled:hover:bg-violet2 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet1 rounded-[30px] base:rounded-[30px] base:px-14 base:py-7 base:text-base box-border"
  //       >
  //         {t("download")}
  //       </button>
  //     </div>
  //   );
  // };

  // https://rr12---sn-n8v7znze.googlevideo.com/videoplayback?expire=1707579750&ei=BkXHZZjFG9bhv_IP1oq3sAQ&ip=2a0e%3Acd41%3A9dcb%3A591c%3Aca3a%3A35ff%3Afeb5%3Ad686&id=o-AEHJBnBXRo5Pu0YGzPpmgd13joc06EH1XoDsBqBzhVXB&itag=22&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Tb&mm=31%2C29&mn=sn-n8v7znze%2Csn-n8v7kn76&ms=au%2Crdu&mv=u&mvi=12&pl=40&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=137.787&lmt=1705600548496393&mt=1707557636&fvip=2&fexp=24007246&c=ANDROID&txp=5308224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgB9qzH2y5KSKwCR15Nz84NaeUWY74A2cLEJ8Auww-CRcCIQDGEiKL8aNZoxzk8tesA4jOlugiHdxjr6sya72WNeQTLQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AAO5W4owRQIgbg8SH5GWObZ01tGtW5_2qMciOlWAbta41VD7eJJHYNMCIQC7ji6WuRler1IfgdhoDBQ2NQBYNI47GkkwFwAITZqJAg%3D%3D&title=Cinematic+FPV+_+Showreel+2023"

  // &title=Cinematic+FPV+_+Showreel+2023 downloader

  // Cinematic%2BFPV%2B%2B%2BShowreel%2B2023
  // &title=Cinematic%20FPV%20%7C%20Showreel%202023 our

  // https://rr2---sn-oxu5nnpnu-px8l.googlevideo.com/videoplayback?expire=1707580186&ei=ukbHZfTnA7KN6dsPnYnF0QE&ip=109.236.63.196&id=o-ANP4XkIzLsc6laIQxijooBY1MvXKHtblUzMNjnBbV-VL&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=9293752&ratebypass=yes&dur=137.787&lmt=1705600257501363&fexp=24007246&c=ANDROID&txp=5319224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAPIMWzJj53GFk75QHGz-kGst9r0FqHOa686V6P7d5O9VAiA0fsAYaaVxmEm8cFev91a4TvoAnJ8Eikr9xN6tm6Hu3A%3D%3D&title=Cinematic%2BFPV%2B%2B%2BShowreel%2B2023&redirect_counter=1&rm=sn-5hnezs7e&req_id=77cbc0f39703a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=Tb&mip=94.45.103.106&mm=31&mn=sn-oxu5nnpnu-px8l&ms=au&mt=1707558284&mv=m&mvi=2&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AAO5W4owRQIhAIqtclT6TCxZnMI23eYatigcpmU3lRc2t3zyeyx1vxQQAiAeEpfyIOJuDzIDrQThulzn39dD8clSeSbCE-dzvxt5mw%3D%3D

  const renderFormats = () => {
    return formatData?.map((item, i) => {
      const { download_url, ext, format_note, resolution } = item;
      const downloadUrl = `${download_url}&title=${encodeURIComponent(
        title.replace(/[ |]/g, "+")
      )}`;
      console.log(encodeURIComponent(title.replace(/[ |]/g, "+")));

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

  const renderTags = () => {
    return tag.map((item, i) => {
      const [active, setActive] = useState(false);

      useEffect(() => {
        hightlightAll.includes(item) ? setActive(true) : setActive(false);
      }, [hightlightAll]);

      const selectTags = (tag: string) => {
        if (hightlightAll.includes(tag)) {
          setHightlightAll(hightlightAll.filter((tag) => tag !== item));
        } else {
          setHightlightAll((state) => state && [...state, item]);
        }
      };

      return (
        <div
          key={i}
          className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-2 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
            active ? "bg-grayCastom2" : ""
          }`}
          onClick={() => {
            setHightlightAll((state) => state && [...state, item]);
            selectTags(item);
          }}
        >
          {item}
        </div>
      );
    });
  };

  const onHightlightAll = () => {
    setHightlightAll(tag);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hightlightAll.join(", "));
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

            {/* <video
              src={video[0].download_url}
              className="w-full h-full max-w-[347px] mb-3 md:mb-0 max-h-[192px] base:max-w-[603px] base:max-h-[345px] rounded-[15px] base:rounded-[20px]"
            ></video> */}
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
                  ? "max-h-[2000px] transition-all duration-700 ease-linear"
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

          {renderTags()}
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

        {similarVideo !== null ? (
          <div className="flex justify-start relative z-20 w-full flex-col items-start">
            <div className="mr-2 md:mr-6 mb-4 md:mb-[26px] text-[16px] font-semibold base:text-[24px]">
              {t("similar-video")}
            </div>

            <div className="w-full flex flex-wrap justify-between small:flex-col sm:flex-row">
              <div className="flex flex-col items-center mr-1">
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
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DowloadPage;
