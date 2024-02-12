"use client";

import PacDlServices from "@/services/PacDlServices";

import CatalogTags from "../CatalogTags/CatalogTags";
import { useEffect, useState } from "react";
import { TopTag } from "@/types/types";
import { useTranslation } from "react-i18next";
import CatalogVideo from "../CatalogVideo/CatalogVideo";

const CatalogWrapper = () => {
  const { t } = useTranslation("catalogue");
  const [popularTag, setPopularTag] = useState<null | TopTag[]>(null);
  const [activeTag, setActiveTag] = useState(t("allVideo"));
  const [activeVideoOffset, setActiveVideoOffset] = useState(24);
  const [videoData, setVideoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    getAllCatalogueVideo(activeVideoOffset);
  }, []);

  useEffect(() => {
    if (activeTag === "allVideo") {
      getAllCatalogueVideo(activeVideoOffset);
    }
  }, [activeTag]);

  const getTags = async () => {
    try {
      const popularTags = await getPopuliarTags();
      setPopularTag(await popularTags);

      console.log(await popularTags);
    } catch (e) {
      console.error(e);
    }
  };

  const getAllCatalogueVideo = async (offset: number) => {
    try {
      const popularVideo = await getAllVideo(offset);
      setVideoData(await popularVideo.results);
    } catch (e) {
      console.error(e);
    }
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

      <div className="flex flex-wrap justify-between">{<CatalogVideo />}</div>
    </div>
  );
};

export default CatalogWrapper;
