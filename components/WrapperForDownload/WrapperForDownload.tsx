"use client";

import { DataVideo, SimilarVideo } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import clipIcon from "@/assets/image/icons/clip.webp";

import { useTranslation } from "react-i18next";
import PacDlServices from "@/services/PacDlServices";
import DowloadPage from "../DowloadPage/DowloadPage";
import LoadingPage from "../LoadingSkeleton/LoadingPage";
import { useRouter } from "next/navigation";

const WrapperForDownload = () => {
  const { t, i18n } = useTranslation("elements");
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { getVideoInfo } = PacDlServices();
  const url = searchParams.get("url");
  const [urlSearchParams, setUrlSerchParam] = useState(url);
  const router = useRouter();
  const inputErrors = [
    t("required"),
    t("error500"),
    t("errorValue"),
    t("errorNotFindVideo"),
    t("errorLongRequest"),
    t("errorDontSupport"),
  ];

  const [similarVideo, setSimilarVideo] = useState<SimilarVideo[]>([
    // {
    //   title: "test similar",
    //   video_url:
    //     "https://www.youtube.com/watch?v=S0jVBPIz7mk&ab_channel=BIHUSInfo",
    //   preview_url:
    //     "data:image/jpeg;base64,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",
    //   id: "dfgddfgg",
    // },
    // {
    //   title: "test similar",
    //   video_url:
    //     "https://www.youtube.com/watch?v=S0jVBPIz7mk&ab_channel=BIHUSInfo",
    //   preview_url:
    //     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKwAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAYFB//EADkQAAICAQMCBAQFAQgCAwEAAAECABEDBBIhMUEFEyJRYXGBkQYUMqHw0RUjQlKxweHxYnIzgqIk/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAHxEBAQEBAAMBAQADAAAAAAAAAAECEQMSITFBBCJh/9oADAMBAAIRAxEAPwDzzASCjDGpZe90TfT7TurrML5sOfUY9mbG9Moy1fTrf85maXaOl/eXMGVtm1ao0Txd/eS8vjmlPH5LG20/iGp06u2szo+PltvpYMDyPUD7/CU0Oi1OoxnDpmSgG9Tch+5uUf7NUMm0t5WXGCjlrBPeya4s+0s6VW02TIu/HvQgAKbu+hB6VOXGcz8dOtavyt54CMatjL+n59jNv4e4yKoBXj4zzXwnO67PNJPtzNl4bqiMJKlQR7jmazrlY1OxqBxFlPR5fOFvx85cnVm9c+pwQhCaIQhCAEjzL6S3YSSRakMcRCc3Fr8Ofrh+Jax9Pjr0qpv1Lz95ltdqA1NjJtrvmxOp4xj1DYWdgKBoAd/5xMpqU1XJXFkrqGCmq7H6zivbXVOSINXmKEk5PUO1EXM3rdSHe8pJHcAjiXddmGRtpKg9ye04msxMRalWB6sO8pjMY3VTPlAvygwo38JCdQX/APkJ/wDrEysbK9jILnTMxz3SZnN2auRMOdx4EQkntDeNtDiakKmGh14hAkfP5wmmSIjMOPtJsfnLexWsdQeDIgCnKk2pr5fOXl1GNjjy5WZ8m68gQEMKofLpMa1xrM6vf21l1mzFrv7nThVUriQAGuho8X8RzOg7aHfiPhuTOykerzQAVPwP0nJ8vSsCcpzncLx0eBz/AMRdEzY8zrubYP0H+k5/TN/F/eth4TqVVgrZCT86uazR5tjr5ZKr1N+8wehcDneB7n3mj8P1aqVG66/wrxX1k9RvN69C8NzoigFgxM66Nu6TLeDMrBWPWaPBlU+8p4tfE/JPqzCIOYs6EhCEWAJKutd0T08fKWqjciB1oiLU7Dl5WM8U1mbSofyxvd+olbozhfiLxstpMOkwag/lzjHnegD1jsPlx956Dq/DMbq7oLy7SBY4JqrqYfxr8OGx+WyB84DtsLBT24APf9X7TkuLl0zU0wOoq26FmFkGcvO6BdhRl5qjzOp4i35dMiWSymlAHM4GbUMBT+oXddpXxzqW7xBkYM18ysTJsh3fp/eQNOiIUtH/ADGNJilowzRAwhCBJ627txJ3Dmj1j8WTEoAOHf0vcx5lcMe8csVjUrq4tRp312LPk07+TYGVFr9uku6s6FqOiZ0UMR5brbAe99wenNzlYceM4mfJaswJDA9x2r2kmADkbgQLHB4oGQuZatNXjqaVufVfWqHSaHwnBjchjuyDf29vjM9pKGQB6ewB06fGaXwzJj20gCWOaEjv/imWy8L9KLfB6UTZqaTQ5Q3WZLR5g6rzTTu6DMLI3dJPOuVvWfjSY+RcdKulzDInpNy1O3N65bKIQhNEQmVM2tTFe9q+nWWsjBRZBnH1y7sbfl0QsSRuN8XJ+TXPxvE6qZvHsZzlMWUqgIBNEzFfjDxF/wA7mxpqzqSQKZSKDd+R2r+cTYeKnS+C+H4wi+ZmdhvNWDXW/qRxMlqvCcq6ZtX4imLEmovy2J9OImvUQB0rdQ7XOe9/q+efx594g2QudzervXW5x8hs0TOp4njxb2bAwAtvRu5C3Q595yXUFrnR458c+/03dGEgwIMbL8SBiRYkCEIQgCx4B27u0jjhdV2hTiZXYVtNV37y7lyrvTMmMIWUKQo4av8AFX+05ymW8ePM+Bsvp8pO+4cD4CT3I3LatpmayMWQ7egPQ1L+i1OVf8Z+846bR1NfKXMTeziT1FM6bHQeJZCVLZSDNB4b4hvzKvQn/Ezf7TBaVvMKgOOJqPBxjXIvmOG3Gr6/ac+s8WzevT9BkUJ2F+06IMzPh2ThBuuqojvO9p3Le8t49/Et5+rMIQl0gQCtGQMdOtqSqkcyXKD2+s4uZM2px5MOlfyi5o5Cn1NSe9c/jeZ1S8e8S8M0mJHd0zBXIbGD6r7n27CYz8T/AIr8Mbwv8n4T+aRXJJx5FG0e9dT3Pymq8W0n9i+Gsvkq6ggrmKXyeCT9+nwnnH4nxeEthy6rRajEp3kHCGq6JA9HUdBz0kv2qc5GZ8UztqszZqRfYKoH7Tl5LEnzsQ1bgR8OZXPWjOnM5EN36YTEMDGzbBTEMIQIkIQgCxwMbFgCgx68dPvfSRxwMDWA59hJsWSu0rLJsSkydjcrsaLKu4Eiw3B+U72l1Kqi0gqz36TPeH5gjbHUUek7mnxDIqhjsPSvhOfc+r4re+AZ3GlRm6EX8RNVo9Rcw3gr+RgxIRfFcmaXRayu0nm8rep1qF5hKej1Bymgblsmhf8ADOvN65rOGtZ/nWVlwZUAc5baiFWvSJY3AxW5Q19IrO/R3jyn8f8AiHiWod9AuR3wo1kKAABQrnvPNPEcOpxa1sGdW88H1IQbB9qnvv4kxYBoKzaYviN+bV7vnYni/iGHGuXbiLouRS27If0/Xm+K5kM75p0ax3LOMtP1+8jY8fGT6vGd12pF1YPErt8Z1SuSwwxIpiTbJYRIQAhCEAWoRIsAWOAiCOgaVZYwVKguTYmImK1HUQ4zR5sTr6PUKKDMDXeZ3E8u6fKB7SOp1XNbjQa4k87aHTidzSaw1YKmYfQ52HadrR6zaf7w38JCzi8reaHX36RSj36Gcb8L/j9vHPxDrvChpgmHCrtjzAm2Ctt5/wDa7HTpMh+J/wAWarwnT6fTeGlE1WS28wrZROgoHjr3rtORqdDofDkya7w1s6+IYhjy6bP6SPM6Odp7HmjUrjsn1LXLXuI1AsAmiZZOdUThp53+DPxZ/beg3aplXU4GAzKvG72YD2r95pX14ZOCPh8ZjW7jsrePHN1zfxHnzflsr482TGxNMo9auvsQeBPNfGsT6ZHXIqh8pug+4ge9f6TefiBxqdHn3ZQm5ODzfPynmHjGoOLVZMTKHQNYPb+sh4u706PN/ply8moKnYrGg3APSVX9XWS5HVjuC+q7kBM9PMeZqkMSLEmmRCEIAveu8IX/AHW0OwPHaEASLEiwBwMAYkIGfujlepFRi3Dh9W8b/GXMZbHRdaB6GuJy8Y69qnUy5fM06AZHOzij0qS1OVXP46mk1RHWdTT63aOtfEDmZnDl/wAx+0u48y7a5kdZUzpD47pWy6nL4nkzkgBSce2+BQoc8e/1jH/E+V9AdIdPhqqOcYgMjAdBxQ7Dmr6+8n8TJPh2ezY2j/WZvbwD7mpXEln3+Jbtl+PRvwvoNLoB+YwvkzZ9SgL5Gb6+3x69ZpTqzjWgQf8AaY7Sa04tJjx7mvYNx96lgeK/EfXmcvkzdW11ePUzxf8AHtZtwWmUqwHJ+P8ASeda582bITme8l2TO14q+q1QfI+3y1/QiGyfnOE6my9BiO98GU/x8THWP8jyXauY01HliGraLjDOuOOkMSLAxkI0xeRCjRNHj4QAhCoQAi1FKFesQfDk+0AALrtcX6xAbq+o7SZUdOlrxYsdYBFFh+ropP0hYgaVBuq/rJl9OKgT+v37Sor7TRMs43UepjS/zmYv1uXi3pT5gYh1AUXyI7HlvvXzlXTsPWq0N1UTxxJNVS5PSCBJ/wB5VP52LWfOG0eVWv1LxOaE/wD58Jrm2J/n0jsjs2NgORVD4yMZD5GNbFj4/Gbk5E+9rrJqfSBfQyVclmhyfhOYM1dVkmLPb8Gv/U1MXCk0v6vJkGMcIvu3f9pycoUX+oewEkz57tApVRKptu5I94Yzwb10xmJX4+8aflFbiIRXc17yyNB/hiWIrChR6RtWajBxqG6lArp0oAV/LiXxcUg2QRRECL5TlC6qWUGrWEVXbHQViAR6q94RH8RKQxrj6mo5So3b0Bv9JvlYqoC/qs/LiPKJ2Vh82uMcIANwXua5jQT/AJ2PbntJRjY0e4Nfq949MKmvUov3W5no4rqW9yPkY9MRZqYhPct2+0srjHZSf9pMuPau3ZyOTQ5+Z+EXs1MotNpRkV99tf6Spqv25l/F4ZgyMp3sob3Nm/nIfMCFdoUH/CWq/tAOXNOykjgV9PjJ3tUnI6S+G+F413/mM3yB7iV9SPDm4U53I6ksP52lHem3nIpHPQj+sQrwf70tt7+w/n+sXre9a9pzh2THgJGxBXfcSbjRiwhOcOMX+nl+P/1/rcadqqGORQDz+uvrADGqN6y20UtHt78f6fvNJ/E+NdIUp7v4GpOmDRPwpzKffeP6SjuX1eoAE0pLH7RVZBjO9ya7VZisrU1F46HRuVVcjhiLI4P+0rtotPurezfLGKirlTeFFsALq+Ki481EetSpF8uf6RSVrsJm0SvtdQDlHbbQPt3rt7CVn0o8s+li4Nfq/wBpabJYWyoCHqxuzRNdOf8AiOGUh2UgL0PHJqOdhWyuVkw5BdqQQaoxnlkUCQCfe+J2XyggMFskeq2J5ke/EzMdq9ATRqr/AO5ubrFxHIA9XI2r8YZFUE4xfWha0W+YnVCoHY41A/8AIA+n5+0ifCuQ7u5Nk3H7s+iodLlOQ4lG/KP1Ilkj7cQkj6cojEGvhfA+kIdHqiTkfGALH2jQD2MQPU0SRaq6HQfO/eOtqJUBuaFmQhu5NCOL2eeRd8iHAkR3FBbJ9iRzH5CWYGxRsnavI6/8yIZOQMnqoXYJj0JFq4O3ra9b+MzYcpFO6g7AEClWq/n3j1ZgGINuePSeCJFjyKMhPlgjmw10ftURLAJBXj3i4Op0yEW4cBh0NV9I5dwbYpWgC1G6HzkONlBDbiGHerDH2qLa5Dair/UWHX9ocHUuPfkewCSb2qBusV/3HKUfJjx/mBjV+S9dPiQD+0gTLsA27FC16SDyf59ouF185XdQwuyjbqY/GHD6lBdt+NM2MqXAAIod+bqKAMIQLnxsLIJBJK813A4+X7yszA5/N2Wdx9Bvp7dbi1kOEbgfLFkckgfSHB7J8uoLknJ6iDfIq/579YmNsaOVfZdV+ocA8yBkdsnlriDMnUAAxMovaW2tZ7qR9TH6l1aD43BbI5sULA6fORUFQ7cjMWPU9v5x9u0ibqd427aFDgxxeyfRY5riHB1MuUgnZZANcfvGHIqkjruFGQttFbCy8c9o9T5lgDntzcOD2S70L2QF9xUQZtos83yQBtF/SQhwG7EnsYikB6dAOnFw9R7JncHop9qVzz8e8JEMr3uv1dOkIuDqINUQiEDKMJA7IGGNtu5dpI7j4xrcRv8A49oDnrEZ24gem7oi6qOUuP1H/mJuP6e0k04U+baA10vtAzcoCsSObNUGiFrWlPLdBLSabGR3HANiQ6wDDq8uPGAqr0iCO9o5X5ivtGpQbcwJ9mA6y1qD5iHI/LhggPwqQ3tJr7QBMjFshYjbfwrpEdW9A8xSObAviN3Fenx6x5AKIaq+oEAA5OHy6x/qvfRv/qMvIAG3tS+xqpLhcri83gv0siIb8xhZr2gDVY7QwJVga68j6yTJsdAFa64Ck3QhiRdm48mmPMaQK2gUOekAMnlhwFfe12WEaeG3Yw232AqRWTwZMbxvSMQPnGRpdj3/AG6wDcf5TEj0A78/OAIHCud6719j3jcjLfpQAe1yR3PrWhRka89YCgGoRkI+F1//2Q==",
    //   id: "dfgedfgg",
    // },
    // {
    //   title: "test similar",
    //   video_url:
    //     "https://www.youtube.com/watch?v=S0jVBPIz7mk&ab_channel=BIHUSInfo",
    //   preview_url:
    //     "data:image/jpeg;base64,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",
    //   id: "dfgdftgg",
    // },
    // {
    //   title: "test similar",
    //   video_url:
    //     "https://www.youtube.com/watch?v=S0jVBPIz7mk&ab_channel=BIHUSInfo",
    //   preview_url:
    //     "data:image/jpeg;base64,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",
    //   id: "dfgadfgg",
    // },
  ]);
  const [videoData, setVideoData] = useState<DataVideo | null>(
    null
    // {
    //   title: "sdfsfdsf",
    //   description: `Привіт! В цьому відео ви дізнаєтеся про базові вправи по пілотуванню FPV, які дадуть вам якісний базис для виконання польотів.

    //   💀 Про нас:
    //   Kamicopters - спільнота, що присвячена застосуванню дронів у різноманітних сферах. Наша місія - допомагати нашим військовим, збирати дрони, вчити цивільне населення цій справі і допомагати здобувати свободу!

    //   👍 Підписуйтеся на наш канал, ставте лайки та діліться враженнями у коментарях.

    //   🌐 Слідкуйте за нами:

    //   Facebook: https://www.facebook.com/profile.php?...
    //   Instagram:

    //     kamicopters
    //   Telegram: https://t.me/+s6f18iVVnAYyMWZi

    //   Наша перманентна банка на закупівлю: https://send.monobank.ua/jar/3Btf7wNrnr

    //   Music track: Too Hot by Aylex
    //   Source: https://freetouse.com/music
    //   Free Vlog Music Without Copyright

    //   Завжди раді бачити!  Разом ми сила! 🚀✨`,
    //   format_note: ["dfg"],
    //   formats: ["dfgdg"],
    //   id: "dfdsf",
    //   tag: [
    //     "sdsdf",
    //     "sdsdfsdf",
    //     "sdsdfwe",
    //     "sdsdfa",
    //     "sdsdfhj",
    //     "sdsdft",
    //     "sdsdfnb",
    //     "sdsdfv",
    //     "sdsdfasde",
    //     "sdsdfll'l;'",
    //     "sdsdfuyouioi",
    //     "sdsdf4546",
    //     "sdsdf890",
    //   ],
    //   uploader_url: "sdfsfd",
    //   preview:
    //     "data:image/jpeg;base64,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",
    // }
  );

  useEffect(() => {
    if (typeof url === "string") {
      getVideo(url);
    }
  }, [url]);

  const getVideo = async (url: string) => {
    setLoading(true);
    try {
      const postRequest = await getVideoInfo(url);
      // console.log(postRequest.message);      

      if (postRequest.message && postRequest?.message.includes("There is no supporting for")) {
        console.log('test');
        
        localStorage.setItem("errorDontSupport", "true");
        router.push(`/`);
        return;
      }

      if (postRequest?.message === "Timeout error for worker") {
        
        localStorage.setItem("errorLongRequest", "true");
        router.push(`/`);
        return;
      }

      if (postRequest?.message === "Can not find meta for this URL") {
        localStorage.setItem("errorNotFindVideo", "true");
        router.push(`/`);
        return;
      }

      if (!postRequest.ok && postRequest.ok !== undefined) {
        postRequest.status === 500
          ? localStorage.setItem("error500", "true")
          : null;
        router.push(`/`);
        return;
      }

      setVideoData(postRequest.video_info);
      setSimilarVideo(postRequest?.similar_video)
      setLoading(false);
    } catch (e) {
      setLoading(false);
      router.push(`/`);
      console.log(await e);
    }
  };

  return (
    <div className="relative pt-20 base:pt-48 ">
      <div className="px-2 md:px-6 base:max-w-lg mx-auto relative z-20">
        <h1 className="text-lg font-bold leading-6 base:leading-9 base:text-[40px] mx-auto mb-3 base:mb-14 text-center max-w-80 base:max-w-[857px]">
          {loading ? t("elements:loading") : ""}
          {videoData !== null && searchParams.get("url") !== null
            ? videoData !== null &&
              videoData?.title !== undefined &&
              videoData?.title
            : ""}
        </h1>

        <div className="mb-7 base:mb-24 relative z-30">
          <Input
            buttonRounded={t("elements:buttonRounded")}
            buttonNormal={t("elements:buttonNormal")}
            placeholder={t("elements:mainInputPlaceholder")}
            icon={clipIcon}
            setLoading={setLoading}
            loading={loading}
            data={videoData}
            setVideoData={setVideoData}
            errors={inputErrors}
          />
        </div>

        {loading && <LoadingPage />}
        {!loading && videoData && (
          <DowloadPage dataVideo={videoData} similarVideo={similarVideo} />
        )}
      </div>
    </div>
  );
};

export default WrapperForDownload;
