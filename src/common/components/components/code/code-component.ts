import { Prop, Schema } from '@nestjs/mongoose';
import { LanguageType } from './codeType';

@Schema({
  _id: false,
})
export class CodeComponent {
  @Prop()
  code: string;

  @Prop({
    enum: LanguageType,
    type: String,
  })
  type: LanguageType;
}
