import { ansi, Command } from "./deps.ts";

import { getDeviceStatus, listDevices } from "./commands/device.ts";

const error = ansi.colors.bold.red;
// const warn = ansi.colors.bold.yellow;
// const info = ansi.colors.bold.blue;

await new Command()
  .name("switchbot")
  .version("0.0.1")
  .description("Command line tool for SwitchBot API")
  .command(
    "device",
    new Command().description("Device commands")
      .command(
        "list",
        new Command()
          .description("List devices")
          .action(async () => {
            await listDevices().catch((e) => {
              console.log(error(e.message));
              Deno.exit(1);
            });
          }),
      )
      .command(
        "status",
        new Command()
          .description("Get device status")
          .arguments("<deviceId:string>")
          .action(async (_, deviceId) => {
            await getDeviceStatus(deviceId).catch((e) => {
              console.log(error(e.message));
              Deno.exit(1);
            });
          }),
      ),
  )
  .parse(Deno.args);
