import { createLogger, transports } from "winston";

export const userLogger = createLogger({
  transports: [new transports.Console()],
});
