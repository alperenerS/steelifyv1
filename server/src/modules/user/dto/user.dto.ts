import {
  IsEmail,
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { ValidateEmail } from 'src/modules/utils/emailLowercase';
import * as zxcvbn from 'zxcvbn';

export function IsPasswordValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            this.error = 'Empty password';
            return false;
          }

          // Büyük harf, küçük harf ve özel karakter içeren regex kontrolü
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])/;
          if (!regex.test(value)) {
            this.error =
              'Password must contain at least one uppercase letter, one lowercase letter, and one special character.';
            return false;
          }

          const result = zxcvbn(value);
          if (result.score === 0) {
            this.error = 'Password is too weak';
            return false;
          }

          return true;
        },
        defaultMessage(): string {
          return this.error || 'Something went wrong';
        },
      },
    });
  };
}



export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @ValidateEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  //@IsPasswordValid()
  readonly password: string;
  @IsString()
  @IsNotEmpty()
  readonly userType: string;
  @IsString()
  @IsNotEmpty()
  readonly website: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly surname: string;
  readonly odoo_id?: number;
  readonly odoo_partner_id?: number;
}
