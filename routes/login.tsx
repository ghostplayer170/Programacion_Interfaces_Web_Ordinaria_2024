import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Login from "../components/Login.tsx";


type Data = {
    message?: string;
  };

export const handler: Handlers = {
  async POST(_req: Request, ctx: FreshContext<unknown,Data>) {
    return await ctx.render();
  },
};

const loginPage = (props: PageProps<Data>) => {
  return <Login message={props.data?.message} />;
};

export default loginPage;
