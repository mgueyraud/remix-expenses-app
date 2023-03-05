import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import ErrorComponent from "~/components/util/Error";
import styles from "~/styles/shared.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Expenses App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
    rel: "stylesheet",
  },
];

function Document({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={caught.statusText}>
      <main>
        <ErrorComponent title={caught.statusText}>
          <p>{caught.data}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title={error.name}>
      <main>
        <ErrorComponent title={error.name}>
          <p>{error.message}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}
