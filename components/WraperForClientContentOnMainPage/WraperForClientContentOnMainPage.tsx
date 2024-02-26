"use client";

import { DataVideo } from "@/types/types";
import Input from "@/components/Input/Input";

import clipIcon from "@/assets/image/icons/clip.webp";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Resources from "../Resources/Resources";
import TopVideo from "../TopVideo/TopVideo";

// клієнський компонент для обготрання динамічних компонентів сторінки

const WraperForClientContentOnMainPage = ({
  namespaces,
}: {
  namespaces: string;
}) => {
  const { t } = useTranslation(["elements", namespaces]);
  // статус завантаження сторінки для передачі на інпут
  const [loading, setLoading] = useState(false);
  // отримання відео данних
  const [videoData, setVideoData] = useState<DataVideo | null>(null);

  // текстове бачення помилок для відображння їх у інпуті
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

  // контент з Input, Resources, TopVideo
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
