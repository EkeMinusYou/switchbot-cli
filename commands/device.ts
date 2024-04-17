import { Table } from "../deps.ts";
import { newAPIClient } from "./apis/client.ts";

export const listDevices = async () => {
  const APIClient = newAPIClient();
  const result = await APIClient.listDevices();

  const table = new Table().padding(3);
  table.header([
    "ID",
    "Name",
    "Type",
    "EnableCloudService",
    "HubDeviceID",
  ]);
  table.body(result.deviceList.map((device) => [
    device.deviceId,
    device.deviceName,
    device.deviceType,
    String(device.enableCloudService),
    device.hubDeviceId,
  ]));
  table.render();
};

export const getDeviceStatus = async (deviceId: string) => {
  const APIClient = newAPIClient();
  const result = await APIClient.getDeviceStatus(deviceId);
  console.log(result);
};

const commamdMap = {
  turnon: "turnOn",
  turnoff: "turnOff",
};

export const sendCommand = async (
  deviceId: string,
  command: "turnon" | "turnoff",
) => {
  const APIClient = newAPIClient();
  const body = {
    commandType: "command",
    command: commamdMap[command],
    parameter: "default",
  } as const;

  const result = await APIClient.sendCommand(deviceId, body);
  console.log(result);
};
