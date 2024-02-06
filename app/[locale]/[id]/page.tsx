
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
import WraperForClientContentOnMainPage from "@/components/WraperForClientContentOnMainPage/WraperForClientContentOnMainPage";
import { useSearchParams } from "next/navigation";

const ukraineMetaData = {
  title: "Завантажити відео з Youtube shorts",
};

const englishMetaData = {
  title: "Download vidio from Youtube shorts",
};

export async function generateMetadata({ params }: { params: Params }) {
  return params.locale === "en" ? englishMetaData : ukraineMetaData;
}

export default async function Shorts({ params }: { params: Params }) {
  const { t, resources } = await initTranslations(params?.locale, ["elements"]);
  // const router = useSearchParams();
  // console.log(router);
  
  // const {  } = router;

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
        src={pacRight}
        alt="line right"
        className="absolute hidden base:block z-10 bottom-[10%] right-0"
      />

      <div className="base:max-w-lg z-20 relative mx-auto px-4">
        <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {t("title")}
        </h1>
        <div className="mb-7 base:mb-24">
          <Input
            buttonRounded={t("elements:buttonRounded")}
            buttonNormal={t("elements:buttonNormal")}
            placeholder={t("elements:mainInputPlaceholder")}
            icon={clipIcon}
          />
        </div>

       
      </div>
    </div>
  );
}
