export interface Product {
    id: number
    name: string
    price: number
    images: string[]
    colors: string[]
    categoryId: number
    slug: string
    stock: number
    active: boolean
    color: string
    description: string
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductListProps {
  products: Product[];
}

export interface ProductCart extends Product {
  quantity: number;
}