import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class QuestionComponent {
  @Prop()
  question: string;

  @Prop()
  answer: string;
}

@Schema({
  _id: false,
})
export class QuestionsComponent {
  @Prop()
  subHeading: string;

  @Prop()
  header: string;

  @Prop({
    type: [QuestionComponent],
  })
  questions: QuestionComponent[];
}
