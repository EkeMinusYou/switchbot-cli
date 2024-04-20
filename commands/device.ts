import { Table } from "../deps.ts";
import * as api from "./api/api.ts";

export const listDevices = async () => {
  const result = await api.listDevices();

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
  const result = await api.getDeviceStatus(deviceId);
  console.log(result);
};

const commandMap = {
  turnon: "turnOn",
  turnoff: "turnOff",
} as const;
export const commands = ["turnon", "turnoff"] as const;

export const sendCommand = async (
  deviceId: string,
  command: typeof commands[number],
) => {
  const body = {
    commandType: "command",
    command: commandMap[command],
    parameter: "default",
  } as const;

  const result = await api.sendCommand(deviceId, body);
  console.log(result);
};
