// import type { LoaderArgs } from "@remix-run/node";
// import { json, redirect } from '@remix-run/node';
import type { Expense } from "@prisma/client";
import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpensesForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/models/expense.server";
import type { ResponseFormErrors } from "~/utils/validations.server";
import { validateExpenseInput } from "~/utils/validations.server";
// import { getSingleExpense } from "~/models/expense.server";

// export async function loader({ params }: LoaderArgs) {
//   if (!params.expenseId) return json(null);
//   const expense = await getSingleExpense(params.expenseId);
//   return json({ expense });
// }

export const meta: MetaFunction = ({ params, parentsData }) => {
  const expense = (
    parentsData["routes/__app/expenses"].expenses as Expense[]
  ).find((exp) => exp.id === params.expenseId);

  return {
    title: `Edit expense - ${expense?.title || params.expenseId}`,
  };
};

export async function action({ request, params }: ActionArgs) {
  if (!params.expenseId) return json(null);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "update") {
    const title = formData.get("title");
    const amount = formData.get("amount");
    const date = formData.get("date");

    try {
      validateExpenseInput({ title, amount, date });
    } catch (errors) {
      const e = errors as ResponseFormErrors;
      return json(e);
    }

    await updateExpense(params.expenseId, {
      title: title as string,
      amount: +(amount as string),
      date: new Date(date as string),
    });

    return redirect("..");
  } else if (intent === "delete") {
    await deleteExpense(params.expenseId);
    return redirect("..");
  }
}

export default function ExpenseDetailPage() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate("/expenses")}>
      <ExpensesForm />
    </Modal>
  );
}
