import { newAPIClient } from "./apis/client.ts";

export const listDevices = async () => {
  const APIClient = newAPIClient();
  const result = await APIClient.listDevices();
  console.table(result.deviceList);
};

export const getDeviceStatus = async (deviceId: string) => {
  const APIClient = newAPIClient();
  const result = await APIClient.getDeviceStatus(deviceId);
  console.table(result);
};
