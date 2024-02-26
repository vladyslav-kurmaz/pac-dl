import Image from "next/image";
import notFound from "@/assets/image/error/image_not_found.webp";
import { SimilarVideo } from "@/types/types";
import Link from "next/link";
import { useTranslation } from "react-i18next";

// Функція приймає пропс videoData та рендерить список з відео
const CatalogVideo = ({ videoData }: { videoData: SimilarVideo[] }) => {

  const { t } = useTranslation("catalogue");

  return videoData === undefined ? (
    <div className="text-[9px] md:text-[12px] py-20 base:text-[14px] lg:text-[16px] lg:max-w-[265px]  max-w-[165px] text-center">
      Відео за цим тегом не знайдено
    </div>
  ) : (
    // перебираємо дату та рендеремо відеоелементи
    videoData?.map((item) => {
      const { title, preview_url, video_url, id, description } = item;

      const setTitle = title
      ? title?.length > 49
        ? `${title?.slice(0, 50)}...`
        : title
      : description
      ? description?.slice(0, 51)
      : t("title-not-found");

      return (
        <Link
          href={`/download?url=${video_url}`}
          onClick={() => {
            localStorage.removeItem("error500");
          }}
          className={` flex flex-col items-center mb-[30px] cursor-pointer w-[166px] base:w-[209px] lg:w-[269px]`}
          key={id}
        >
          {preview_url ? (
            <Image
              src={preview_url}
              width={1000}
              height={1000}
              alt={title}
              className="w-[166px] object-contain h-[92px] base:w-[269px] base:h-[150px] mb-2 rounded-[16px] md:mb-2"
            />
          ) : (
            <Image
              src={notFound}
              alt={"image not found"}
              className="w-[166px] object-contain h-[92px] base:w-[269px] base:h-[150px] mb-2 rounded-[16px] md:mb-0 "
              width={1000}
              height={1000}
            />
          )}
          <div className="text-[9px] md:text-[12px] base:text-[14px] lg:text-[16px] lg:max-w-[265px]  max-w-[165px] text-center">
            {setTitle}
          </div>
        </Link>
      );
    })
  );
};

export default CatalogVideo;
