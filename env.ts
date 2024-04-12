import { dotenv } from "./deps.ts";

await dotenv.load({
  export: true,
});

export const getCredential = () => {
  const token = Deno.env.get("SWITCHBOT_API_TOKEN");
  const secret = Deno.env.get("SWITCHBOT_API_SECRET");

  if (!token || !secret) {
    throw new Error(
      "SWITCHBOT_API_TOKEN and SWITCHBOT_API_SECRET must be set in environment variables.",
    );
  }

  return {
    token: token,
    secret: secret,
  };
};
