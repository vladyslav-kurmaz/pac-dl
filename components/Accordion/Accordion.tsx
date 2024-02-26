"use client";
import Image from "next/image";
import arrowIcon from "../../assets/image/icons/ask.webp";
import { useState } from "react";

// Компонент Accordion приймає дату об'єкта { title: string; answer: string }
// використовується для відображення акордіонів на сторінках
const Accordion = ({ data }: { data: { title: string; answer: string } }) => {
  // стейт відкриття та закриття акордіону
  const [openAnswer, setOpenAnswer] = useState(false);
  // деструктизація data
  const { title, answer } = data;

  // анімація відкриття акордиону
  const openAccordion = openAnswer
    ? { maxHeight: "100%", transition: "all .5s" }
    : { maxHeight: "auto", transition: "all .5s" };
  // анімація обертання стрілки 
  const arrowStyle = openAnswer
    ? { transform: "rotate(90deg)", transition: "all .5s" }
    : { transform: "rotate(0deg", transition: "all .5s" };
  // анімація відкриття тексту
  const openAnswerAnimation = openAnswer
    ? {
        overflow: "",
        maxHeight: "500px",
        transition: "all .5s",
      }
    : {
        overflow: "hidden",
        maxHeight: "0px",
        transition: "all .5s",
      };

  // рендер акордиону
  return (
    <div
      className={` bg-slate-50 rounded-[6px] base:rounded-[15px] transition-all duration-500 mb-3 base:mb-6 py-3 px-4 base:py-6 base:px-9 `}
      key={title}
      style={openAccordion}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[13px] base:text-2xl font-bold mr-3">{title}</h3>
        <Image
          src={arrowIcon}
          alt="alt"
          onClick={(e) => setOpenAnswer((state) => !state)}
          className="w-7 h-7 base:w-[51px] base:h-[51px] cursor-pointer transition-all duration-500"
          style={arrowStyle}
        />
      </div>

      <p className={`text-[13px]  base:text-2xl w-11/12 `} style={openAnswerAnimation}>
        {answer}
      </p>
    </div>
  );
};

export default Accordion;
