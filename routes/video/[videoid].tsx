import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Video from "../../components/Video.tsx";
import { video } from "../../types.ts";

type Data = {
  video: video;
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
      const videoid = ctx.params.videoid;
      const API_URL = Deno.env.get("API_URL");
      const url = `${API_URL}/video/${userid}/${videoid}`;
      const response = await fetch(url);
      if (response.status === 200) {
        const video: video = await response.json();
        return await ctx.render({ video, userid });
      }
      if (response.status === 500) {
        return new Response("Unexpected Error: Fetching Videos", {
          status: 500,
        });
      }
      if (response.status === 404) {
        return new Response("User with id not found: Fetching Videos", {
          status: 404,
        });
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
  return <Video userid={props.data.userid} video={props.data.video} />;
};

export default videoPage;
