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

export enum TypeHeader {
  TYPE_ONE = 'type_one',
  TYPE_TWO = 'type_two',
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
    type: String,
    enum: TypeHeader,
    default: TypeHeader.TYPE_ONE,
  })
  type: TypeHeader;

  @Prop({
    type: [HeaderButtonComponent],
  })
  buttons: HeaderButtonComponent[];
}
