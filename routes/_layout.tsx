import { FreshContext } from "$fresh/server.ts";
import Head from "../components/Head.tsx";

// deno-lint-ignore require-await
export default async function Layout(_req: Request, ctx: FreshContext) {
  return (
    <div class="page-container">
      <Head userName={`${ctx.state.name || "Unknown"} `} />
      <ctx.Component />
    </div>
  );
}
