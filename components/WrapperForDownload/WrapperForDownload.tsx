"use client";

import { DataVideo, SimilarVideo } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import clipIcon from "@/assets/image/icons/clip.webp";

import { useTranslation } from "react-i18next";
import PacDlServices from "@/services/PacDlServices";
import DowloadPage from "../DowloadPage/DowloadPage";
import LoadingPage from "../LoadingPage/LoadingPage";

const WrapperForDownload = () => {
  const { t, i18n } = useTranslation("elements");
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { getVideoInfo } = PacDlServices();
  const url = searchParams.get("url");
  const [similarVideo, setSimilarVideo] = useState<SimilarVideo[] | null>(null);
  const [videoData, setVideoData] = useState<DataVideo | null>(
    null
    // {
    //   title: "sdfsfdsf",
    //   description: `Привіт! В цьому відео ви дізнаєтеся про базові вправи по пілотуванню FPV, які дадуть вам якісний базис для виконання польотів.

    //   💀 Про нас:
    //   Kamicopters - спільнота, що присвячена застосуванню дронів у різноманітних сферах. Наша місія - допомагати нашим військовим, збирати дрони, вчити цивільне населення цій справі і допомагати здобувати свободу!

    //   👍 Підписуйтеся на наш канал, ставте лайки та діліться враженнями у коментарях.

    //   🌐 Слідкуйте за нами:

    //   Facebook: https://www.facebook.com/profile.php?...
    //   Instagram:

    //     kamicopters
    //   Telegram: https://t.me/+s6f18iVVnAYyMWZi

    //   Наша перманентна банка на закупівлю: https://send.monobank.ua/jar/3Btf7wNrnr

    //   Music track: Too Hot by Aylex
    //   Source: https://freetouse.com/music
    //   Free Vlog Music Without Copyright

    //   Завжди раді бачити!  Разом ми сила! 🚀✨`,
    //   format_note: ["dfg"],
    //   formats: ["dfgdg"],
    //   id: "dfdsf",
    //   tag: [
    //     "sdsdf",
    //     "sdsdfsdf",
    //     "sdsdfwe",
    //     "sdsdfa",
    //     "sdsdfhj",
    //     "sdsdft",
    //     "sdsdfnb",
    //     "sdsdfv",
    //     "sdsdfasde",
    //     "sdsdfll'l;'",
    //     "sdsdfuyouioi",
    //     "sdsdf4546",
    //     "sdsdf890",
    //   ],
    //   uploader_url: "sdfsfd",
    //   preview:
    //     "data:image/jpeg;base64,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",
    // }
  );

  useEffect(() => {
    if (typeof url === "string" && videoData === null) {
      getVideo(url);
      // setInputValue(url);
    }
  }, []);

  const getVideo = async (url: string) => {
    // setLoading && setLoading(true);
    // if (router.)
    // router.push(`/download?url=${value}`)
    try {
      const postRequest = await getVideoInfo(url);

      setVideoData(postRequest.video_info);
      console.log(postRequest);
      setLoading(false);
      // router.push(`/download?url=${value}`, await postRequest);
      // setLoading && setLoading(false);
      // router.push(`/download?url=${value}`, await postRequest);
    } catch (e) {
      // setLoading && setLoading(false);
      setLoading(false);
      console.log(await e);
    }
  };

  return (
    <div className="relative pt-20 base:pt-48 ">
      <div className="px-2 md:px-6 base:max-w-lg mx-auto relative z-20">
        <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {loading ? t("elements:loading") : ""}
          {videoData !== null && searchParams.get("url") !== null
            ? videoData !== null && videoData.title
            : ""}
        </h1>

        <div className="mb-7 base:mb-24 relative z-30">
          <Input
            buttonRounded={t("elements:buttonRounded")}
            buttonNormal={t("elements:buttonNormal")}
            placeholder={t("elements:mainInputPlaceholder")}
            icon={clipIcon}
            setLoading={setLoading}
            loading={loading}
            data={videoData}
            setVideoData={setVideoData}
            // getProps={getInputProps}
          />
        </div>

        {loading && <LoadingPage />}
        {!loading && videoData && (
          <DowloadPage dataVideo={videoData} similarVideo={similarVideo} />
        )}
      </div>
    </div>
  );
};

export default WrapperForDownload;
