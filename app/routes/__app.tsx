import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import styles from "~/styles/expenses.css";
import ExpensesHeader from "../components/navigation/ExpensesHeader";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function ExpensesContainer() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
