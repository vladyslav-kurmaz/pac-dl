import initTranslations from "@/app/i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


export default async function Policy({params}: {params: Params}) {
  
  const { t } = await initTranslations(params?.locale, [
    "policy",
  ]);

  return (
    <div className="pt-20 base:pt-48">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="text-lg base:text-[40px] font-bold text-center mb-9 base:mb-14">{t("title")}</h2>

        <p className="text-[13px] base:text-2xl mb-3 base:mb-6">
          Lorem ipsum dolor sit amet consectetur. Congue mi ridiculus eget neque habitasse viverra nunc. Tellus pharetra ultrices convallis faucibus. Tellus a arcu eu nibh et nibh penatibus lectus at. Nunc enim et libero tempus. Fames ultricies tincidunt ipsum dui. Id gravida sit morbi turpis porta.
        </p>

        <p className="text-[13px] base:text-2xl mb-3 base:mb-6">
          Lorem ipsum dolor sit amet consectetur. Congue mi ridiculus eget neque habitasse viverra nunc. Tellus pharetra ultrices convallis faucibus. Tellus a arcu eu nibh et nibh penatibus lectus at. Nunc enim et libero tempus. Fames ultricies tincidunt ipsum dui. Id gravida sit morbi turpis porta.
        </p>

        <p className="text-[13px] base:text-2xl mb-3 base:mb-6">
          Lorem ipsum dolor sit amet consectetur. Congue mi ridiculus eget neque habitasse viverra nunc. Tellus pharetra ultrices convallis faucibus. Tellus a arcu eu nibh et nibh penatibus lectus at. Nunc enim et libero tempus. Fames ultricies tincidunt ipsum dui. Id gravida sit morbi turpis porta.
        </p>
      </div>
    </div>
  )
}