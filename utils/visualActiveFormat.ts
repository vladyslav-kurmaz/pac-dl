import { DowloadFormat } from "@/types/types";
import { TFunction } from "i18next";
import { Dispatch, SetStateAction } from "react";

// функція длі вибору правильного відображення форматів в залежності
// від вхідного відео формату
const visualActiveFormat = (
  videoFormat: string,
  video: DowloadFormat[],
  audio_only: DowloadFormat[],
  video_only: DowloadFormat[],
  setFormatData: Dispatch<SetStateAction<string | DowloadFormat[]>>,
  t: TFunction<"elements", undefined>
) => {
  switch (videoFormat) {
    case "popular": {
      video?.length > 0
        ? setFormatData([...video])
        : setFormatData(t("video-not-found"));
      break;
    }
    case "hd": {
      video?.length > 0
        ? setFormatData(
            video.filter((item) =>
              item?.format_note !== undefined
                ? +item?.format_note?.slice(0, item?.format_note?.length - 1) >=
                    720 ||
                  +item?.format_note >= 720 ||
                  +item?.resolution?.split("x")[1] >= 720 ||
                  item?.format_note === "hd"
                : t("video-not-found")
            )
          )
        : setFormatData(t("video-not-found"));
      break;
    }
    case "audio": {
      audio_only?.length > 0
        ? setFormatData([...audio_only])
        : setFormatData(t("audio-not-found"));
      break;
    }
    case "all-formats": {
      video?.length > 0 || audio_only?.length > 0 || video_only?.length > 0
        ? setFormatData([...video, ...audio_only, ...video_only])
        : setFormatData(t("formars-not-found"));
      break;
    }
  }
};

export default visualActiveFormat;