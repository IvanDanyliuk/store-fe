export interface IGalleryState {
  status: string;
  imageUrls: IGalleryImage[];
  error: null | string;
};

export interface IGalleryImage {
  _id?: string;
  url: string;
};