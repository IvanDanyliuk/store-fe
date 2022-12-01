import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCategoryError, selectCategoryStatus } from '../../features/category/selectors';
import { selectGalleryError, selectGalleryStatus } from '../../features/gallery/selectors';
import { selectOrderError, selectOrderStatus } from '../../features/order/selectors';
import { selectProductError, selectProductStatus } from '../../features/product/selectors';
import { selectReviewsError, selectReviewsStatus } from '../../features/reviews/selectors';
import { selectShippingError, selectShippingStatus } from '../../features/shipping/selectors';
import { AppDispatch } from '../../features/store';
import { selectError, selectUserStatus } from '../../features/user/selectors';
import { selectVacancyError, selectVacancyStatus } from '../../features/vacancies/selectors';
import { clearShippingError } from '../../features/shipping/reducers';
import { useNavigate } from 'react-router-dom';
import { clearError as clearCategoriesError } from '../../features/category/reducers';
import { clearError as clearUserError } from '../../features/user/reducers';
import { clearGalleryError } from '../../features/gallery/reducers';
import { clearOrderError } from '../../features/order/reducers';
import { clearProductError } from '../../features/product/reducers';
import { clearReviewError } from '../../features/reviews/reducers';
import { clearVacancyError } from '../../features/vacancies/reducers';


const ServerErrorAlert: React.FC = () => {
  const { t } = useTranslation(['serverErrorAlert']);
  const dispatch = useDispatch<AppDispatch>();
  let location = useNavigate();

  const categoriesStatus = useSelector(selectCategoryStatus);
  const categoriesError = useSelector(selectCategoryError);
  const galleryStatus = useSelector(selectGalleryStatus);
  const galleryError = useSelector(selectGalleryError);
  const orderStatus = useSelector(selectOrderStatus);
  const orderError = useSelector(selectOrderError);
  const productStatus = useSelector(selectProductStatus);
  const productError = useSelector(selectProductError);
  const reviewsStatus = useSelector(selectReviewsStatus);
  const reviewsError = useSelector(selectReviewsError);
  const shippingStatus = useSelector(selectShippingStatus);
  const shippingError = useSelector(selectShippingError);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectError);
  const vacanciesStatus = useSelector(selectVacancyStatus);
  const vacanciesError = useSelector(selectVacancyError);

  const notify = (error: string) => toast.error(t(error!));

  useEffect(() => {
    if(categoriesError) {
      notify(categoriesError);
    }
    if(galleryError) {
      notify(galleryError);
    }
    if(orderError) {
      notify(orderError);
    }
    if(productError) {
      notify(productError);
    }
    if(reviewsError) {
      notify(reviewsError);
    }
    if(shippingError) {
      notify(shippingError);
    }
    if(userError) {
      notify(userError);
    }
    if(vacanciesError) {
      notify(vacanciesError);
    }
  }, [
    categoriesStatus, 
    galleryStatus, 
    orderStatus, 
    productStatus, 
    reviewsStatus, 
    shippingStatus, 
    userStatus, 
    vacanciesStatus
  ]);

  useEffect(() => {
    if(categoriesError) {
      dispatch(clearCategoriesError());
    }
    if(galleryError) {
      dispatch(clearGalleryError());
    }
    if(orderError) {
      dispatch(clearOrderError());
    }
    if(productError) {
      dispatch(clearProductError());
    }
    if(reviewsError) {
      dispatch(clearReviewError());
    }
    if(shippingError) {
      dispatch(clearShippingError());
    }
    if(userError) {
      dispatch(clearUserError());
    }
    if(vacanciesError) {
      dispatch(clearVacancyError());
    }
  }, [location]);

  return (
    <>
      {
        categoriesStatus === 'failed' ||
        galleryStatus === 'failed' || 
        orderStatus === 'failed' || 
        productStatus === 'failed' || 
        reviewsStatus === 'failed' || 
        shippingStatus === 'failed' || 
        userStatus === 'failed' || 
        vacanciesStatus === 'failed' ?
          <ToastContainer 
            position='bottom-right' 
            theme='colored'
          /> :
          <></>
      }
    </>
  );
};

export default ServerErrorAlert;