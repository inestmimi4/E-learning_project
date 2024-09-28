import { Product } from "./product";

export interface CartItem {
    product: Product;
    count: number;
}
