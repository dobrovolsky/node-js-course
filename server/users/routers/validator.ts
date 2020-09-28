import Ajv, { ValidateFunction } from "ajv";
import _ from "lodash";

import { ValidationError } from "../types";

import schemaUserCreation from "./schema.json";
import { requestData } from "../../shared/types";

const schemaUserUpdate = _.cloneDeep(schemaUserCreation);
schemaUserUpdate.required = [];

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  coerceTypes: true,
});

class ValidationResults {
  isValid: boolean;
  errors: Array<ValidationError>;
  data: requestData;

  constructor(
    isValid: boolean,
    errors: Array<ValidationError>,
    data: requestData
  ) {
    this.isValid = isValid;
    this.errors = errors;
    this.data = data;
  }
}

class Validator {
  _validate(
    compiledSchema: ValidateFunction,
    data: requestData
  ): ValidationResults {
    const isValid = compiledSchema(data) as boolean;
    const validationErrors = (compiledSchema.errors &&
      compiledSchema.errors.map((item) => {
        return {
          path: item.dataPath,
          message: item.message as string,
        };
      })) as Array<ValidationError>;

    return new ValidationResults(isValid, validationErrors, data);
  }
  validateCreation(data: requestData): ValidationResults {
    const compiledSchema = ajv.compile(schemaUserCreation);
    return this._validate(compiledSchema, data);
  }
  validateUpdate(data: requestData): ValidationResults {
    const compiledSchema = ajv.compile(schemaUserUpdate);
    return this._validate(compiledSchema, data);
  }
}

export default Validator;
