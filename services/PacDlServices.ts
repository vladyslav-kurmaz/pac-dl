import useHttp from "@/hooks/useHttp";


const PacDlServices = () => {

  const _baseUrl = 'https://pac-dl-deploy.onrender.com/video/';
  const {request} = useHttp();

  const postUrl = async (body: BodyInit, ) => {
    try {
      const req = await request(`${_baseUrl}down/`, "POST")

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


  return {
    postUrl,
    getVideoInfo
  }
}

export default PacDlServices;