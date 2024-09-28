import { Review } from "./review";

export interface Product {
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
    minimumOrderQuantity: number;
    warrantyInformation: string;
    shippingInformation: string;
    tags: string[];
    reviews: Review[];
    sku: string;
    weight: number;
    returnPolicy: string;
    dimensions: Dimension;
}

interface Dimension {
    width: number;
    height: number;
    depth: number;
}
