import { Buffer, crypto } from "../../deps.ts";
import { getCredential } from "../../env.ts";
import { newErrorResponse } from "./error.ts";
import { ListDevicesResponse } from "./types.ts";

const defaultBaseURL = "https://api.switch-bot.com/v1.1";

class SwitchBotAPIClient {
  constructor(
    private token: string,
    private secret: string,
    private baseURL: string,
  ) {}

  private createAuthorizationHeaders() {
    const t = Date.now();
    const nonce = crypto.randomUUID();
    const data = this.token + t + nonce;
    const signTerm = crypto.createHmac("sha256", this.secret)
      .update(Buffer.from(data, "utf-8"))
      .digest();
    const sign = signTerm.toString("base64");

    return {
      "Authorization": this.token,
      "sign": sign,
      "nonce": nonce,
      "t": String(t),
      "Content-Type": "application/json",
    };
  }

  private async GET<T>(endpoint: string): Promise<T> {
    const authorizationHeaders = this.createAuthorizationHeaders();

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
  }

  private async POST<T>(
    endpoint: string,
    body: Record<string, unknown>,
  ): Promise<T> {
    const authorizationHeaders = this.createAuthorizationHeaders();

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
  }

  public listDevices(): Promise<ListDevicesResponse> {
    return this.GET<ListDevicesResponse>(`${this.baseURL}/devices`);
  }

  public getDeviceStatus(deviceId: string) {
    return this.GET(`${this.baseURL}/devices/${deviceId}/status`);
  }

  public async sendCommand(
    deviceId: string,
    params: {
      commandType: "command";
      command: string;
      parameter: string | Record<string, string>;
    },
  ) {
    await this.POST(`${this.baseURL}/devices/${deviceId}/commands`, params);
    return;
  }
}

export const newAPIClient = () => {
  const { token, secret } = getCredential();
  return new SwitchBotAPIClient(token, secret, defaultBaseURL);
};
