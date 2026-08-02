interface itemsProps {
  productId: number;
  quantity: number;
}

interface shippingAddressProps {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Address {
  userId: string;
  items: itemsProps[];
  shippingAddress: shippingAddressProps;
}
