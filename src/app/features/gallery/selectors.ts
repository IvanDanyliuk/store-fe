import { RootStateType } from "../store";


export const selectGalleryImages = (state: RootStateType) => state.gallery.imageUrls;
export const selectGalleryStatus = (state: RootStateType) => state.gallery.status;