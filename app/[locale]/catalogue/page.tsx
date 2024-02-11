import initTranslations from "@/app/i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import CatalogWrapper from "@/components/CatalogWrapper/CatalogWrapper";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";

const ukraineMetaData = {
  title: "Каталог завантажень",
};

const englishMetaData = {
  title: "Catalogue",
};

export async function generateMetadata({ params }: { params: Params }) {
  return params.locale === "en" ? englishMetaData : ukraineMetaData;
}

export default async function Catalogue({params}: {params: Params}) {
  const { t, resources } = await initTranslations(params?.locale, [
    "catalogue",
  ]);

  return (
    <div className="relative pt-20 base:pt-48 ">
      <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
        {t("title")}
      </h2>

      <TranslationsProvider 
        locale={params.locale}
        namespaces={"catalogue"}
        resources={resources}
      >
        <CatalogWrapper/>
      </TranslationsProvider>
      


    </div>
  );
}
