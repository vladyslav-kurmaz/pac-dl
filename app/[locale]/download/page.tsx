import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";
import WrapperForDownload from "@/components/WrapperForDownload/WrapperForDownload";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function Download({params}: {params: Params}) {
  const { t, resources } = await initTranslations(params?.locale, [
    "youtube",
    "elements",
  ]);
  return (
    <div className="">

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
        resources={resources}>
          <WrapperForDownload/>
      </TranslationsProvider>

    </div>
  )
}
