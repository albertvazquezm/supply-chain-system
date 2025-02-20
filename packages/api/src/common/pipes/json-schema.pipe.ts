import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import Ajv from 'ajv';

@Injectable()
export class JsonSchemaValidationPipe implements PipeTransform {
  constructor(private schema: object) {
    this.ajv = new Ajv({ allErrors: true });
  }

  private ajv;

  transform(value: any) {
    const validate = this.ajv.compile(this.schema);
    const valid = validate(value);

    if (!valid) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: validate.errors,
      });
    }

    return value;
  }
}
