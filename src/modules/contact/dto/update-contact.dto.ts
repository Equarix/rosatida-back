import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import { ContactStatus } from '../entities/contact.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsEnum(ContactStatus, {
    message: `contactStatus must be one of the following values: ${Object.values(
      ContactStatus,
    ).join(', ')}`,
  })
  @IsNotEmpty()
  contactStatus: ContactStatus;
}
