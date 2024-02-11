import Image from "next/image";
import initTranslations from "@/app/i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Input from "@/components/Input/Input";

import facebookIcon from "@/assets/image/social/facebook.webp";
import youtubeIcon from "@/assets/image/social/youtube.webp";
import tictokIcon from "@/assets/image/social/tictok.webp";
import twitterIcon from "@/assets/image/social/twitter.webp";
import instagramIcon from "@/assets/image/social/instagram.webp";
import soundcloudIcon from "@/assets/image/social/soundcloud.webp";
import urlOne from "@/assets/image/youtube/youtubeOne.webp";
import urlTwo from "@/assets/image/youtube/youtubeTwo.webp";
import video from "@/assets/image/youtube/video.webp";
import audio from "@/assets/image/youtube/audio.webp";
import free from "@/assets/image/youtube/free.webp";
import noprogram from "@/assets/image/youtube/noprogram.webp";

import lineRight from "@/assets/image/youtube/line-right.webp";
import lineLeft from "@/assets/image/youtube/line-left.webp";
import pacRight from "@/assets/image/youtube/pack-right.webp";
import pacLeft from "@/assets/image/youtube/pack-left.webp";

import clipIcon from "@/assets/image/icons/clip.webp";
import Resources from "@/components/Resources/Resources";
import TopVideo from "@/components/TopVideo/TopVideo";
import Accordion from "@/components/Accordion/Accordion";
import TranslationsProvider from "@/components/TranslationProvider/TranslationProvider";
import WraperForClientContentOnMainPage from "@/components/WraperForClientContentOnMainPage/WraperForClientContentOnMainPage";

const ukraineMetaData = {
  title: "Завантажити відео з Tiktok",
};

const englishMetaData = {
  title: "Download vidio from Tiktok",
};

export async function generateMetadata({ params }: { params: Params }) {
  return params.locale === "en" ? englishMetaData : ukraineMetaData;
}

export default async function Tiktok({ params }: { params: Params }) {
  const { t, resources } = await initTranslations(params?.locale, [
    "tiktok",
    "elements",
  ]);

  const sosialNetworks = [
    {
      icon: facebookIcon,
      link: "facebook",
    },
    {
      icon: youtubeIcon,
      link: "",
    },
    {
      icon: tictokIcon,
      link: "tiktok",
    },
    {
      icon: twitterIcon,
      link: "twitter",
    },
    {
      icon: instagramIcon,
      link: "instagram",
    },
    {
      icon: soundcloudIcon,
      link: "soundcloud",
    },

    // {
    //   icon: facebookIcon,
    //   link: 'facebook'
    // },
    // {
    //   icon: youtubeIcon,
    //   link: 'youtube'
    // },
    // {
    //   icon: tictokIcon,
    //   link: 'tictok'
    // },
    // {
    //   icon: twitterIcon,
    //   link: 'twitter'
    // },
    // {
    //   icon: instagramIcon,
    //   link: 'instagram'
    // },
    // {
    //   icon: soundcloudIcon,
    //   link: 'soundcloud'
    // }
  ];

  const dataFaq = [
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Lectus lectus eget at a. Nisi quam? ",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Ultrices gravida rutrum interdum ac sed nunc orci. Est imperdiet volutpat eu eget eu et in urna. Tortor massa duis semper consequat. Dui blandit lectus est libero vitae arcu lorem fermentum.",
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Lectus lectus eget at a. Nisi quam? ",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Ultrices gravida rutrum interdum ac sed nunc orci. Est imperdiet volutpat eu eget eu et in urna. Tortor massa duis semper consequat. Dui blandit lectus est libero vitae arcu lorem fermentum.",
    },
    {
      title:
        "Lorem ipsum dolor sit amet consectetur. Lectus lectus eget at a. Nisi quam? ",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Ultrices gravida rutrum interdum ac sed nunc orci. Est imperdiet volutpat eu eget eu et in urna. Tortor massa duis semper consequat. Dui blandit lectus est libero vitae arcu lorem fermentum.",
    },
  ];

  return (
    <div className="relative pt-20 base:pt-48 ">
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

      <div className="z-20 relative base:max-w-lg mx-auto px-4">
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
          <WraperForClientContentOnMainPage
            sosialNetworks={sosialNetworks}
            namespaces={"tiktok"}
          />
        </TranslationsProvider>

        <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[32px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {t("faq")}
        </h2>
        <div className="mb-7 base:mb:24">
          {
            dataFaq.map((item, i) => {
              return <Accordion data={item} key={i}/>
            })
          }
        </div>

        <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[32px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {t("how-download")}
        </h2>
        <div className="mb-7 base:mb:24">
          <p className="text-[13px] base:text-2xl mb-3 base:mb-[66px]">
            {t("how-download-text")}
          </p>

          <ul className="flex flex-col  ">
            <li className="flex justify-between items-center mb-7 ">
              <span className="w-full max-w-[53px] base:w-[97px] h-[52px] base:max-w-[97px] base:h-[97px]  text-xl base:text-3xl flex justify-center items-center bg-slate-50 rounded-full">
                1
              </span>
              <p className="base:w-4/5 w-11/12 base:max-w-[900px] text-xs base:text-2xl">
                {t("how-download-item1")}
              </p>
            </li>
            <li className="flex justify-between items-center mb-7 ">
              <span className="w-full max-w-[53px] base:w-[97px] h-[52px] base:max-w-[97px] base:h-[97px] text-xl base:text-3xl flex justify-center items-center bg-slate-50 rounded-full">
                2
              </span>
              <p className="base:w-4/5 w-11/12 base:max-w-[900px] text-xs base:text-2xl">
                {t("how-download-item2")}
              </p>
            </li>
            <li className="flex justify-between items-center mb-7 ">
              <span className="w-full max-w-[53px] base:w-[97px] h-[52px] base:max-w-[97px] base:h-[97px] text-xl base:text-3xl flex justify-center items-center bg-slate-50 rounded-full">
                3
              </span>
              <p className="base:w-4/5 w-11/12 base:max-w-[900px] text-xs base:text-2xl">
                {t("how-download-item3")}
              </p>
            </li>
          </ul>
        </div>

        <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[32px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {t("how-fast-download")}
        </h2>

        <div className="mb-7 base:mb:24">
          <div className="">
            <div className="flex flex-col base:flex-row base:justify-between items-center mb-3 base:mb-6">
              <p className="max-w-[644px] mb-3 base:mb-0 text-xs base:text-2xl">
                {t("how-fast-download-text1")}
              </p>
              <Image
                src={urlOne}
                alt="url"
                className="w-full mb-3 base:mb-0 max-w-[323px] h-[94px] base:h-[127px] base:max-w-[430px]"
              />
            </div>
            <div className="flex flex-col-reverse base:flex-row base:justify-between items-center mb-3 base:mb-6">
              <Image
                src={urlTwo}
                alt="url2"
                className="w-full mb-3 base:mb-0 h-[94px] base:h-[127px] max-w-[323px] base:max-w-[430px]"
              />
              <p className="max-w-[644px] mb-3 base:mb-0 text-xs base:text-2xl">
                {t("how-fast-download-text2")}
              </p>
            </div>
            <p className="text-xs base:text-2xl">
              {t("how-fast-download-text3")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap flex-col base:flex-row base:justify-between items-center base:items-start">
          {/* h-full max-h-[196px] base:max-h-[397px] */}
          <div className="max-w-[168px] base:max-w-[496px] w-full h-full max-h-[392px] base:max-h-[596px] mb-7 base:mb-14">
            <Image
              src={video}
              alt="video"
              className="w-[68px] h-[68px] base:w-[164px] base:h-[164px] mb-3 base:mb-6"
            />
            <h3 className="text-xs base:text-2xl font-semibold mb-2 base:mb-6">
              {t("video-title")}
            </h3>
            <p className="text-xs base:text-2xl">{t("video-text")}</p>
          </div>
          {/* h-full max-h-[196px] base:max-h-[397px] */}
          <div className="max-w-[168px] base:max-w-[496px] w-full h-full max-h-[392px] base:max-h-[596px] mb-7 base:mb-14">
            <Image
              src={audio}
              alt="audio"
              className="w-[68px] h-[68px] base:w-[164px] base:h-[164px] mb-3 base:mb-6"
            />
            <h3 className="text-xs base:text-2xl font-semibold mb-2 base:mb-6">
              {t("audio-title")}
            </h3>
            <p className="text-xs base:text-2xl">{t("audio-text")}</p>
          </div>
          {/* h-full max-h-[196px] base:max-h-[397px] */}
          <div className="max-w-[168px] base:max-w-[496px] w-full h-full max-h-[392px] base:max-h-[596px] mb-7 base:mb-14">
            <Image
              src={free}
              alt="free"
              className="w-[68px] h-[68px] base:w-[164px] base:h-[164px] mb-3 base:mb-6"
            />
            <h3 className="text-xs base:text-2xl font-semibold mb-2 base:mb-6">
              {t("free-title")}
            </h3>
            <p className="text-xs base:text-2xl">{t("free-text")}</p>
          </div>
          {/* */}
          <div className="max-w-[168px] base:max-w-[496px] w-full  h-full max-h-[392px] base:max-h-[596px] mb-7 base:mb-14">
            <Image
              src={noprogram}
              alt="noprogram"
              className="w-[68px] h-[68px] base:w-[164px] base:h-[164px] mb-3 base:mb-6"
            />
            <h3 className="text-xs base:text-2xl font-semibold mb-2 base:mb-6">
              {t("noprogram-title")}
            </h3>
            <p className="text-xs base:text-2xl">{t("noprogram-text")}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold leading-6 base:leading-9 base:text-[32px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {t("how-download-phone-title")}
        </h2>

        <div className="flex flex-col mb-7 base:mb-14">
          <p className="mb-3 base:mb-6 text-xs base:text-2xl">
            {t("how-download-phone-text1")}
          </p>
          <p className="mb-3 base:mb-6 text-xs base:text-2xl">
            {t("how-download-phone-text2")}
          </p>
        </div>

        <div className="flex base:justify-between flex-col items-center base:flex-row base:items-start mb-7 base:mb-14">
          <div className="w-full base:w-9/12">
            <h3 className="text-[13px] base:text-2xl font-bold text">
              {t("how-download-android-title")}
            </h3>
            <p className="text-xs base:text-2xl mb-3 base:mb-6">
              {t("how-download-android-text1")}
            </p>
            <p className="text-xs base:text-2xl mb-3 base:mb-0">
              {t("how-download-android-text2")}
            </p>
          </div>
          <svg
            className="w-[254px] h-[518px] base:w-[209px] base:h-[456px]"
            xmlns="http://www.w3.org/2000/svg"
            width="209"
            height="426"
            viewBox="0 0 209 426"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M161 10H48C39.4342 10 33.6113 10.0078 29.1104 10.3755C24.7262 10.7337 22.4842 11.383 20.9202 12.1799C17.1569 14.0973 14.0973 17.1569 12.1799 20.9202C11.383 22.4842 10.7337 24.7262 10.3755 29.1104C10.0078 33.6113 10 39.4342 10 48V378C10 386.566 10.0078 392.389 10.3755 396.89C10.7337 401.274 11.383 403.516 12.1799 405.08C14.0973 408.843 17.1569 411.903 20.9202 413.82C22.4842 414.617 24.7262 415.266 29.1104 415.624C33.6113 415.992 39.4342 416 48 416H161C169.566 416 175.389 415.992 179.89 415.624C184.274 415.266 186.516 414.617 188.08 413.82C191.843 411.903 194.903 408.843 196.82 405.08C197.617 403.516 198.266 401.274 198.624 396.89C198.992 392.389 199 386.566 199 378V48C199 39.4342 198.992 33.6113 198.624 29.1104C198.266 24.7262 197.617 22.4842 196.82 20.9202C194.903 17.1569 191.843 14.0973 188.08 12.1799C186.516 11.383 184.274 10.7337 179.89 10.3755C175.389 10.0078 169.566 10 161 10ZM3.2698 16.3803C0 22.7976 0 31.1984 0 48V378C0 394.802 0 403.202 3.2698 409.62C6.14601 415.265 10.7354 419.854 16.3803 422.73C22.7976 426 31.1984 426 48 426H161C177.802 426 186.202 426 192.62 422.73C198.265 419.854 202.854 415.265 205.73 409.62C209 403.202 209 394.802 209 378V48C209 31.1984 209 22.7976 205.73 16.3803C202.854 10.7354 198.265 6.14601 192.62 3.2698C186.202 0 177.802 0 161 0H48C31.1984 0 22.7976 0 16.3803 3.2698C10.7354 6.14601 6.14601 10.7354 3.2698 16.3803Z"
              fill="#EDE9FE"
            />
          </svg>
        </div>

        <div className="flex base:justify-between flex-col-reverse items-center base:flex-row base:items-start mb-7 base:mb-14">
          <svg
            className="w-[254px] h-[518px] base:w-[209px] base:h-[456px]"
            xmlns="http://www.w3.org/2000/svg"
            width="209"
            height="426"
            viewBox="0 0 209 426"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M161 10H48C39.4342 10 33.6113 10.0078 29.1104 10.3755C24.7262 10.7337 22.4842 11.383 20.9202 12.1799C17.1569 14.0973 14.0973 17.1569 12.1799 20.9202C11.383 22.4842 10.7337 24.7262 10.3755 29.1104C10.0078 33.6113 10 39.4342 10 48V378C10 386.566 10.0078 392.389 10.3755 396.89C10.7337 401.274 11.383 403.516 12.1799 405.08C14.0973 408.843 17.1569 411.903 20.9202 413.82C22.4842 414.617 24.7262 415.266 29.1104 415.624C33.6113 415.992 39.4342 416 48 416H161C169.566 416 175.389 415.992 179.89 415.624C184.274 415.266 186.516 414.617 188.08 413.82C191.843 411.903 194.903 408.843 196.82 405.08C197.617 403.516 198.266 401.274 198.624 396.89C198.992 392.389 199 386.566 199 378V48C199 39.4342 198.992 33.6113 198.624 29.1104C198.266 24.7262 197.617 22.4842 196.82 20.9202C194.903 17.1569 191.843 14.0973 188.08 12.1799C186.516 11.383 184.274 10.7337 179.89 10.3755C175.389 10.0078 169.566 10 161 10ZM3.2698 16.3803C0 22.7976 0 31.1984 0 48V378C0 394.802 0 403.202 3.2698 409.62C6.14601 415.265 10.7354 419.854 16.3803 422.73C22.7976 426 31.1984 426 48 426H161C177.802 426 186.202 426 192.62 422.73C198.265 419.854 202.854 415.265 205.73 409.62C209 403.202 209 394.802 209 378V48C209 31.1984 209 22.7976 205.73 16.3803C202.854 10.7354 198.265 6.14601 192.62 3.2698C186.202 0 177.802 0 161 0H48C31.1984 0 22.7976 0 16.3803 3.2698C10.7354 6.14601 6.14601 10.7354 3.2698 16.3803Z"
              fill="#EDE9FE"
            />
          </svg>
          <div className="w-full base:w-9/12">
            <h3 className="text-[13px] base:text-2xl font-bold text">
              {t("how-download-ios-title")}
            </h3>
            <p className="text-xs base:text-2xl">
              {t("how-download-ios-text1")}
            </p>
            <ul className="list-disc pl-5 base:mb-6 mb-3 ">
              <li className="text-xs base:text-2xl">
                {t("how-download-ios-item1")}
              </li>
              <li className="text-xs base:text-2xl">
                {t("how-download-ios-item2")}
              </li>
            </ul>
            <p className="text-xs base:text-2xl mb-3 base:mb-0">
              {t("how-download-ios-text2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
