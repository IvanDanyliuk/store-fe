export interface IReviewState {
  status: string;
  reviews: IReview[];
  error: string | null;
}

export interface IReview {
  _id?: string,
  productId: string;
  productImageUrl: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userAvatarUrl: string;
  advantages: string;
  disadvantages: string;
  comment: string;
  rate: number;
  likes: string[];
  dislikes: string[];
  date: Date;
}

export interface IReviewToUpdate {
  id: string;
  updatedReview: IReview;
}