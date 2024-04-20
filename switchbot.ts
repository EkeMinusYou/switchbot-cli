import { ansi, Command, EnumType } from "./deps.ts";

import {
  commands,
  getDeviceStatus,
  listDevices,
  sendCommand,
} from "./commands/device.ts";

const error = ansi.colors.bold.red;

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
      )
      .command(
        "send-command",
        new Command()
          .description("Send command to device")
          .type("command", new EnumType(commands))
          .arguments("<deviceId:string> <command:command>")
          .action(async (_, deviceId, command) => {
            await sendCommand(deviceId, command).catch((e) => {
              console.log(error(e.message));
              Deno.exit(1);
            });
          }),
      ),
  )
  .parse(Deno.args);
