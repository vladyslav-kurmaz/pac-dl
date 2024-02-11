import { Dispatch, SetStateAction, useEffect, useState } from "react";

const RenderTags = ({
  tag,
  hightlightAll,
  setHightLightAll,
}: {
  tag: string;
  hightlightAll: string[];
  setHightLightAll: Dispatch<SetStateAction<string[]>>;
}) => {
  // return tag.map((item, i) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    hightlightAll.includes(tag) ? setActive(true) : setActive(false);
  }, [hightlightAll]);

  const selectTags = (tag: string) => {
    if (hightlightAll.includes(tag)) {
      setHightLightAll(hightlightAll.filter((tag) => tag !== tag));
    } else {
      setHightLightAll((state) => state && [...state, tag]);
    }
  };

  return (
    <div
      key={tag}
      className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-2 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
        active ? "bg-grayCastom2" : ""
      }`}
      onClick={() => {
        setHightLightAll((state) => state && [...state, tag]);
        selectTags(tag);
      }}
    >
      {tag}
    </div>
  );
  // });
};

export default RenderTags;
