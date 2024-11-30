import { Review } from "./review";

export interface Course {
    id: number;
    title: string;
    stock: number;
    thumbnail: string;
    price: number;
    discountPercentage: number;
    description: string;
    rating: number;
    images?: string[];
    brand?: string;
    category: string;
    duration :string ;
    tags: string[];
    reviews: Review[];
}


