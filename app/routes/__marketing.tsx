import type {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserSession } from "~/models/auth.server";
import styles from "~/styles/marketing.css";
import MainHeader from "../components/navigation/MainHeader";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserSession(request);

  return json(userId);
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=3600",
});

export default function MarketingPages() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
