import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Videolist from "../components/Videolist.tsx";
import { video } from "../types.ts";

type Data = {
  videos: video[];
  userid: string;
};

type State = {
  id: string;
  name: string;
  email: string;
};

export const handler: Handlers<Data, State> = {
  async GET(_req: Request, ctx: FreshContext<State, Data>) {
    try {
      const userid = ctx.state.id;
      const API_URL = Deno.env.get("API_URL");
      const response = await fetch(`${API_URL}/videos/${userid}`);
      if (response.status === 200) {
        const videos = await response.json();
        return await ctx.render({ videos, userid });
      }
      if (response.status === 500) {
        return new Response("Unexpected Error", { status: 500 });
      }
      if (response.status === 404) {
        return new Response("User with id not found", { status: 404 });
      } else {
        return new Response("Internal Server Error: Fetching Videos", {
          status: 500,
        });
      }
    } catch (error) {
      return new Response("Internal Server Error" + error, { status: 500 });
    }
  },
};

const videoPage = (props: PageProps<Data>) => {
  return <Videolist userid={props.data.userid} videos={props.data.videos} />;
};

export default videoPage;
