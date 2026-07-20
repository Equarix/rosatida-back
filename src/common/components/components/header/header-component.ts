import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class HeaderItemComponent {
  @Prop()
  name: string;

  @Prop()
  key: string;
}

@Schema({
  _id: false,
})
export class HeaderButtonComponent {
  @Prop()
  name: string;

  @Prop()
  key: string;

  @Prop()
  link: string;

  @Prop()
  isExternal: boolean;
}

@Schema({
  _id: false,
})
export class HeaderComponent {
  @Prop()
  proyectName: string;

  @Prop()
  proyectIcon: string;

  @Prop({
    type: [HeaderItemComponent],
  })
  items: HeaderItemComponent[];

  @Prop()
  isFixed: boolean;

  @Prop({
    type: [HeaderButtonComponent],
  })
  buttons: HeaderButtonComponent[];
}
