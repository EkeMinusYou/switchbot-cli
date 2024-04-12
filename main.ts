import { Command } from "./deps.ts";

await new Command()
  .name("switchbot")
  .version("0.0.1")
  .description("Command line tool for SwitchBot API")
  .parse(Deno.args);
