import { GET, getBaseURL, POST } from "./base.ts";
import { ListDevicesResponse } from "./types.ts";

export const listDevices = (): Promise<ListDevicesResponse> => {
  return GET<ListDevicesResponse>(`${getBaseURL()}/devices`);
};

export const getDeviceStatus = (deviceId: string) => {
  return GET(`${getBaseURL()}/devices/${deviceId}/status`);
};

export const sendCommand = async (
  deviceId: string,
  params: {
    commandType: "command";
    command: string;
    parameter: string | Record<string, string>;
  },
) => {
  return await POST(`${getBaseURL()}/devices/${deviceId}/commands`, params);
};
