import { json } from "@remix-run/node";
import { getExpenses } from "~/models/expense.server";
import { requireUserSession } from "~/models/auth.server";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  return json(expenses);
}
