import useHttp from "@/hooks/useHttp";


const PacDlServices = () => {

  const _baseUrl = 'https://pac-dl-deploy.onrender.com/video/';
  const _dockerUrl = 'http://localhost:8000/video/';
  const {request} = useHttp();

  const downloadVideos = async (body: BodyInit, ) => {
    const header = {"Content-Type": "application/json"}
    console.log(body);
    
    try {
      const req = await request(`${_baseUrl}down/`, "POST", body, header)

      return req.json();
    } catch (e) {
      console.error(e)
    }
  }

  const getVideoInfo = async (url: string) => {
    
    try {
      const req = await request(`${_baseUrl}video-info/?url=${url}`)

      return req.json();
    } catch (e) {
      console.error(e)
    }
  }

  const getTopVideo = async (period: string, offcet?: number, page?: number) => {
    const offsetUrl = offcet ? `&page_size=${offcet}` : null;
    const pageUrl = offcet ? `&page=${page}` : null;

    try {
      const req = await request(`${_baseUrl}popular-videos/?period=${period}${offsetUrl}${pageUrl}`)
      return req.json();
    } catch (e) {
      console.error(e);
    }
  }


  return {
    downloadVideos,
    getVideoInfo,
    getTopVideo
  }
}

export default PacDlServices;