import type { ActionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { createExpense } from "~/models/expense.server";
import { validateExpenseInput } from "~/utils/validations.server";
import type { ResponseFormErrors } from "~/utils/validations.server";
import { json, redirect } from "@remix-run/node";
import { getUserSession } from "~/models/auth.server";

export async function action({ request }: ActionArgs) {
  const userId = await getUserSession(request);
  if (!userId) return redirect("/auth");
  const formData = await request.formData();

  const title = formData.get("title");
  const amount = formData.get("amount");
  const date = formData.get("date");

  try {
    validateExpenseInput({ title, amount, date });
  } catch (errors) {
    const e = errors as ResponseFormErrors;
    return json(e);
  }

  await createExpense({
    title: title as string,
    amount: +(amount as string),
    date: new Date(date as string),
    userId,
  });

  return redirect("..");
}

export default function ExpensesAddPage() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("/expenses")}>
      <ExpensesForm />
    </Modal>
  );
}
