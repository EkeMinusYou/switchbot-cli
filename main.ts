import { Command } from "./deps.ts";

import { getDeviceStatus, listDevices } from "./commands/device.ts";

await new Command()
  .name("switchbot")
  .version("0.0.1")
  .description("Command line tool for SwitchBot API")
  .command(
    "list",
    new Command()
      .description("List devices")
      .action(async () => {
        await listDevices();
      }),
  )
  .command(
    "status",
    new Command()
      .description("Get device status")
      .arguments("<deviceId:string>")
      .action(async (_, deviceId) => {
        await getDeviceStatus(deviceId);
      }),
  )
  .parse(Deno.args);
