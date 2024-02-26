import { TopTag } from "@/types/types";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

// компонент що рендеритть теги
const CatalogTags = ({
  // список тегів
  tags,
  // активний тег
  activeTag,
  // функіця що оприділяє активний тег
  setActiveTag,
  // переклад тегу Всі відео в залежності від локалізації
  allVideo,
}: {
  tags: TopTag[];
  activeTag: string;
  setActiveTag: Dispatch<SetStateAction<string>>;
  allVideo: string;
}) => {

  // Функція рендеру тега Всі відео
  const allTags = () => {
    return (
      <Link
        href={`/catalogue?tag=${allVideo}`}
        key={0}
        onClick={() => setActiveTag(allVideo)}
        className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-2 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
          activeTag === allVideo ? "bg-violet2" : "bg-grayCastom2"
        }`}
      >
        {allVideo}
      </Link>
    );
  };

  // Функція рендеру тегів що приходять з бекенду
  const renderTag = () => {
    return tags?.map((item) => {
      const { id, name } = item;
      return (
        <Link
          href={`/catalogue?tag=${name}`}
          key={id}
          onClick={() => setActiveTag(name)}
          className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-2 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
            activeTag === name ? "bg-violet2" : "bg-grayCastom2"
          }`}
        >
          {name}
        </Link>
      );
    });
  };

  // Рендер всіх тегів у обгортку та повернення їх на компонент вище 
  return (
    <div className="flex flex-wrap ">
      {Array.isArray(tags) ? allTags() : null}
      {Array.isArray(tags) ? renderTag() : null}
    </div>
  );
};

export default CatalogTags;
