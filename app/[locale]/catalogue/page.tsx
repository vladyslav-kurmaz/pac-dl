import initTranslations from "@/app/i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CatalogWrapper from "@/components/CatalogWrapper/CatalogWrapper";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";
import Image from "next/image";

import lineRight from "@/assets/image/youtube/line-right.webp";

// мета теги для україномовного сайту
const ukraineMetaData = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  // console.log(params.page);
  const tag =
    params.tag === "Всі відео"
      ? "Топ завантажуваних відео"
      : `Найкращі відео з категорії ${params.tag}`;
  const page = params.page && +params.page > 1 ? `page ${params.page}` : "";
  return {
    title: `${tag} ${page}`,
  };
};

// мета теги для англомовного сайту
const englishMetaData = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const tag =
    params.tag === "Всі відео" || params.tag === "All video"
      ? "Top downloaded videos"
      : `Top videos from category ${params.tag}`;

  const page = params.page && +params.page > 1 ? `page ${params.page}` : "";
  return {
    title: `${tag} ${page}`,
  };
};

// функція генерації метатегів на сторінці
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return params.locale === "en"
    ? englishMetaData(searchParams)
    : ukraineMetaData(searchParams);
}

// Функція що рендерити сторінку Каталога
export default async function Catalogue({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { t, resources } = await initTranslations(params?.locale, [
    "catalogue",
  ]);

  // Відображення тайтла в залежності від вибраного тега 
  const tag =
    searchParams.tag === "Всі відео" || searchParams.tag === "All video"
      ? t("title-all")
      : `${t("title-tag")} ${searchParams.tag}`;

  // Відображення в тайтлі нумерації сторінки сторінки
  const page =
    searchParams.page && +searchParams.page > 1 ? `${t("page")} ${searchParams.page}` : "";

  return (
    <div className="relative pt-20 base:pt-48 ">
      <Image
        src={lineRight}
        alt="line right"
        className="absolute hidden base:block z-10 top-[4%] right-0"
      />

      <div className="base:max-w-lg mx-auto px-4 relative z-20">
        <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {`${tag} ${page}`}
        </h2>

        {/* Функція для передавання правильного перекладу */}
        {/* При додаванні нової мови потрібно додати сюди назву файлу  */}
        <TranslationsProvider
          locale={params.locale}
          namespaces={"catalogue"}
          resources={resources}
        >
          {/* Компонент де відбувається клієнтська логіка додатку  */}
          <CatalogWrapper />
        </TranslationsProvider>
      </div>
    </div>
  );
}
