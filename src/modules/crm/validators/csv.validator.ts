import { FileValidator } from '@nestjs/common';

export class CsvValidator extends FileValidator {
  buildErrorMessage(): string {
    return 'Invalid file type. Only CSV files are allowed.';
  }

  isValid(file: Express.Multer.File): boolean {
    return file.originalname.toLocaleLowerCase().endsWith('.csv');
  }
}
