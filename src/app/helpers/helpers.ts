export const getFormattedTitle = (pathname: string, position: number) => {
  const title = pathname.split('/')[position];
  return title[0].toUpperCase() + title.slice(1);
};

export const setButtonColor = (color: string) => {
  switch (color) {
    case 'primary':
      return '#30D5F9';
    case 'secondary':
      return '#25A0BB';
    case 'success':
      return '#2BD4A1';
    case 'danger':
      return '#ED6060';
    default:
      return '#E0E0E0';
  }
};

export const setCellWidth = (name: string, isMobile: boolean) => {
  switch(name) {
    case 'productName':
      return isMobile ? '250px' : '50%';
    case 'productPrice':
      return isMobile ? '100px' : '10%';
    case 'productRating':
      return isMobile ? '70px' : '10%';
    case 'productImage':
      return isMobile ? '100px' : '10%';
    case 'productActions':
      return isMobile ? '300px' : '20%';
    case 'categoryName':
      return isMobile ? '250px' : '80%';
    case 'categoryActions':
      return isMobile ? '230px' : '20%';
    default:
      return '0%';
  }
};

export const setCategoryUrl = (title: string) => {
  const splittedTitle = title.toLowerCase().split(' ').map(item => item.replace(/[^a-z0-9]/gi, ''));
  return splittedTitle.length > 1 ? splittedTitle.join('-') : splittedTitle[0];
};

export const getSubCategoryList = (categories: any, mainCategoryTitle: any) => {
  return categories.find((category: any) => category.main.title === mainCategoryTitle);
};

export const formatObjectKey = (key: string) => {
  const splittedKey = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return splittedKey[0].toUpperCase() + splittedKey.slice(1);
};