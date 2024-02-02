import { StaticImageData } from "next/image"

export type dataSelect = {
  flag: StaticImageData, 
  value: string, 
  text?: string
}

export type dataSocialNetwork = {
  icon: StaticImageData,
  link: string
  
}