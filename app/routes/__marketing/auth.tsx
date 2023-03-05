import type {
  ActionArgs,
  HeadersFunction,
  LinksFunction,
} from "@remix-run/node";
import styles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import type { AuthFormErrors } from "../../utils/validations.server";
import { validateCredentials } from "../../utils/validations.server";
import { createUserSession, signIn, signUp } from "~/models/auth.server";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export const headers: HeadersFunction = ({ parentHeaders }) => ({
  "Cache-Control": parentHeaders.get("Cache-Control") as string,
});

export async function action({ request }: ActionArgs) {
  const url = new URL(request.url);
  const intent = url.searchParams.get("mode") || "login";

  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    validateCredentials({
      email,
      password,
    });

    if (intent === "login") {
      const user = await signIn({ email, password });
      const redirect = await createUserSession(user.id, "/expenses");
      return redirect;
    } else if (intent === "signup") {
      const user = await signUp({ email, password });
      const redirect = await createUserSession(user.id, "/expenses");
      return redirect;
    }
  } catch (error: unknown) {
    const e = error as AuthFormErrors;
    return e;
  }
}

export default function AuthPage() {
  return <AuthForm />;
}
