import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class NextArticleComponent {
  @Prop()
  title: string;

  @Prop()
  header: string;

  @Prop()
  buttonText: string;

  @Prop()
  articleUrl: string;
}
