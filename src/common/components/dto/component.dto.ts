import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ComponentType } from '../enum/ComponentEnum';
import { HeroComponentDto } from './components/hero.dto';
import { ImageDto } from './components/image.dto';
import { CodeComponentDto } from './components/code.dto';
import { NextArticleComponentDto } from './components/next-article-component.dto';
import { TimeLineDto } from './components/time-line.dto';
import { DetailsComponentDto } from './components/details-component.dto';
import { QuoteComponentDto } from './components/quote-component.dto';
import { TextEditorComponentDto } from './components/text-editor.dto';
import { ValidateComponent } from '../../decorator/validate-component/validate-component.decorator';
import { ImageCaptionComponentDto } from './components/image-caption-component.dto';
import { StatsComponentDto } from './components/stats-component';
import { QuestionsComponentDto } from './components/questions-component';
import { HeaderComponentDto } from './components/header-component.dto';
import { TestimonialsComponentDto } from './components/testimonials-component.dto';
import { CarrouselComponentDto } from './components/carrousel-component.dto';

export class ComponentDto {
  @IsEnum(ComponentType)
  @IsNotEmpty()
  type: ComponentType;

  @IsString()
  @IsOptional()
  key?: string;

  @ValidateComponent(ComponentType.HERO, HeroComponentDto)
  heroComponent: HeroComponentDto;

  @ValidateComponent(ComponentType.IMAGE, ImageDto)
  imageComponent: ImageDto;

  @ValidateComponent(ComponentType.CODE, CodeComponentDto)
  codeComponent: CodeComponentDto;

  @ValidateComponent(ComponentType.NEXT_ARTICLE, NextArticleComponentDto)
  nextArticleComponent: NextArticleComponentDto;

  @ValidateComponent(ComponentType.TIME_LINE, TimeLineDto, true)
  @IsArray()
  @ArrayMinSize(2)
  timeLineComponent: TimeLineDto[];

  @ValidateComponent(ComponentType.DETAILS, DetailsComponentDto, true)
  @IsArray()
  @ArrayMinSize(4)
  detailsComponent: DetailsComponentDto[];

  @ValidateComponent(ComponentType.QUOTE, QuoteComponentDto)
  quoteComponent: QuoteComponentDto;

  @ValidateComponent(ComponentType.TEXT_EDITOR, TextEditorComponentDto)
  textComponent: TextEditorComponentDto;

  @ValidateComponent(ComponentType.IMAGE_CAPTION, ImageCaptionComponentDto)
  imageCaptionComponent: ImageCaptionComponentDto;

  @ValidateComponent(ComponentType.STATS, StatsComponentDto, true)
  @IsArray()
  @ArrayMinSize(1)
  statsComponent: StatsComponentDto[];

  @ValidateComponent(ComponentType.QUESTIONS, QuestionsComponentDto)
  questionsComponent: QuestionsComponentDto;

  @ValidateComponent(ComponentType.HEADER, HeaderComponentDto)
  headerComponent: HeaderComponentDto;

  @ValidateComponent(ComponentType.TESTIMONIALS, TestimonialsComponentDto)
  testimonialsComponent: TestimonialsComponentDto;

  @ValidateComponent(ComponentType.CARROUSEL, CarrouselComponentDto)
  carrouselComponent: CarrouselComponentDto;
}
