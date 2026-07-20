import { Prop, Schema } from '@nestjs/mongoose';
import { ComponentType } from './enum/ComponentEnum';
import { HeroComponent } from './components/hero-component';
import { ImageComponent } from './components/image/image';
import { CodeComponent } from './components/code/code-component';
import { NextArticleComponent } from './components/next-article/next-article-component';
import { TimeLine } from './components/time-line/time-line-component';
import { DetailsComponent } from './components/details/details-component';
import { QuoteComponent } from './components/quote/quote-component';
import { TextEditorComponent } from './components/text-editor/text-editor-component';
import { ImageCaptionComponent } from './components/image-caption/image-caption-component';
import { StatsComponent } from './components/stats/stas-component';
import { QuestionsComponent } from './components/questions/questions-component';
import { HeaderComponent } from './components/header/header-component';

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

  @Prop()
  key: string;

  @Prop({
    type: HeroComponent,
  })
  heroComponent: HeroComponent;

  @Prop({
    type: ImageComponent,
  })
  imageComponent: ImageComponent;

  @Prop({
    type: CodeComponent,
  })
  codeComponent: CodeComponent;

  @Prop({
    type: NextArticleComponent,
  })
  nextArticleComponent: NextArticleComponent;

  @Prop({
    type: [TimeLine],
  })
  timeLineComponent: TimeLine[];

  @Prop({
    type: [DetailsComponent],
  })
  detailsComponent: DetailsComponent[];

  @Prop({
    type: QuoteComponent,
  })
  quoteComponent: QuoteComponent;

  @Prop({
    type: TextEditorComponent,
  })
  textComponent: TextEditorComponent;

  @Prop({
    type: ImageCaptionComponent,
  })
  imageCaptionComponent: ImageCaptionComponent;

  @Prop({
    type: [StatsComponent],
  })
  statsComponent: StatsComponent[];

  @Prop({
    type: QuestionsComponent,
  })
  questionsComponent: QuestionsComponent;

  @Prop({
    type: HeaderComponent,
  })
  headerComponent: HeaderComponent;
}
