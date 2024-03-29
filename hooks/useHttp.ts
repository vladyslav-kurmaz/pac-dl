// хук запиту
const useHttp = () => {
  // функція запиту що повертає стату Promise
  const request = async (
    url: string,
    method?: string,
    body?: BodyInit,
    headers?: HeadersInit
  ) => {
    try {
      const res = await fetch(url, { method, body, headers });

      if (!res.ok) {
        return await Promise.reject(res);
      }

      return await Promise.resolve(res);
    } catch (e) {
      return await Promise.reject(e);
    }
  };

  return {
    request,
  };
};

export default useHttp;
