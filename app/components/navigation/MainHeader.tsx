import Logo from "../util/Logo";
import { NavLink, Link, useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/__marketing";

function MainHeader() {
  const userId = useLoaderData<typeof loader>();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {!userId ? (
              <Link to="/auth" className="cta">
                Login
              </Link>
            ) : (
              <Link to="/expenses" className="cta">
                Go to expenses
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
