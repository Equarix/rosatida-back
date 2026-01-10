import { Prop, Schema } from '@nestjs/mongoose';
import { Color } from 'src/common/enum/Color.enum';
import { Position } from './position.enum';

@Schema({
  _id: false,
})
export class TimeLine {
  @Prop()
  icon: string;

  @Prop({
    type: String,
    enum: Color,
  })
  color: Color;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Position,
  })
  position: Position;
}
