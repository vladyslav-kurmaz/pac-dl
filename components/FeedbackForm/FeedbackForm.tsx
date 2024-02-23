"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonNormal from "../Button/ButtonNormal";
import validationForm from "@/utils/validationForm";

const FeedbackForm = () => {
  const { t } = useTranslation("feedback");
  const [focusTextArea, setFocusTextArea] = useState(false);

  const typeList = [
    t("question"),
    t("review"),
    t("proposal"),
    t("complaint"),
    t("error"),
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState(typeList[0]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (
      name?.length !== 0 &&
      email?.length !== 0 &&
      message?.length !== 0 &&
      !validationForm(name, "name")?.errorStatus &&
      !validationForm(email, "email")?.errorStatus &&
      !validationForm(message, "message")?.errorStatus
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [name, email, message]);

  const renderRadio = () => {
    return typeList.map((item, i) => {
      return (
        <div className="mb-3 md:mb-[14px]" key={item}>
          <label htmlFor={item} className="flex items-center ">
            <input
              checked={question === item ? true : false}
              onChange={() => setQuestion(item)}
              type="radio"
              id={item}
              name="question"
              className="hidden radio-input"
            />
            <div className="radio-input-marker w-7 md:w-10 h-7 md:h-10 border-slate-200 border rounded-full mr-[6px] md:mr-[10px] flex justify-center items-center">
              <span className="rounded-full block w-3 h-3 md:w-[20px] md:h-[20px] bg-slate-200"></span>
            </div>
            <span className="">{item}</span>
          </label>
        </div>
      );
    });
  };

  const sendForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const botToken = "6722538862:AAHCydfQXohTknKXSCK4FD695SX_9TYGQM0";
    const chatId = "-1002075216843";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    //
    const transform = `
    Запит з сайту https://pac-dl.vercel.app/
      Ім'я: ${name},
      Пошта: ${email},
      Тип звернення: ${question}
      ${message ? `Повідомлення: ${message}` : ""},
    `;

    const data = {
      chat_id: chatId,
      text: transform,
    };

    try {
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (request.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (e) {
      console.error(e);
    }
    setName("");
    setEmail("");
    setQuestion(typeList[0]);
    setMessage("");
  };

  return (
    <div className="relative">
      {success ? (
        <div className="w-full flex flex-col justify-center items-center h-[300px] mb-8 md:mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="217"
            // height="51"
            viewBox="0 0 217 51"
            className="w-1/2 mb-5 md:mb-8"
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

          <div className="text-[13px] base:text-2xl w-[47%] text-center font-semibold">
            {t("thanks")}
          </div>
        </div>
      ) : (
        <form
          onSubmit={sendForm}
          className="w-full flex flex-wrap justify-between mb-8 md:mb-12"
        >
          <label
            htmlFor="name"
            className="relative w-full md:w-[49%] md:mb-10 mb-6"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder={t("name")}
              className="rounded-[6px] md:rounded-[15px] w-full border border-slate-200 py-[9px] outline-none hover:border-black focus:border-black transition-all duration-500 hover:transition-all hover:duration-500 px-4 base:px-[33px] base:py-7 text-[14px] placeholder:text-[14px] placeholder:text-black base:text-base base:placeholder:text-base"
            />

            {validationForm(name, "name")?.errorStatus ? (
              <div className="absolute md:-bottom-6 -bottom-4 left-1 text-[10px] md:text-[16px] text-red-600">
                Введіть мінімум 2 символи
              </div>
            ) : null}
          </label>
          <label
            htmlFor="email"
            className="w-full md:w-[49%] md:mb-10 mb-6 relative"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
              placeholder={t("email")}
              className="rounded-[6px] md:rounded-[15px] w-full border border-slate-200 py-[9px] outline-none hover:border-black focus:border-black transition-all duration-500 hover:transition-all hover:duration-500 px-4 base:px-[33px] base:py-7 text-[14px] placeholder:text-[14px] placeholder:text-black base:text-base base:placeholder:text-base"
            />

            {validationForm(email, "email")?.errorStatus ? (
              <div className="absolute md:-bottom-6 -bottom-4 left-1 text-[10px] md:text-[16px] text-red-600">
                Формат емайла example@gmail.com
              </div>
            ) : null}
          </label>
          <div className="md:mb-0 mb-6 rounded-[6px] md:rounded-[15px] md:w-[49%] w-full border border-slate-200 py-[9px] px-[16px] md:py-7 md:px-[38px]">
            <h4 className="mb-7 md:mb-[30px] text-[14px] md:text-base">
              {t("type-appeal")}
            </h4>
            {renderRadio()}
          </div>

          <label
            htmlFor=""
            className={`relative label-feedback hover:border-black transition-all base:min-h-[331px] min-h-[231px] duration-500 hover:transition-all hover:duration-500 focus:border-black w-full rounded-[6px] md:rounded-[15px] md:w-[49%]  border border-slate-200 py-[9px] px-[16px] md:py-7 md:px-[38px] ${
              focusTextArea ? "border-black" : ""
            }`}
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="feedback w-full h-full text-[14px] placeholder:text-[14px] resize-none outline-none placeholder:text-black base:text-base base:placeholder:text-base"
              placeholder={t("message")}
              onFocus={() => setFocusTextArea(true)}
              onBlur={() => setFocusTextArea(false)}
            />

            {validationForm(message, "message")?.errorStatus ? (
              <div className="absolute md:-bottom-6 -bottom-4 left-1 text-[10px] md:text-[16px] text-red-600">
                Введіть мінімум 10 символів
              </div>
            ) : null}
          </label>

          <button
            disabled={disableButton}
            className={`mt-8 md:mt-12 md:ml-auto md:mr-0 mx-auto px-6 text-[13px] py-4 bg-violet2  disabled:opacity-50 disabled:hover:bg-violet2 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet1 rounded-md md:rounded-2xl md:px-14 md:py-7 md:text-base box-border`}
            onClick={() => {}}
          >
            {t("button")}
          </button>
        </form>
      )}
      {/* <div className="flex justify-end"> */}
      {/* <button
          disabled={disableButton}
          className={`px-4 text-[9px] py-3 bg-violet2  disabled:text-violet-200 disabled:hover:bg-violet2 transition-all duration-500 hover:transition-all hover:duration-500 hover:bg-violet1 rounded-md md:rounded-2xl md:px-14 md:py-7 md:text-base box-border`}
          onClick={() => {}}
        >
          {t("button")}
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default FeedbackForm;
