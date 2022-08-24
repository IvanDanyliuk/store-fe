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
      return isMobile ? '300px' : '20%';
    default:
      return '0%';
  }
};