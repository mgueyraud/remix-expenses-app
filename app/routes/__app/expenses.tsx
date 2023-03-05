import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/models/expense.server";
import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { requireUserSession } from "~/models/auth.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  return json({ expenses });
}

export const meta: MetaFunction = () => ({
  title: "Expenses",
  description: "See the expenses app",
});

export default function ExpensesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {data.expenses && data.expenses.length > 0 ? (
          <ExpensesList expenses={data.expenses} />
        ) : (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
