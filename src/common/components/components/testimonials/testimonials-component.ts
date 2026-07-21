import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class Testimonial {
  @Prop()
  starts: number;

  @Prop()
  description: string;

  @Prop()
  name: string;

  @Prop()
  position: string;
}

@Schema({
  _id: false,
})
export class TestimonialsComponent {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop({
    type: [Testimonial],
  })
  testimonials: Testimonial[];
}
