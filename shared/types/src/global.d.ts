import type { Product as _Product } from "./product";
import type { ApiResponse as _ApiResponse } from "./api";

declare global {
  type Product = _Product;
  type ApiResponse<T> = _ApiResponse<T>;
}

export {};


