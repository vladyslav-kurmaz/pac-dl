import notFound from "@/app/[locale]/not-found";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// Функція відображення сторінки NotFound
export default function NotFoundCatchAll({ params }: { params: Params }) {
  return notFound(params);
}
