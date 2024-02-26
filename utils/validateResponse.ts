import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// функція валідації відповіді від сервера чи не повернулась помилка
const validateResponse = (postRequest: any, router: AppRouterInstance) => {
  if (postRequest?.message === "Media not found or unavailable") {
    localStorage.setItem("mediaTypeNotFound", "true");
    router.push(`/`);
    return;
  }

  if (postRequest?.message === "Can not find extractor for this URL") {
    localStorage.setItem("errorExtractor", "true");
    router.push(`/`);
    return;
  }

  if (
    postRequest.message &&
    postRequest?.message.includes("There is no supporting for")
  ) {
    console.log("test");

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

  if (postRequest.status === 500) {
    postRequest.status === 500
      ? localStorage.setItem("error500", "true")
      : null;
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
}

export default validateResponse