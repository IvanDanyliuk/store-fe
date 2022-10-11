import { IShipping, IShippingToUpdate } from "../features/shipping/types";

export const isShippingDataValid = (data: IShipping, setError: (error: string) => void) => {
  if(!data.company) {
    setError('Company field is required!');
    return false;
  } else {
    setError('');
    return true;
  }
};