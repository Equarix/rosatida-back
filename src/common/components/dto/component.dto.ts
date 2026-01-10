import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { ComponentType } from '../enum/ComponentEnum';
import { HeroComponentDto } from './components/hero.dto';
import { ImageDto } from './components/image.dto';
import { CodeComponentDto } from './components/code.dto';
import { NextArticleComponentDto } from './components/next-article-component.dto';
import { TimeLineDto } from './components/time-line.dto';
import { DetailsComponentDto } from './components/details-component.dto';
import { QuoteComponentDto } from './components/quote-component.dto';
import { ValidateComponent } from 'src/common/decorator/validate-component/validate-component.decorator';

export class ComponentDto {
  @IsEnum(ComponentType)
  @IsNotEmpty()
  type: ComponentType;

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
}
