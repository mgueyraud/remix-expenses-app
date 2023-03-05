import { FaLock, FaUserPlus } from "react-icons/fa";
import {
  Link,
  useSearchParams,
  Form,
  useNavigation,
  useActionData,
} from "@remix-run/react";
import type { action } from "~/routes/__marketing/auth";

function AuthForm() {
  const [params] = useSearchParams();
  const navigation = useNavigation();
  const data = useActionData<typeof action>();
  const authMode = params.get("mode") || "login";
  const isLogin = authMode === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">{isLogin ? <FaLock /> : <FaUserPlus />}</div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
        {data?.email?.length && data?.email?.length > 0 ? (
          <span>
            {data?.email}
            <br />
            <br />
          </span>
        ) : null}
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
        {data?.password?.length && data?.password?.length > 0 ? (
          <span>
            {data?.password}
            <br />
            <br />
          </span>
        ) : null}
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isLogin
            ? isSubmitting
              ? "Loggin in..."
              : "Login"
            : isSubmitting
            ? "Signing in..."
            : "Sign in"}
        </button>
        <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
          {isLogin ? "Create a new user" : "Log in with existing user"}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
