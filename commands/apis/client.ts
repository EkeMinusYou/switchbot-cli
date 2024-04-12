import { Buffer, crypto } from "../../deps.ts";
import { getCredential } from "../../env.ts";

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

  public async listDevices() {
    const endpoint = `${this.baseURL}/devices`;
    const authorizationHeaders = this.createAuthorizationHeaders();
    const response = await fetch(endpoint, {
      method: "GET",
      headers: authorizationHeaders,
    });
    return response.json();
  }

  public async getDeviceStatus(deviceId: string) {
    const endpoint = `${this.baseURL}/devices/${deviceId}/status`;
    const authorizationHeaders = this.createAuthorizationHeaders();
    const response = await fetch(endpoint, {
      method: "GET",
      headers: authorizationHeaders,
    });
    return response.json();
  }
}

export const newAPIClient = () => {
  const { token, secret } = getCredential();
  return new SwitchBotAPIClient(token, secret, defaultBaseURL);
};
