export interface IShipping {
  _id?: string | undefined;
  company: string;
  country: string;
  cities: string[];
  price: number;
}

export interface IShippingState {
  status: string;
  shipping: IShipping | null | undefined;
  shippings: IShipping[];
  error: null | string;
}

export interface IShippingToUpdate {
  id: string;
  updatedShipping: IShipping;
}