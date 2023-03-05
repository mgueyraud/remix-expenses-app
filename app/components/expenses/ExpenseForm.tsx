import type { Expense } from "@prisma/client";
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import type { action } from "~/routes/__app/expenses/add";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const data = useActionData<typeof action>();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //An array of all the routes that are active, with the data, pathname, params
  //https://remix.run/docs/en/v1/hooks/use-matches
  const matches = useMatches();
  const expensesData = matches.find((match) => match.pathname === "/expenses")
    ?.data.expenses as Pick<Expense, "id" | "amount" | "date" | "title">[];
  const selectedExpense = expensesData.find(
    (expense) => expense.id === params.expenseId
  );

  if (params.expenseId && !selectedExpense) {
    return <p>Invalid expense id</p>;
  }

  return (
    <Form
      method={selectedExpense ? "patch" : "post"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={selectedExpense?.title}
        />
        {data && data.title && <p>{data.title}</p>}
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            defaultValue={selectedExpense?.amount}
            required
          />
          {data && data.amount && <p>{data.amount}</p>}
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              selectedExpense?.date &&
              new Date(selectedExpense.date).toISOString().split("T")[0]
            }
          />
          {data && data.date && <p>{data.date}</p>}
        </p>
      </div>
      <div className="form-actions">
        <button
          disabled={isSubmitting}
          name="intent"
          value={selectedExpense ? "update" : "create"}
        >
          {isSubmitting ? "Saving..." : "Save expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
