import { StaticImageData } from "next/image";

export type dataSelect = {
  flag: StaticImageData;
  value: string;
  text?: string;
};

export type dataSocialNetwork = {
  icon: StaticImageData;
  link: string;
};

export type DataVideo = {
  title: string;
  audio_only: DowloadFormat[];
  video_only: DowloadFormat[];
  video: DowloadFormat[];
  description: string;
  // formats_note: string[];
  // formats: string[];
  id: string;
  tag: string[];
  uploader_url: string;
  preview: string;
};

export type DowloadFormat = {
  download_url: string,
  ext: string,
  format_note: string,
  resolution: string
}

export type SimilarVideo = {
  title: string;
  video_url: string;
  preview_url: string;
  id: string;
};

export type TopTag = {
  created: string,
  id: string,
  name: string
}

