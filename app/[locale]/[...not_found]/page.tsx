import notFound from "@/app/[locale]/not-found";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function NotFoundCatchAll({ params }: { params: Params }) {
  return notFound(params);
}
