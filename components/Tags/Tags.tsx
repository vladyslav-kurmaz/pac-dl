import { Dispatch, SetStateAction, useEffect, useState } from "react";

// компонент рендера тегів під час завантаження відео
const RenderTags = ({
  tag,
  hightlightAll,
  setHightLightAll,
}: {
  tag: string;
  hightlightAll: string[];
  setHightLightAll: Dispatch<SetStateAction<string[]>>;
}) => {
  // статус вибраний тег ні
  const [active, setActive] = useState(false);

  // перевірка чи є тег в масиві вибраних тегів та додає йому стилі
  useEffect(() => {
    hightlightAll.includes(tag) ? setActive(true) : setActive(false);
  }, [hightlightAll]);

  // функція що перевіряє чи є тег в масиві вибраних компонентів та 
  // додає або видаляє його по необхідності
  const selectTags = (tag: string) => {
    if (hightlightAll.includes(tag)) {
      setActive(false);
      setHightLightAll((state) => state.filter((tagItem) => tagItem !== tag));
    } else {
      setActive(true);
      setHightLightAll((state) => state && [...state, tag]);
    }
  };

  return (
    <div
      key={tag}
      className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-1 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
        active ? "bg-grayCastom2" : ""
      }`}
      onClick={() => {
        selectTags(tag);
      }}
    >
      {tag}
    </div>
  );
};

export default RenderTags;
