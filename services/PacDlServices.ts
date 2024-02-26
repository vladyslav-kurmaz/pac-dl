import useHttp from "@/hooks/useHttp";

const PacDlServices = () => {
  // при оновлені посилання на бекенд потрібно його змінити тут
  const _baseUrl = "https://pac-dl-deploy.onrender.com/video/";
  const { request } = useHttp();

  // ця функція використовувалась раніше
  const downloadVideos = async (body: BodyInit) => {
    const header = { "Content-Type": "application/json" };
    console.log(body);

    try {
      const req = await request(`${_baseUrl}down/`, "POST", body, header);

      return req.json();
    } catch (e) {
      return e;
    }
  };
  // функція для отримання відео з апі 
  const getVideoInfo = async (url: string) => {
    try {
      const req = await request(`${_baseUrl}video-info/?url=${url}`);

      return req.json();
    } catch (e) {
      return e;
    }
  };

  // функція для отримання топ відео з бекенда
  const getTopVideo = async (
    period: string,
    offcet?: number,
    page?: number
  ) => {
    const offsetUrl = offcet ? `&page_size=${offcet}` : null;
    const pageUrl = offcet ? `&page=${page}` : null;

    try {
      const req = await request(
        `${_baseUrl}popular-videos/?period=${period}${offsetUrl}${pageUrl}`
      );
      return req.json();
    } catch (e) {
      return e;
    }
  };

  // функція для отримання топ тегів з бекенда
  const getPopuliarTags = async (offcet?: number, page?: number) => {
    const offsetUrl = offcet ? `&page_size=${offcet}` : null;
    const pageUrl = offcet ? `&page=${page}` : null;

    try {
      const req = await request(
        `${_baseUrl}popular-tags/${
          offsetUrl !== null || pageUrl !== null
            ? `?${offsetUrl}${pageUrl}`
            : ""
        }`
      );
      return req.json();
    } catch (e) {
      return e;
    }
  };

  // функція для отримання всі відео з бекенда
  const getAllVideo = async (offcet?: number, page?: number) => {
    const offsetUrl = offcet ? `&page_size=${offcet}` : null;
    const pageUrl = offcet ? `&page=${page}` : null;

    try {
      const req = await request(
        `${_baseUrl}videos/${
          offsetUrl !== null || pageUrl !== null
            ? `?${offsetUrl}${pageUrl}`
            : ""
        }`
      );
      return req.json();
    } catch (e) {
      return e;
    }
  };

  // функція для отримання відфільтровані відео з бекенда
  const getFilterVideo = async (
    tag: string,
    offcet?: number,
    page?: number
  ) => {
    const offsetUrl = offcet ? `&page_size=${offcet}` : null;
    const pageUrl = offcet ? `&page=${page}` : null;
    const tagSearch = tag ? `&tag=${tag}` : null;

    try {
      const req = await request(
        `${_baseUrl}videos-filter/${
          offsetUrl !== null || pageUrl !== null || tagSearch !== null
            ? `?${offsetUrl}${pageUrl}${tagSearch}`
            : ""
        }`
      );
      return req.json();
    } catch (e) {
      return e;
    }
  };

  return {
    downloadVideos,
    getVideoInfo,
    getTopVideo,
    getPopuliarTags,
    getAllVideo,
    getFilterVideo,
  };
};

export default PacDlServices;
