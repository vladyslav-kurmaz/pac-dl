import initTranslations from "@/app/i18n";
import lineRight from "@/assets/image/youtube/line-right.webp";
import FeedbackForm from "@/components/FeedbackForm/FeedbackForm";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";

export default async function Feedback({ params }: { params: Params }) {
  const { t, resources } = await initTranslations(params?.locale, ["feedback"]);
  return (
    <div className="relative pt-20 base:pt-48 ">
      <Image
        src={lineRight}
        alt="line right"
        className="absolute hidden base:block z-10 top-[4%] right-0"
      />
      <div className="base:max-w-lg mx-auto px-4 relative z-20 pb-7 md:pb-24">
        <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {t("title")}
        </h1>

        <TranslationsProvider
          locale={params.locale}
          namespaces={"feedback"}
          resources={resources}
        >
          <FeedbackForm />
        </TranslationsProvider>
      </div>
    </div>
  );
}
