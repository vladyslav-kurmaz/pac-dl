"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { useTranslation } from "react-i18next";
import Select from "../Select/Select";

import arrow from "../../assets/image/arrow.png";
import uk from "../../assets/image/flags/uk.webp";
import en from "../../assets/image/flags/en.webp";

const HamburgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation("header");

  const dataSelect = [
    {
      flag: uk,
      value: "uk",
      text: "Українська",
    },
    {
      flag: en,
      value: "en",
      text: "English",
    },
  ];

  useEffect(() => {
    showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");
  }, [showMenu]);

  return (
    <>
      <div className="z-20 relative">
        <Hamburger toggled={showMenu} toggle={setShowMenu} />
      </div>

      {showMenu && (
        <div className="openMenu flex base:hidden h-screen z-10 w-full fixed top-0 transition-all duration-500 bg-white left-0 items-center justify-center">
          <div className="flex flex-col w-full max-w-[200px]">
            <div className="max-w-[200px] w-full mb-7  ">
              <Select
                data={dataSelect}
                arrowIcon={arrow}
                classes="rounded-md bg-slate-50 py-3 px-3"
              ></Select>
            </div>
            <Link
              href="/"
              onClick={() => setShowMenu(false)}
              className="ml-0 mb-4 text-left link text-sm base:text-base"
            >
              {t("download_video")}
            </Link>
            <Link
              href="/shorts"
              onClick={() => setShowMenu(false)}
              className="ml-0 mb-4 link text-sm base:text-base"
            >
              {t("download_shorts")}
            </Link>
            <Link
              href="/audio"
              onClick={() => setShowMenu(false)}
              className="ml-0 mb-4 link text-sm base:text-base"
            >
              {t("download_audio")}
            </Link>
            <Link
              href="/cataloq"
              onClick={() => setShowMenu(false)}
              className="ml-0 mb-4 link text-sm base:text-base"
            >
              {t("catalogue")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
