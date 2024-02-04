import initTranslations from "@/app/i18n";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";

const Footer = async ({ params }: { params: Params }) => {
  const { t } = await initTranslations(params?.locale, ["footer"]);

  return (
    <footer className="w-full bg-violet1 px-5">
      <div className="max-w-lg w-full  pt-10 box-border mx-auto flex justify-center flex-col items-center base:pt-20 base:pb-40 base:justify-between base:flex-row ">
        <div className="mb-7 base:mb-0 base:pr-4 box-border ">
          <div className="mb-6 w-28 md:w-52">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="217"
              // height="51"
              viewBox="0 0 217 51"
              fill="none"
            >
              <path d="M216.668 38H211.708V8.48H216.668V38Z" fill="#1C1917" />
              <path
                d="M200.905 8.48H205.945V26.6V26.64C205.945 33.64 200.985 38.44 194.025 38.44C187.065 38.44 182.105 33.6 182.105 27C182.105 20.4 187.105 15.64 193.625 15.64C196.145 15.64 198.865 16.48 200.905 18.32V8.48ZM193.985 33.96C198.025 33.96 200.905 31.2 200.905 27C200.905 22.84 198.025 20.16 194.025 20.16C190.025 20.16 187.145 22.84 187.145 27.04C187.145 31.2 189.985 33.96 193.985 33.96Z"
                fill="#1C1917"
              />
              <path
                d="M179.834 27.04V30.92H164.434V27.04H179.834Z"
                fill="#1C1917"
              />
              <path
                d="M154.297 38.44C147.617 38.44 142.417 33.76 142.417 27.08C142.417 20.36 147.617 15.64 154.297 15.64C157.617 15.64 160.777 16.88 163.017 19.44L159.497 22.4C157.977 20.72 156.297 20.16 154.257 20.16C150.457 20.16 147.457 22.6 147.457 27.04C147.457 31.52 150.497 33.96 154.377 33.96C156.337 33.96 157.977 33.48 159.497 31.68L163.017 34.68C160.817 37.2 157.657 38.44 154.297 38.44Z"
                fill="#1C1917"
              />
              <path
                d="M138.289 27.48V27.52V38H133.289V35.72C131.289 37.64 128.529 38.44 125.969 38.44C119.449 38.44 114.449 33.68 114.449 27.12C114.449 20.52 119.409 15.64 126.369 15.64C133.329 15.64 138.289 20.48 138.289 27.48ZM126.369 33.96C130.369 33.96 133.249 31.28 133.249 27.12C133.249 22.92 130.369 20.16 126.329 20.16C122.329 20.16 119.489 22.92 119.489 27.08C119.489 31.28 122.369 33.96 126.369 33.96Z"
                fill="#1C1917"
              />
              <path
                d="M99.5601 15.64C106.52 15.64 111.52 20.52 111.52 27.12C111.52 33.68 106.52 38.44 100 38.44C97.4401 38.44 94.7201 37.64 92.6801 35.76V44.84H87.6401V27.52V27.48C87.6401 20.48 92.6401 15.64 99.5601 15.64ZM99.5601 33.96C103.6 33.96 106.48 31.28 106.48 27.08C106.48 22.92 103.64 20.16 99.6001 20.16C95.5601 20.16 92.6801 22.92 92.6801 27.12C92.6801 31.28 95.5601 33.96 99.5601 33.96Z"
                fill="#1C1917"
              />
              <path
                d="M65.3708 16.9428C65.5715 16.827 65.79 16.7428 66 16.644V16.3862C65.7807 15.9547 65.543 15.5309 65.3446 15.0893C58.4973 -0.0973969 39.579 -4.80093 26.59 5.5101C21.2589 9.74274 18.1448 15.3039 17.2648 22.074C17.1027 23.3222 17.0618 24.5859 16.9591 25.9129H9.18086V29.7611H9.90341C12.2231 29.7611 14.5429 29.755 16.8626 29.7719C17.0787 29.7735 17.447 29.8831 17.4848 30.0166C17.8353 31.2464 18.1286 32.4931 18.4551 33.8008H7.37988V37.6335H8.11092C11.9553 37.6335 15.8004 37.642 19.6447 37.6227C20.1272 37.6204 20.4043 37.747 20.6645 38.1801C21.1933 39.0617 21.8108 39.89 22.4014 40.7337C22.6013 41.0201 22.8291 41.2872 23.1324 41.6763H13.8574V45.5044C14.1523 45.5044 14.4055 45.5044 14.6579 45.5044C18.6528 45.5044 22.6484 45.4944 26.6433 45.5206C27.037 45.5229 27.487 45.6681 27.8136 45.8904C33.3894 49.6853 39.5319 51.2238 46.1723 50.0945C55.1617 48.5652 61.5597 43.5135 65.3924 35.2281C65.5777 34.8267 65.7954 34.4407 65.9984 34.047V33.7892C64.9169 33.1894 63.8269 32.6035 62.7547 31.9867C59.0585 29.8615 55.3678 27.7262 51.6755 25.5933C51.491 25.4868 51.3104 25.3733 51.0557 25.2189C51.779 24.7974 52.4506 24.4037 53.1237 24.0147C57.2051 21.6564 61.2864 19.298 65.3693 16.9428H65.3708ZM60.9583 35.408C57.3641 42.4367 48.4272 48.2217 37.9617 46.1451C28.1108 44.1905 20.8482 35.2551 20.8945 25.1518C20.9408 15.036 28.2397 6.17089 38.0343 4.28037C48.5283 2.25476 57.4328 8.09538 60.9576 15.0384C55.1123 18.4141 49.2647 21.7907 43.3222 25.2228C49.2694 28.6572 55.1146 32.0338 60.9583 35.408Z"
                fill="#1C1917"
              />
              <path d="M0 37.6559H4.21025V33.7884H0V37.6559Z" fill="#1C1917" />
              <path
                d="M6.47607 45.4674H10.6531V41.6724H6.47607V45.4674Z"
                fill="#1C1917"
              />
              <path
                d="M43.5562 15.1511H47.3851V11.3469H43.5562V15.1511Z"
                fill="#1C1917"
              />
            </svg>
          </div>

          <p className="mb-4 font-semibold text-center base:text-start">{t("ligal-info")}</p>
          <ul className="max-w-[210px]">
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="policy">
                {t("policy")}
              </Link>
            </li>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("licence")}
              </Link>
            </li>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("saved-autors")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-7 base:mb-0 max-w-[520px] base:pr-4 box-border">
          <p className="mb-4 font-semibold text-center base:text-start">{t("how-download")}</p>
          <div className="flex w-full items-center flex-col base:flex-row">
            <ul className="flex flex-wrap max-w-[210px]">
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("twitter")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("tiktok")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("instagram")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("youtube")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("facebook")}
                </Link>
              </li>
              {/* <li>{t("shorts")}</li>
              <li>{t("tiktok-music")}</li>
              <li>{t("instagram-music")}</li>
              <li>{t("youtube-music")}</li>
              <li>{t("soundcloud")}</li> */}
            </ul>

            <ul className="flex flex-wrap max-w-[210px]">
              {/* <li>{t("twitter")}</li>
              <li>{t("tiktok")}</li>
              <li>{t("instagram")}</li>
              <li>{t("youtube")}</li>
              <li>{t("facebook")}</li> */}
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("shorts")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("tiktok-music")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("instagram-music")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("youtube-music")}
                </Link>
              </li>
              <li className="mb-2.5 w-full text-center base:text-start">
                <Link className="link text-sm base:text-base" href="">
                  {t("soundcloud")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="">
          <p className="mb-4 font-semibold text-center base:text-start">{t("info")}</p>
          <ul>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("popular-video")}
              </Link>
            </li>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("top-download-video")}
              </Link>
            </li>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("video-trends")}
              </Link>
            </li>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("suppliy")}
              </Link>
            </li>
            <li className="mb-2.5 text-center base:text-start">
              <Link className="link text-sm base:text-base" href="">
                {t("feedback")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
