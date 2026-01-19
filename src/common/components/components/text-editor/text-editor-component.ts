import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  _id: false,
})
export class TextEditorComponent {
  @Prop({
    default: 'doc',
  })
  type: string;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  content: any;
}
