import { newAPIClient } from "./apis/client.ts";

export const listDevices = async () => {
  const APIClient = newAPIClient();
  const result = await APIClient.listDevices();
  console.table(result.body.deviceList);
};
