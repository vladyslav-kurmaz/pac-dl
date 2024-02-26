import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";
import WrapperForDownload from "@/components/WrapperForDownload/WrapperForDownload";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

import lineRight from "@/assets/image/youtube/line-right.webp";
import pacRight from "@/assets/image/youtube/pack-right.webp";

// мета теги для україномовного сайту
const ukraineMetaData = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const key = params.url;
  return {
    title: `Завантажити відео з ${key}`,
  };
};

// мета теги для англомовного сайту
const englishMetaData = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const key = params.url;
  return {
    title: `Download video from ${key}`,
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

// Функція рендеру сторінки завантаження
export default async function Download({ params }: { params: Params }) {
   // Функція що отримує статус мови та ресурси для перекладу
  const { t, resources } = await initTranslations(params?.locale, [
    "youtube",
    "elements",
  ]);

  // Рендер статичної та динамічної верстки сторінки динаміна приходить з файлу WrapperForDownload 
  // переклади передаються з серверного компонента в клієнський за рахунок TranslationsProvider
  return (
    <div className="relative">
      <Image
        src={lineRight}
        alt="line right"
        className="absolute hidden base:block z-10 top-[4%] right-0"
      />

      <Image
        src={pacRight}
        alt="line right"
        className="absolute hidden base:block z-10 bottom-[4%] right-0"
      />

      {/* Функція для передавання правильного перекладу */}
      {/* При додаванні нової мови потрібно додати сюди назву файлу  */}
      <TranslationsProvider
        locale={params.locale}
        namespaces={[
          "instagram",
          "music",
          "shorts",
          "soundcloud",
          "tiktok",
          "twitter",
          "youtube",
        ]}
        resources={resources}
      >
        {/* Компонент де відбувається клієнтська логіка додатку  */}
        <WrapperForDownload />
      </TranslationsProvider>
    </div>
  );
}
