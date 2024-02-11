import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";
import WrapperForDownload from "@/components/WrapperForDownload/WrapperForDownload";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

import lineRight from "@/assets/image/youtube/line-right.webp";
import pacRight from "@/assets/image/youtube/pack-right.webp";

export default async function Download({ params }: { params: Params }) {
  const { t, resources } = await initTranslations(params?.locale, [
    "youtube",
    "elements",
  ]);
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
        <WrapperForDownload />
      </TranslationsProvider>
    </div>
  );
}
