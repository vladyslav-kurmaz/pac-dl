import { TopTag } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

const CatalogTags = ({
  tags,
  activeTag,
  setActiveTag,
  allVideo,
}: {
  tags: TopTag[];
  activeTag: string;
  setActiveTag: Dispatch<SetStateAction<string>>;
  allVideo: string;
}) => {
  const allTags = () => {
    return (
      <div
        key={0}
        onClick={() => setActiveTag(allVideo)}
        className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-2 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
          activeTag === allVideo ? "bg-violet2" : "bg-grayCastom2"
        }`}
      >
        {allVideo}
      </div>
    );
  };

  const renderTag = () => {
    return tags.map((item) => {
      const { id, name } = item;
      return (
        <div
          key={id}
          onClick={() => setActiveTag(name)}
          className={`border-[1px] px-2 py-[7px] md:px-[30px] md:py-[15px] m-2 md:mb-3 md:mt-3 cursor-pointer border-grayCastom2 rounded-[30px] text-[9px] md:text-base ${
            activeTag === name ? "bg-violet2" : "bg-grayCastom2"
          }`}
        >
          {name}
        </div>
      );
    });
  };
  
  return (
    <div className="flex flex-wrap ">
      {allTags()}
      {Array.isArray(tags) ? renderTag() : null}
    </div>
  );
};

export default CatalogTags;
