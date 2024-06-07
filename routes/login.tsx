import {
  FreshContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import Login from "../components/Login.tsx";
import jwt from "jsonwebtoken";
import { user } from "../types.ts";

type Data = {
  message?: string;
};

export const config: RouteConfig = {
  //skipAppWrapper: true, // Disable rendering app wrapper
  skipInheritedLayouts: true, // Disable already inherited _layout templates
};

export const handler: Handlers = {
  async POST(_req: Request, ctx: FreshContext<unknown, Data>) {
    try {
      const form = await _req.formData();
      const email = form.get("email")?.toString() || "";
      const password = form.get("password")?.toString() || "";
      const API_URL = Deno.env.get("API_URL");
      const response = await fetch(`${API_URL}/checkuser`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.status === 400 || response.status === 404) {
        return await ctx.render({
          message: "Incorrect credentials or user does not exist",
        });
      }
      if (response.status === 200) {
        const userResponse: Omit<user, "password"> = await response.json();
        const JWT_SECRET = Deno.env.get("JWT_SECRET");
        if (!JWT_SECRET) {
          return new Response("Internal Server Error: JWT_SECRET not found", {
            status: 500,
          });
        }
        const token = jwt.sign(
          {
            email,
            id: userResponse.id,
            name: userResponse.name,
          },
          JWT_SECRET,
          { expiresIn: "24h" },
        );
        const headers = new Headers();
        const url = new URL(_req.url);
        setCookie(headers, {
          name: "auth",
          value: token,
          sameSite: "Lax",
          secure: true,
          path: "/",
          domain: url.hostname,
        });
        headers.set("Location", "/videos");
        return new Response(null, {
          status: 303,
          headers,
        });
      } else {
        return await ctx.render({ message: "Error" });
      }
    } catch (error) {
      return new Response("Internal Server Error" + error, { status: 500 });
    }
  },
};

const loginPage = (props: PageProps<Data>) => {
  return <Login message={props.data?.message} />;
};

export default loginPage;
