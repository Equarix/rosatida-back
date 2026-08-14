import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TableColumn {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  label: string;

  @Prop({
    required: true,
    enum: ['text', 'number', 'currency', 'date', 'boolean', 'image', 'link'],
  })
  type: string;

  @Prop({
    default: true,
  })
  autoWidth: boolean;
}

@Schema({ _id: false })
export class TableRow {
  @Prop({ type: Object, required: true })
  values: Record<string, unknown>;
}

@Schema({
  _id: false,
})
export class TableComponent {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: [TableColumn],
    default: [],
  })
  columns: TableColumn[];

  @Prop({
    type: [TableRow],
    default: [],
  })
  rows: TableRow[];
}
