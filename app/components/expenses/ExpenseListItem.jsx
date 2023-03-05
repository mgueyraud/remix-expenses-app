import { Link, Form, useNavigation } from '@remix-run/react';

function ExpenseListItem({ id, title, amount }) {
  const navigation = useNavigation();
  const action = `/expenses/${id}`;

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <Form method='post' action={action}>
          <button name='intent' value='delete'>
            {navigation.state !== 'idle' && navigation.formAction === action 
            ? 
              "Deleting..." 
            : 
              "Delete"
            }
          </button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
