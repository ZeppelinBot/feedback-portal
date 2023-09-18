import { initMigrationsCommand } from "./commands/migrations.js";
import { Command } from "@commander-js/extra-typings";
import dotenv from "dotenv";

dotenv.config();

const program = new Command();

program
  .name("npm run cli --");

initMigrationsCommand(program);

program.parse();
