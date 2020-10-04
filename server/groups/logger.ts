import { createLogger, transports } from "winston";

export const groupLogger = createLogger({
  transports: [new transports.Console()],
});
