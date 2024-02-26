import { StaticImageData } from "next/image";

// типи даних що приймає Select
export type dataSelect = {
  flag: StaticImageData;
  value: string;
  text?: string;
};

export type dataSocialNetwork = {
  icon: StaticImageData;
  link: string;
};

// тип даних що приходять з бекенда
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

// тип форматів що скачуються з бекенду
export type DowloadFormat = {
  download_url: string,
  ext: string,
  format_note: string,
  resolution: string,
  product_type?: string
}

// тип для схожих відео
export type SimilarVideo = {
  title: string;
  video_url: string;
  preview_url: string;
  id: string;
  description?: string  
};

// тип для топ тегів
export type TopTag = {
  created: string,
  id: string,
  name: string
}

