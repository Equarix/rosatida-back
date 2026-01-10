import { Prop, Schema } from '@nestjs/mongoose';
import { ComponentType } from '../../enum/ComponentEnum';
import { HeroComponent } from './hero-component';

@Schema({
  _id: false,
})
export class Components {
  @Prop({
    enum: ComponentType,
    required: true,
    type: String,
  })
  type: ComponentType;

  @Prop({
    type: HeroComponent,
  })
  heroComponent: HeroComponent;
}
