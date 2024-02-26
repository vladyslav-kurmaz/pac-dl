"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import facebookIcon from "@/assets/image/social/facebook.webp";
import youtubeIcon from "@/assets/image/social/youtube.webp";
import tictokIcon from "@/assets/image/social/tictok.webp";
import twitterIcon from "@/assets/image/social/twitter.webp";
import instagramIcon from "@/assets/image/social/instagram.webp";
import soundcloudIcon from "@/assets/image/social/soundcloud.webp";

import plusIcon from "../../assets/image/icons/plus.webp";

const Resources = ({
  text,
}: {
  text: string;
}) => {
  // коли більше 10 соціальних мереж відображаєть кнопка більше при натисканні на яку змінюється цей стейт
  const [seeMore, setSeeMore] = useState(false);

  // список соціальних мереж icon це посилання на іконку link це посилання на сторінку
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
   
  ];

  // рендер іконок
  const renderIcons = () => {
    return sosialNetworks.map((item, i) => {
      const { icon, link } = item;
      if (i < 9) {
        return (
          <Link
            href={`/${link}`}
            className={`w-6 h-6 base:w-9 base:h-9 my-4 mr-4  base:mr-7 `}
            key={link}
            
          >
            {/* ${seeMore && 'mb-3 base:mb-4'} */}
            <Image src={icon} priority={true} alt={link} className="w-full " />
          </Link>
        );
      } else {
        return (
          <Link
            href={`/${link}`}
            className={`w-6 h-6 base:w-9 base:h-9 my-4 mr-4 base:mr-9 ${
              seeMore ? "block" : "hidden"
            }`}
            key={link}
          >
            <Image src={icon} alt={link} />
          </Link>
        );
      }
    });
  };

  // відображення в залежності від кількості іконок
  const style =
    sosialNetworks?.length > 9
      ? "justify-start w-9/12"
      : "justify-around w-full";

  return (
    <div className="w-full bg-grayCastom px-4 py-1 base:px-10 rounded-md base:rounded-2xl flex justify-between items-center">
      <div className={`flex flex-wrap ${style} items-center `}>
        {renderIcons()}
      </div>

      {/* більше 9 іконок відображаємо кнопку */}
      {sosialNetworks?.length > 9 && (
        <div
          className="base:w-[170px] w-[80px] flex flex-col base:flex-row   justify-between items-center"
          onClick={() => setSeeMore((state) => !state)}
        >
          <Image
            src={plusIcon}
            alt="plus"
            className="w-7 h-7 base:w-8 base:h-8 mb-2 base:mb-0"
          />
          <span className="text-[9px] base:text-base">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Resources;
