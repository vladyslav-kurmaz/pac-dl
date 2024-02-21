"use client";

import { DataVideo, SimilarVideo, dataSocialNetwork } from "@/types/types";
import Input from "@/components/Input/Input";

import clipIcon from "@/assets/image/icons/clip.webp";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingSkeleton/LoadingPage";
import Image from "next/image";

import lineRight from "@/assets/image/youtube/line-right.webp";
import lineLeft from "@/assets/image/youtube/line-left.webp";
import pacRight from "@/assets/image/youtube/pack-right.webp";
import pacLeft from "@/assets/image/youtube/pack-left.webp";
import DowloadPage from "../DowloadPage/DowloadPage";
import { useSearchParams } from "next/navigation";
import Resources from "../Resources/Resources";
import TopVideo from "../TopVideo/TopVideo";
import TranslationsProvider from "../TranslationProvider/TranslationProvider";

const WraperForClientContentOnMainPage = ({
  // sosialNetworks,
  // dataFaq,
  namespaces,
}: {
  // sosialNetworks: dataSocialNetwork[];
  // dataFaq: {
  //   title: string;
  //   answer: string;
  // }[];
  namespaces: string;
}) => {
  const { t, i18n } = useTranslation(["elements", namespaces]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [videoData, setVideoData] = useState<DataVideo | null>(null);

  const inputErrors = [
    t(`required`),
    t("error500"),
    t("errorValue"),
    t("errorNotFindVideo"),
    t("errorLongRequest"),
    t("errorDontSupport"),
    t("errorExtractor"),
    t("mediaTypeNotFound"),
  ];

  return (
    <>
      <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
        {t(`${namespaces}:title`)}
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
      <a id="resources"></a>
      <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[32px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
        {t(`${namespaces}:resources`)}
      </h2>

      <div className="mb-7 base:mb-24">
        <Resources
        //  data={sosialNetworks} 
         text={t("elements:showAll")} />
      </div>

      <a id="topVideo"></a>
      <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[32px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
        {t(`${namespaces}:top-video`)}
      </h2>

      <div className="mb-7 base:mb-24">
        <TopVideo
          day={t("elements:top-day")}
          week={t("elements:top-week")}
          month={t("elements:top-month")}
          catalogue={t("elements:allCatalogue")}
          topError={t(`${namespaces}:top-not-found`)}
          titleNotFound={t("title-not-found")}
        />
      </div>

    </>
  );
};

export default WraperForClientContentOnMainPage;
