"use-client";

import "@app/styles/globals.css";
import { Components } from "@app/components";

export default function App({ Component, pageProps }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Components.ResponsiveAppBar />
      <Component {...pageProps} />
    </main>
  );
}
