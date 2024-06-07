import { FreshContext } from "$fresh/server.ts";
import Head from "../components/Head.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {
  return (
    <div>
      <Head userName={`${ctx.state.name} || Unknown`} />
      <ctx.Component />
    </div>
  );
}
