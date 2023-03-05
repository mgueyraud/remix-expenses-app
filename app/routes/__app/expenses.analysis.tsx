import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/models/expense.server";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/models/auth.server";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  if (expenses && expenses.length === 0) {
    throw new Response("No expenses loaded yet", {
      status: 404,
      statusText: "No expenses",
    });
  }

  return json({ expenses });
}

export default function ExpensesAnalysisPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <Chart expenses={data.expenses} />
      <ExpenseStatistics expenses={data.expenses} />
    </main>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <section id="no-expenses">
      <pre>{caught.status}</pre>
      <h1>{caught.data}</h1>
      <p>
        Start <Link to="/expenses/add">adding some</Link> today.
      </p>
    </section>
  );
}
