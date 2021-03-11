import { FC } from 'react';
import { CourseJsonLdProps } from './course';
import { Review, AggregateRating } from './product';
import { RecipeJsonLdProps } from './recipe';
declare type Director = {
  name: string;
};
interface DefaultDataProps {
  url: string;
}
interface ExtendedCourseJsonLdProps
  extends CourseJsonLdProps,
    DefaultDataProps {}
interface ExtendedRecipeJsonLdProps
  extends RecipeJsonLdProps,
    DefaultDataProps {}
export interface MovieJsonLdProps {
  name: string;
  url: string;
  image: string;
  dateCreated?: string;
  director?: Director | Director[];
  review?: Review;
  aggregateRating?: AggregateRating;
}
export interface CarouselJsonLdProps {
  type: 'default' | 'movie' | 'recipe' | 'course';
  data:
    | DefaultDataProps[]
    | MovieJsonLdProps[]
    | ExtendedCourseJsonLdProps[]
    | ExtendedRecipeJsonLdProps[];
}
declare const CarouselJsonLd: FC<CarouselJsonLdProps>;
export default CarouselJsonLd;
