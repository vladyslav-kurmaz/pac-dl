"use client";

import { dataSocialNetwork } from "@/types/types";
import StatickContent from "../StatickContent/StatickContent";
import Input from "@/components/Input/Input";

import clipIcon from "@/assets/image/icons/clip.webp";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import Image from "next/image";

import lineRight from "@/assets/image/youtube/line-right.webp";
import lineLeft from "@/assets/image/youtube/line-left.webp";
import pacRight from "@/assets/image/youtube/pack-right.webp";
import pacLeft from "@/assets/image/youtube/pack-left.webp";

const WraperForClientContentOnMainPage = ({
  sosialNetworks,
  dataFaq,
  namespaces,
}: {
  sosialNetworks: dataSocialNetwork[];
  dataFaq: {
    title: string;
    answer: string;
  }[];
  namespaces: string;
}) => {
  const { t, i18n } = useTranslation("elements");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <>
          <Image
            src={lineRight}
            alt="line right"
            className="absolute hidden base:block z-10 top-[10%] right-0"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute hidden base:block bottom-0 right-0 w-[800px]"
            viewBox="0 0 875 958"
            fill="none"
          >
            <path
              d="M1100.06 321.397C1103.86 319.201 1108.01 317.604 1111.99 315.73V310.839C1107.83 302.653 1103.32 294.614 1099.56 286.238C969.669 -1.84758 610.796 -91.0716 364.401 104.524C263.272 184.815 204.199 290.309 187.506 418.734C184.43 442.413 183.654 466.384 181.707 491.557H34.1568V564.556H47.8633C91.8676 564.556 135.872 564.438 179.876 564.761C183.976 564.79 190.961 566.869 191.679 569.403C198.327 592.73 203.892 616.38 210.086 641.186H-0.00683594V713.892H13.8607C86.7862 713.892 159.726 714.053 232.652 713.687C241.804 713.643 247.061 716.044 251.996 724.26C262.027 740.983 273.742 756.695 284.945 772.701C288.737 778.134 293.057 783.2 298.812 790.581H122.868V863.199C128.462 863.199 133.265 863.199 138.054 863.199C213.835 863.199 289.631 863.008 365.412 863.506C372.88 863.55 381.417 866.303 387.611 870.521C493.383 942.509 609.903 971.694 735.868 950.27C906.393 921.261 1027.76 825.433 1100.47 668.262C1103.98 660.647 1108.11 653.326 1111.96 645.857V640.966C1091.45 629.588 1070.77 618.474 1050.43 606.773C980.315 566.459 910.303 525.955 840.262 485.494C836.763 483.473 833.336 481.321 828.504 478.392C842.225 470.397 854.965 462.928 867.734 455.548C945.155 410.811 1022.58 366.075 1100.03 321.397H1100.06ZM1016.35 671.674C948.172 805.005 778.642 914.745 580.117 875.353C393.249 838.275 255.481 668.775 256.36 477.118C257.239 285.227 395.695 117.059 581.494 81.1968C780.56 42.7717 949.475 153.566 1016.34 285.271C905.456 349.308 794.53 413.359 681.803 478.465C794.618 543.615 905.5 607.667 1016.35 671.674Z"
              fill="#F8FAFC"
            />
          </svg>
        </>
      ) : (
        <>
          <Image
            src={lineRight}
            alt="line right"
            className="absolute hidden base:block z-10 top-[4%] right-0"
          />
          <Image
            src={lineRight}
            alt="line right"
            className="absolute hidden base:block z-10 top-[30%] right-0"
          />
          <Image
            src={pacLeft}
            alt="line right"
            className="absolute hidden base:block z-10 top-[10%] left-0"
          />
          <Image
            src={lineLeft}
            alt="line right"
            className="absolute hidden base:block z-10 top-[60%] left-0"
          />
          <Image
            src={pacRight}
            alt="line right"
            className="absolute hidden base:block z-10 bottom-[10%] right-0"
          />
        </>
      )}

      <div className="base:max-w-lg mx-auto px-4 relative z-20">
        <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {loading ? t("elements:loading") : t(`${namespaces}:title`)}
        </h1>

        <div className="mb-7 base:mb-24 relative z-30">
          <Input
            buttonRounded={t("elements:buttonRounded")}
            buttonNormal={t("elements:buttonNormal")}
            placeholder={t("elements:mainInputPlaceholder")}
            icon={clipIcon}
            setLoading={setLoading}
            loading={loading}
            // getProps={getInputProps}
          />
        </div>

        {loading ? (
          <LoadingPage />
        ) : (
          <StatickContent
            page={namespaces}
            language={i18n.language}
            dataFaq={dataFaq}
            sosialNetworks={sosialNetworks}
          />
        )}
      </div>
    </>
  );
};

export default WraperForClientContentOnMainPage;
