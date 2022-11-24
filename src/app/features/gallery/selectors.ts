import { RootStateType } from "../store";


export const selectGalleryImages = (state: RootStateType) => state.gallery.imageUrls;