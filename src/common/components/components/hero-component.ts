import { Prop, Schema } from '@nestjs/mongoose';
import { ColorEnum } from 'src/modules/categories/enum/ColorEnum';

@Schema({
  _id: false,
})
export class SpanHero {
  @Prop()
  text: string;

  @Prop({
    enum: ColorEnum,
    type: String,
  })
  color: ColorEnum;
}

@Schema({
  _id: false,
})
export class HeroComponent {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: SpanHero,
  })
  span: SpanHero;

  @Prop({
    required: false,
  })
  buttonLive?: string;

  @Prop({
    required: false,
  })
  buttonDemo?: string;

  @Prop({
    type: String,
  })
  image: string;
}
