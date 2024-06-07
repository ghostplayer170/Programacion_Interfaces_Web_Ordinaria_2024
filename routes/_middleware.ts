import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken";

type State = {
  id: string;
  name: string;
  email: string;
};

export const handler = async (_req: Request, ctx: FreshContext<State>) => {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }
  if (ctx.route === "/login" || ctx.route === "/register") {
    return await ctx.next();
  }
  const { auth } = getCookies(_req.headers);
  if (!auth) {
    return new Response(null, {
      status: 307,
      headers: { location: "/login" },
    });
  }
  const JWT_SECRET = Deno.env.get("JWT_SECRET");
  if (!JWT_SECRET) {
    return new Response("Error: JWT_SECRET not found", {
      status: 500,
    });
  }
  const payload = jwt.verify(auth, JWT_SECRET);
  if (!payload) {
    return new Response(null, {
      status: 307,
      headers: { location: "/login" },
    });
  }
  ctx.state = payload;
  return await ctx.next();
};
