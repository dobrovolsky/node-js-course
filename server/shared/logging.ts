import winston from "winston";

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export const serviceLogger = (
  target: any,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor
): PropertyDescriptor => {
  const method = propertyDesciptor.value;

  propertyDesciptor.value = async function (...args: any[]) {
    try {
      return await method.apply(this, args);
    } catch (e) {
      logger.error(`Calling ${method.name}(${args}) raises ${e}`);
      throw e;
    }
  };

  return propertyDesciptor;
};
