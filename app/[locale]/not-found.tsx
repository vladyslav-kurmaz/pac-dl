import errorImage from "@/assets/image/error/error.webp";
import Image from "next/image";
import initTranslations from "../i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

// мета теги для україномовного сайту
const ukraineMetaData = {
  title: "Сторнінка на знайдена",
};

// мета теги для англомовного сайту
const englishMetaData = {
  title: "Page not found",
};

// функція генерації метатегів на сторінці
export async function generateMetadata({ params }: { params: Params }) {
  return params.locale === "en" ? englishMetaData : ukraineMetaData;
}

// Функція що рендерить notFound сторінку
export default async function notFound(params: Params) {
   // Функція що отримує статус мови та ресурси для перекладу
  const { t } = await initTranslations(params?.locale, [
    "error",
    "elements",
  ]);
  
 // Рендер статичної верстки сторінки
 
  return (
    <div className="relative pt-20 base:pt-32 base:mb-24 mb-7">
      <div className="mx-auto px-6 flex flex-col items-center md:flex-row md:justify-around base:justify-between base:max-w-[916px]">
        <Image
          src={errorImage}
          alt="error pac"
          className="w-[214px] base:w-[376px] "
        />

        <div className="flex flex-col items-center base:items-start">
          <h2 className="text-[40px] base:text-[66px] mb-2 base:mb-6 "> 
            <span className="text-[40px] base:text-[66px] font-bold">404</span>
            {t("error")}
          </h2>
          <p className="text-xs base:text-2xl mb-7 base:mb-14">{t("type-error")}</p>

          <Link href="/" className="bg-grayCastom2 text-xs base:text-2xl px-4 py-3 base:px-10 base:py-7 rounded-[7px] base:rounded-[15px]">{t("button")}</Link>
        </div>
      </div>
    </div>
  );
}
