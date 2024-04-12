import { Command } from "./deps.ts";

import { listDevices } from "./commands/device.ts";

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
  .parse(Deno.args);
