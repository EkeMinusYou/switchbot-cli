import { Buffer, crypto } from "../../deps.ts";
import { getCredential } from "../../env.ts";
import { newErrorResponse } from "./error.ts";

export const getBaseURL = () => {
  return "https://api.switch-bot.com/v1.1";
};

const createAuthorizationHeaders = () => {
  const { token, secret } = getCredential();
  const t = Date.now();
  const nonce = crypto.randomUUID();
  const data = token + t + nonce;
  const signTerm = crypto.createHmac("sha256", secret)
    .update(Buffer.from(data, "utf-8"))
    .digest();
  const sign = signTerm.toString("base64");

  return {
    "Authorization": token,
    "sign": sign,
    "nonce": nonce,
    "t": String(t),
    "Content-Type": "application/json",
  };
};

export const GET = async <T>(endpoint: string): Promise<T> => {
  const authorizationHeaders = createAuthorizationHeaders();

  const { code, message, body } = await fetch(endpoint, {
    method: "GET",
    headers: authorizationHeaders,
  }).then(async (res) => {
    return {
      code: res.status,
      message: res.statusText,
      body: await res.json(),
    };
  });

  const error = newErrorResponse(code, message, body);
  if (error) {
    throw error;
  }

  return body.body;
};

export const POST = async <T>(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<T> => {
  const authorizationHeaders = createAuthorizationHeaders();

  const { code, message, body: responseBody } = await fetch(endpoint, {
    method: "POST",
    headers: authorizationHeaders,
    body: JSON.stringify(body),
  }).then(async (res) => {
    return {
      code: res.status,
      message: res.statusText,
      body: await res.json(),
    };
  });

  const error = newErrorResponse(code, message, responseBody);
  if (error) {
    throw error;
  }

  return responseBody.body;
};
