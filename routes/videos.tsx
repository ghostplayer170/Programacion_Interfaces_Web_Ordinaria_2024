import { Handlers } from "$fresh/server.ts";
import Videolist from "../components/Videolist.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
};

const videoPage = () => {
  return <Videolist />;
};

export default videoPage;
