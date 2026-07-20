import { Prop, Schema } from '@nestjs/mongoose';
import { Color } from 'src/common/enum/Color.enum';

export enum PositionIcon {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

@Schema({
  _id: false,
})
export class StatsComponent {
  @Prop()
  text: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
  })
  color: Color;

  @Prop()
  icon: string;

  @Prop({
    type: String,
    enum: PositionIcon,
  })
  positionIcon: PositionIcon;
}
