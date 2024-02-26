import initTranslations from "@/app/i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// Функція що рендерити сторінку Політики конфіденційності
export default async function Policy({params}: {params: Params}) {
  
  const { t } = await initTranslations(params?.locale, [
    "policy",
  ]);

  return (
    <div className="pt-20 base:pt-48">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="text-lg base:text-[40px] font-bold text-center mb-9 base:mb-14">{t("title")}</h2>

        <p className="text-[13px] base:text-2xl mb-3 base:mb-6">
          {t("policy1")}
        </p>

        <p className="text-[13px] base:text-2xl mb-3 base:mb-6">
        {t("policy2")}
        </p>

        <p className="text-[13px] base:text-2xl mb-3 base:mb-6">
          {t("policy3")}
        </p>
      </div>
    </div>
  )
}