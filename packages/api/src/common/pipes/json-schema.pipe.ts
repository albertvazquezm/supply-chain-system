import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import Ajv from 'ajv';

@Injectable()
export class JsonSchemaValidationPipe implements PipeTransform {
  constructor(private schema: object) {
    this.ajv = new Ajv({ allErrors: true });
  }

  private ajv;

  transform(value, metadata: ArgumentMetadata) {
    // Do not validate if the value is not a body
    if (metadata.type !== 'body') {
      return value;
    }
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
