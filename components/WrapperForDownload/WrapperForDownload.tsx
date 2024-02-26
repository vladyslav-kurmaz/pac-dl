"use client";

import { DataVideo, SimilarVideo } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import clipIcon from "@/assets/image/icons/clip.webp";

import { useTranslation } from "react-i18next";
import PacDlServices from "@/services/PacDlServices";
import DowloadPage from "../DowloadPage/DowloadPage";
import LoadingPage from "../LoadingSkeleton/LoadingPage";
import { useRouter } from "next/navigation";
import validateResponse from "@/utils/validateResponse";

const WrapperForDownload = () => {
  const { t } = useTranslation("elements");
  const searchParams = useSearchParams();
  // статус завантаження сторінки для передачі на інпут
  const [loading, setLoading] = useState(true);
  // функція запиту на сервер для отримання відео інформації
  const { getVideoInfo } = PacDlServices();
  const url = searchParams.get("url");
  const router = useRouter();
    // текстове бачення помилок для відображння їх у інпуті
  const inputErrors = [
    t("required"),
    t("error500"),
    t("errorValue"),
    t("errorNotFindVideo"),
    t("errorLongRequest"),
    t("errorDontSupport"),
    t("errorExtractor"),
    t("mediaTypeNotFound"),
  ];

  // сюди сетять схожі відео
  const [similarVideo, setSimilarVideo] = useState<SimilarVideo[]>([]);
  // сюди сетятиться інформація основного відео
  const [videoData, setVideoData] = useState<DataVideo | null>(null);

  // перевіряється чи є url і запускається функція завантаження
  useEffect(() => {
    if (typeof url === "string") {
      getVideo(url);
    }
  }, [url]);

  // функція завантаження відео
  const getVideo = async (url: string) => {
    setLoading(true);
    try {
      const postRequest = await getVideoInfo(url);
      
      // функція відлову помилок
      validateResponse(postRequest, router);

      setVideoData( postRequest.video_info);
      setSimilarVideo( postRequest?.similar_video);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      router.push(`/`);
      console.log(await e);
    }
  };

  const renderTitle = videoData !== null && searchParams.get("url") !== null
  ? videoData?.title?.length > 0
    ? videoData?.title?.length > 50
      ? videoData?.title?.slice(0, 50)
      : videoData?.title
    : videoData?.description
    ? videoData?.description.slice(0, 51)
    : t("title-not-found")
  : ""

  return (
    <div className="relative pt-20 base:pt-48 ">
      <div className="px-2 md:px-6 base:max-w-lg mx-auto relative z-20">
        <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {loading ? t("elements:loading") : ""}
          {renderTitle}
        </h1>

        <div className="mb-7 base:mb-24 relative z-30">
          <Input
            buttonRounded={t("elements:buttonRounded")}
            buttonNormal={t("elements:buttonNormal")}
            placeholder={t("elements:mainInputPlaceholder")}
            icon={clipIcon}
            setLoading={setLoading}
            loading={loading}
            data={videoData}
            setVideoData={setVideoData}
            errors={inputErrors}
          />
        </div>

        {loading && <LoadingPage />}
        {!loading && videoData && (
          <DowloadPage dataVideo={videoData} similarVideo={similarVideo} />
        )}
      </div>
    </div>
  );
};

export default WrapperForDownload;
