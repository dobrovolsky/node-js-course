import Ajv from 'ajv';
import _ from 'lodash';
import schemaUserCreation from './schema.json';

const schemaUserUpdate = _.cloneDeep(schemaUserCreation);
schemaUserUpdate.required = [];

const ajv = new Ajv({
    allErrors: true,
    removeAdditional: true,
    coerceTypes: true
});

class ValidationResults {
    constructor(isValid, errors, data) {
        this.isValid = isValid;
        this.errors = errors;
        this.data = data;
    }
}

class Validator {
    _validate(compiledSchema, data) {
        const isValid = compiledSchema(data);
        return new ValidationResults(isValid, compiledSchema.errors && compiledSchema.errors.map(item => {
            return {
                path: item.dataPath,
                message: item.message
            };
        }), data);
    }
    validateCreation(data) {
        const compiledSchema =  ajv.compile(schemaUserCreation);
        return this._validate(compiledSchema, data);
    }
    validateUpdate(data) {
        const compiledSchema =  ajv.compile(schemaUserUpdate);
        return this._validate(compiledSchema, data);
    }
}

export default Validator;
