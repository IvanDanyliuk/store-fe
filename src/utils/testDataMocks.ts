import { ICategoryState, ICategoryToUpdate, IProductCategory } from "../app/features/category/types";
import { IGalleryImage, IGalleryState } from "../app/features/gallery/types";
import { IOrder, IOrderToUpdate } from "../app/features/order/types";
import { IProduct, IProductToUpdate } from "../app/features/product/types";
import { IReview, IReviewToUpdate } from "../app/features/reviews/types";
import { IShipping, IShippingState, IShippingToUpdate } from "../app/features/shipping/types";
import { IUser, IUserToUpdate } from "../app/features/user/types";
import { IVacanciesState, IVacancy, IVacancyToUpdate } from "../app/features/vacancies/types";


//User
export const userMock: IUser = {
  _id: 'user_id_1',
  firstName: 'John',
  lastName: 'Doe',
  avatarUrl: 'https://www.storage.com/users/user_1.png',
  city: 'London',
  email: 'test@test.com',
  password: 'testpassword',
  phone: '7777777777',
  isAdmin: true,
  orders: [],
  wishList: []
};

export const userToUpdateMock: IUserToUpdate = {
  id: 'user_id_1',
  userData: {
    _id: 'user_id_1',
    firstName: 'Johnny',
    lastName: 'Doe',
    avatarUrl: 'https://www.storage.com/users/user_1.png',
    city: 'London',
    email: 'test@test.com',
    password: 'updatedtestpassword',
    phone: '7777777777',
    isAdmin: true,
    orders: [],
    wishList: []
  }
};


//Categories
export const categoriesListMock: IProductCategory[] = [
  {
    _id: 'product_category_id_1',
    main: {
      title: 'Main Category Name',
      url: 'main-category-title'
    },
    subCategories: [
      {
        title: 'Sub-category name',
        image: 'https://www.storage.com/categories/category_1.png',
        url: 'sub-category-name'
      },
    ],
  },
];

export const newCategoryMock: IProductCategory = {
  main: {
    title: 'Main Category Name',
    url: 'main-category-title'
  },
  subCategories: [
    {
      title: 'Sub-category name',
      image: 'https://www.storage.com/categories/category_1.png',
      url: 'sub-category-name'
    },
  ],
};

export const categoryToUpdate: ICategoryToUpdate = {
  id: 'product_category_id_1',
  updatedCategory: {
    _id: 'product_category_id_1',
    main: {
      title: 'Updated Main Category Name',
      url: 'updated-main-category-title'
    },
    subCategories: [
      {
        title: 'Sub-category name',
        image: 'https://www.storage.com/categories/category_1.png',
        url: 'sub-category-name'
      },
    ],
  }
};


//Products
export const productsMock = [{
  _id: 'product_id_1',
  brand: 'Test Brand',
  category: {
    main: {
      title: 'Main Category Name',
      url: 'main-category-title'
    },
    subCategory: {
      title: 'Sub-category name',
      url: 'sub-category-name'
    }
  },
  color: '#ffffff',
  description: 'Test Descrinption',
  image: 'https://www.storage.com/categories/test_product.png',
  isInStock: true,
  price: 1000,
  promotion: ['TOP'],
  rating: 5,
  shortInfo: 'Test short information',
  title: 'Test Title'
}];

export const productFromWishListMock: IProduct = {
  _id: 'product_id_1',
    brand: 'Test Brand',
    category: {
      main: {
        title: 'Main Category Name',
        url: 'main-category-title'
      },
      subCategory: {
        title: 'Sub-category name',
        url: 'sub-category-name'
      }
    },
    color: '#ffffff',
    description: 'Test Descrinption',
    image: 'https://www.storage.com/categories/test_product.png',
    isInStock: true,
    price: 1000,
    promotion: ['TOP'],
    rating: 5,
    shortInfo: 'Test short information',
    title: 'Test Title'
};

export const productNotFromWishListMock = {
  _id: 'product_id_2',
    brand: 'Test Brand',
    category: {
      main: {
        title: 'Main Category Name',
        url: 'main-category-title'
      },
      subCategory: {
        title: 'Sub-category name',
        url: 'sub-category-name'
      }
    },
    color: '#ffffff',
    description: 'Test Descrinption',
    image: 'https://www.storage.com/categories/test_product.png',
    isInStock: true,
    price: 1000,
    promotion: ['TOP'],
    rating: 5,
    shortInfo: 'Test short information',
    title: 'Another Test Title'
};


//Reviews
export const reviewMock = {
  _id: 'review_id_1',
  productId: 'product_id_1',
  productImageUrl: 'https://www.storage.com/products/product_1.png',
  userFirstName: 'Test User First Name',
  userLastName: 'Test User Last Name',
  userEmail: 'test@test.com',
  userAvatarUrl: 'https://www.storage.com/users/user_1.png',
  advantages: 'Test Advantages',
  disadvantages: 'Test Disadvantages',
  comment: 'Test Comment',
  rate: 5,
  likes: [],
  dislikes: [],
  date: new Date()
};

export const reviewErrorMock = {
  _id: 'review_id_1',
  productId: 'product_id_1',
  productImageUrl: 'https://www.storage.com/products/product_1.png',
  userFirstName: 'Test User First Name',
  userLastName: 'Test User Last Name',
  userEmail: 'test@test.com',
  userAvatarUrl: 'https://www.storage.com/users/user_1.png',
  advantages: 'Test Advantages',
  disadvantages: 'Test Disadvantages',
  comment: '',
  rate: 5,
  likes: [],
  dislikes: [],
  date: new Date()
};


//Orders
export const orderMock = {
  _id: 'order_id_1',
  products: [
    {
      _id: 'product_id_1',
      quantity: 1,
      product: {
        _id: 'product_id_1',
        brand: 'Test Brand',
        category: {
          main: {
            title: 'Main Category Name',
            url: 'main-category-title'
          },
          subCategory: {
            title: 'Sub-category name',
            url: 'sub-category-name'
          }
        },
        color: '#ffffff',
        description: 'Test Descrinption',
        image: 'https://www.storage.com/categories/test_product.png',
        isInStock: true,
        price: 1000,
        promotion: ['TOP'],
        rating: 5,
        shortInfo: 'Test short information',
        title: 'Test Title'
      }
    }
  ],
  amount: 1000,
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '7777777',
    email: 'j.doe@gmail.com'
  },
  recepient: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '7777777',
    email: 'j.doe@gmail.com'
  },
  isPaid: false,
  isShipped: false,
  shippingCity: 'London',
  shippingCompany: 'DHL',
  paymentMethod: 'card',
  creditCardNumber: '',
  createdAt: new Date().toDateString()
};

export const orderCustomerDataMock = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@test.com',
  phone: '777 777 77 77'
};

export const ordersListMock = [
  {
    _id: 'order_id_1',
    products: [
      {
        product: {
          _id: 'product_id_1',
          brand: 'Test Brand',
          category: {
            main: {
              title: 'Main Category Name',
              url: 'main-category-title'
            },
            subCategory: {
              title: 'Sub-category name',
              url: 'sub-category-name'
            }
          },
          color: '#ffffff',
          description: 'Test Descrinption',
          image: 'https://www.storage.com/categories/test_product.png',
          isInStock: true,
          price: 1000,
          promotion: ['TOP'],
          rating: 5,
          shortInfo: 'Test short information',
          title: 'Test Title'
        },
        quantity: 1
      }
    ],
    amount: 1,
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    recepient: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    isPaid: false,
    isShipped: false,
    shippingCity: 'London',
    shippingCompany: 'DHL',
    paymentMethod: 'card',
    creditCardNumber: '',
    createdAt: new Date().toDateString()
  }
];


//Cart
export const cartDataMock = [
  {
    _id: 'cart_item_id_1',
    quantity: 1, 
    product: {
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }
  }
];


//Shipping
export const shippingListMock: IShipping[] = [
  {
    _id: 'shipping_id_1',
    company: 'Test Company',
    country: 'Test Country',
    cities: ['Test City 1', 'Test City 2', 'Test City 3'],
    price: 100
  }
];


//Vacancies
export const vacanciesListMock: IVacancy[] = [
  {
    _id: 'vacancy_id_1',
    title: 'Test Title',
    character: 'Test Character',
    employment: 'Test Employment',
    experience: 'Test Experience',
    responsibilities: 'Test Responsibilities',
    mustHaves: 'Test Must Haves',
    contactPerson: 'Test Contact Person',
    contactPhone: '777 777 77 77',
    contactEmail: 'test@test.com',
    salary: '1000',
    createdAt: new Date().toDateString(),
  }
];

export const vacancyResponseMock = {
  data: [{
    _id: 'vacancy_id_1',
    title: 'Test Title',
    character: 'Test Character',
    employment: 'Test Employment',
    experience: 'Test Experience',
    responsibilities: 'Test Responsibilities',
    mustHaves: 'Test Must Haves',
    contactPerson: 'Test Contact Person',
    contactPhone: '777 777 77 77',
    contactEmail: 'test@test.com',
    salary: '1000',
    createdAt: new Date().toDateString(),
  }], 
  pages: 1
};

export const vacancyItemMock: IVacancy ={
  _id: 'vacancy_id_2',
  title: 'Test Title',
  character: 'Test Character',
  employment: 'Test Employment',
  experience: 'Test Experience',
  responsibilities: 'Test Responsibilities',
  mustHaves: 'Test Must Haves',
  contactPerson: 'Test Contact Person',
  contactPhone: '777 777 77 77',
  contactEmail: 'test@test.com',
  salary: '1000',
  createdAt: new Date().toDateString(),
};

export const vacancyToUpdateMock: IVacancyToUpdate = {
  id: 'vacancy_id_1',
  updatedVacancy: {
    _id: 'vacancy_id_1',
    title: 'Updated Test Title',
    character: 'Test Character',
    employment: 'Test Employment',
    experience: 'Test Experience',
    responsibilities: 'Test Responsibilities',
    mustHaves: 'Test Must Haves',
    contactPerson: 'Test Contact Person',
    contactPhone: '777 777 77 77',
    contactEmail: 'test@test.com',
    salary: '1000',
    createdAt: new Date().toDateString(),
  }
}


//Preloaded State Mocks
//User: successfull case
export const userStateSuccess = {
  status: 'succeeded',
  language: 'en',
  user: {
    _id: 'user_1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'j.doe@gmail.com',
    phone: '7777777',
    password: '123456',
    city: 'London',
    avatarUrl: 'https://www.storage.com/user_1_image.png',
    wishList: [{
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }],
    orders: [],
    isAdmin: true,
  },
  error: null
};

//User: error case
export const userStateError = {
  status: 'failed',
  language: 'en',
  user: null,
  error: 'User error'
};


//Category: successfull case
export const categoryStateSuccess: ICategoryState = {
  status: 'succeeded',
  category: null,
  categories: [
    {
      main: {
        title: 'Main Category Name',
        url: 'main-category-title'
      },
      subCategories: [
        {
          title: 'Sub-category name',
          image: 'https://www.storage.com/categories/category_1.png',
          url: 'sub-category-name'
        },
      ],
    },
  ],
  error: null
};

//Category: error case
export const categoryStateError = {
  status: 'failed',
  category: null,
  categories: [],
  error: 'Category error'
};

//Category: updating case
export const categoryStateUpdating = {
  status: 'succeeded',
  category: {
    main: {
      title: 'Main Category Name',
      url: 'main-category-title'
    },
    subCategories: [
      {
        title: 'Sub-category name',
        image: 'https://www.storage.com/categories/category_1.png',
        url: 'sub-category-name'
      },
    ],
  },
  categories: [
    {
      main: {
        title: 'Main Category Name',
        url: 'main-category-title'
      },
      subCategories: [
        {
          title: 'Sub-category name',
          image: 'https://www.storage.com/categories/category_1.png',
          url: 'sub-category-name'
        },
      ],
    },
  ],
  error: null
};


//Gallery: state success
export const galleryStateSuccess: IGalleryState = {
  status: 'succeeded',
  imageUrls: [
    {
      _id: 'gallery_image_id_1',
      url: 'https://www.storage.com/gallery/image_1.png'
    },
    {
      _id: 'gallery_image_id_2',
      url: 'https://www.storage.com/gallery/image_2.png'
    },
    {
      _id: 'gallery_image_id_3',
      url: 'https://www.storage.com/gallery/image_3.png'
    },
  ],
  error: null
};

//Gallery: successfull case
export const galleryUrlsSuccess: IGalleryImage[] = [
  {
    _id: 'gallery_image_id_1',
    url: 'https://www.storage.com/gallery/image_1.png'
  },
  {
    _id: 'gallery_image_id_2',
    url: 'https://www.storage.com/gallery/image_2.png'
  },
  {
    _id: 'gallery_image_id_3',
    url: 'https://www.storage.com/gallery/image_3.png'
  },
];

export const galleryImage: IGalleryImage = {
  _id: 'gallery_image_id_1',
  url: 'https://www.storage.com/gallery/image_1.png'
};

//Gallery: error case
export const galleryStateError: IGalleryState = {
 status: 'failed',
 imageUrls: [],
 error: 'error'
};

export const galleryUrlsError = [];


//Product: successfull case
export const productStateSuccess = {
  status: 'succeeded',
  brands: ['Test Brand'],
  product: null,
  products: {
    data: [{
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }],
    pages: 1
  },
  search: [
    {
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }
  ],
  error: null
};

//Product: error case
export const productStateError = {
  status: 'failed',
  search: [],
  product: null,
  products: {
    data: [],
    pages: 0
  },
  brands: [],
  error: 'Product error'
};

//Product: updating case
export const productStateUpdating = {
  status: 'succeeded',
  brands: ['Test Brand'],
  product: {
    _id: 'product_id_1',
    brand: 'Test Brand',
    category: {
      main: {
        title: 'Main Category Name',
        url: 'main-category-title'
      },
      subCategory: {
        title: 'Sub-category name',
        url: 'sub-category-name'
      }
    },
    color: '#ffffff',
    description: 'Test Descrinption',
    image: 'https://www.storage.com/categories/test_product.png',
    isInStock: true,
    price: 1000,
    promotion: ['TOP'],
    rating: 5,
    shortInfo: 'Test short information',
    title: 'Test Title'
  },
  products: {
    data: [{
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }],
    pages: 1
  },
  search: [
    {
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }
  ],
  error: null
};

export const productResponseMock = {
  data: [
    {
      _id: 'product_id_1',
      brand: 'Test Brand',
      category: {
        main: {
          title: 'Main Category Name',
          url: 'main-category-title'
        },
        subCategory: {
          title: 'Sub-category name',
          url: 'sub-category-name'
        }
      },
      color: '#ffffff',
      description: 'Test Descrinption',
      image: 'https://www.storage.com/categories/test_product.png',
      isInStock: true,
      price: 1000,
      promotion: ['TOP'],
      rating: 5,
      shortInfo: 'Test short information',
      title: 'Test Title'
    }
  ],
  pages: 1
};

export const productItem: IProduct = {
  _id: 'product_id_1',
  brand: 'Test Brand',
  category: {
    main: {
      title: 'Main Category Name',
      url: 'main-category-title'
    },
    subCategory: {
      title: 'Sub-category name',
      url: 'sub-category-name'
    }
  },
  color: '#ffffff',
  description: 'Test Descrinption',
  image: 'https://www.storage.com/categories/test_product.png',
  isInStock: true,
  price: 1000,
  promotion: ['TOP'],
  rating: 5,
  shortInfo: 'Test short information',
  title: 'Test Title'
};

export const brandsResponseMock = ['Apple', 'Samsung', 'Sony'];

export const productToUpdate: IProductToUpdate = {
  id: 'product_id_1',
  updatedProduct: {
    _id: 'product_id_1',
    brand: 'Test Brand',
    category: {
      main: {
        title: 'Main Category Name',
        url: 'main-category-title'
      },
      subCategory: {
        title: 'Sub-category name',
        url: 'sub-category-name'
      }
    },
    color: '#ffffff',
    description: 'Test Descrinption',
    image: 'https://www.storage.com/categories/test_product.png',
    isInStock: true,
    price: 1000,
    promotion: ['TOP'],
    rating: 5,
    shortInfo: 'Test short information',
    title: 'Updated Test Title'
  }
};


//Cart: successfull state
export const cartStateSuccess = {
  status: 'succeeded',
  cart: [
    {
      product: {
        _id: 'product_id_1',
        brand: 'Test Brand',
        category: {
          main: {
            title: 'Main Category Name',
            url: 'main-category-title'
          },
          subCategory: {
            title: 'Sub-category name',
            url: 'sub-category-name'
          }
        },
        color: '#ffffff',
        description: 'Test Descrinption',
        image: 'https://www.storage.com/categories/test_product.png',
        isInStock: true,
        price: 1000,
        promotion: ['TOP'],
        rating: 5,
        shortInfo: 'Test short information',
        title: 'Test Title'
      },
      quantity: 1
    }
  ],
  error: null
};


//Reviews: successfull case
export const reviewsStateSuccess = {
  status: 'succeeded',
  reviews: [
    {
      _id: 'review_id_1',
      productId: 'product_id_1',
      productImageUrl: 'https://www.storage.com/products/product_1.png',
      userFirstName: 'Test User First Name',
      userLastName: 'Test User Last Name',
      userEmail: 'test@test.com',
      userAvatarUrl: 'https://www.storage.com/users/user_1.png',
      advantages: 'Test Advantages',
      disadvantages: 'Test Disadvantages',
      comment: 'Test Comment',
      rate: 5,
      likes: [],
      dislikes: [],
      date: new Date()
    }
  ],
  error: null
};

export const reviewsMock: IReview[] = [
  {
    _id: 'review_id_1',
    productId: 'product_id_1',
    productImageUrl: 'https://www.storage.com/products/product_1.png',
    userFirstName: 'Test User First Name',
    userLastName: 'Test User Last Name',
    userEmail: 'test@test.com',
    userAvatarUrl: 'https://www.storage.com/users/user_1.png',
    advantages: 'Test Advantages',
    disadvantages: 'Test Disadvantages',
    comment: 'Test Comment',
    rate: 5,
    likes: [],
    dislikes: [],
    date: new Date()
  }
];

export const reviewItemMock: IReview = {
  _id: 'review_id_1',
  productId: 'product_id_1',
  productImageUrl: 'https://www.storage.com/products/product_1.png',
  userFirstName: 'Test User First Name',
  userLastName: 'Test User Last Name',
  userEmail: 'test@test.com',
  userAvatarUrl: 'https://www.storage.com/users/user_1.png',
  advantages: 'Test Advantages',
  disadvantages: 'Test Disadvantages',
  comment: 'Test Comment',
  rate: 5,
  likes: [],
  dislikes: [],
  date: new Date()
};

export const reviewItemToUpdate: IReviewToUpdate = {
  id: 'review_id_1',
  updatedReview: {
    _id: 'review_id_1',
    productId: 'product_id_1',
    productImageUrl: 'https://www.storage.com/products/product_1.png',
    userFirstName: 'Test User First Name',
    userLastName: 'Test User Last Name',
    userEmail: 'test@test.com',
    userAvatarUrl: 'https://www.storage.com/users/user_1.png',
    advantages: 'Test Advantages',
    disadvantages: 'Test Disadvantages',
    comment: 'Updated Test Comment',
    rate: 5,
    likes: [],
    dislikes: [],
    date: new Date()
  }
};

//Reviews: error case
export const reviewsStateError = {
  status: 'failed',
  reviews: [],
  error: 'Reviews error'
};


//Order: successfull case
export const orderStateSuccess = {
  status: 'succeeded',
  clientSecret: 'client_secret_key',
  order: null,
  orders: {
    data: [
      {
        _id: 'order_id_1',
        products: [
          {
            _id: '',
            product: {
              _id: 'product_id_1',
              brand: 'Test Brand',
              category: {
                main: {
                  title: 'Main Category Name',
                  url: 'main-category-title'
                },
                subCategory: {
                  title: 'Sub-category name',
                  url: 'sub-category-name'
                }
              },
              color: '#ffffff',
              description: 'Test Descrinption',
              image: 'https://www.storage.com/categories/test_product.png',
              isInStock: true,
              price: 1000,
              promotion: ['TOP'],
              rating: 5,
              shortInfo: 'Test short information',
              title: 'Test Title'
            },
            quantity: 1
          }
        ],
        amount: 1000,
        customer: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '777 777 77 77',
          email: 'test@test.com'
        },
        recepient: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '777 777 77 77',
          email: 'test@test.com'
        },
        isPaid: false,
        isShipped: false,
        paymentMethod: 'card',
        creditCardNumber: '',
        shippingCity: 'London',
        shippingCompany: 'DHL',
        createdAt: new Date().toDateString(),
      }
    ],
    pages: 1
  },
  error: null
};

export const ordersMock = {
  data: [
    {
      _id: 'order_id_1',
      products: [
        {
          _id: 'order_id_1',
          product: {
            _id: 'product_id_1',
            brand: 'Test Brand',
            category: {
              main: {
                title: 'Main Category Name',
                url: 'main-category-title'
              },
              subCategory: {
                title: 'Sub-category name',
                url: 'sub-category-name'
              }
            },
            color: '#ffffff',
            description: 'Test Descrinption',
            image: 'https://www.storage.com/categories/test_product.png',
            isInStock: true,
            price: 1000,
            promotion: ['TOP'],
            rating: 5,
            shortInfo: 'Test short information',
            title: 'Test Title'
          },
          quantity: 1
        }
      ],
      amount: 1000,
      customer: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '777 777 77 77',
        email: 'test@test.com'
      },
      recepient: {
        firstName: 'John',
        lastName: 'Doe',
        phone: '777 777 77 77',
        email: 'test@test.com'
      },
      isPaid: false,
      isShipped: false,
      paymentMethod: 'card',
      creditCardNumber: '',
      shippingCity: 'London',
      shippingCompany: 'DHL',
      createdAt: new Date().toDateString(),
    }
  ],
  pages: 1
};

export const orderItemMock: IOrder = {
  _id: 'order_id_1',
  products: [
    {
      id: 'order_id_1',
      product: {
        _id: 'product_id_1',
        brand: 'Test Brand',
        category: {
          main: {
            title: 'Main Category Name',
            url: 'main-category-title'
          },
          subCategory: {
            title: 'Sub-category name',
            url: 'sub-category-name'
          }
        },
        color: '#ffffff',
        description: 'Test Descrinption',
        image: 'https://www.storage.com/categories/test_product.png',
        isInStock: true,
        price: 1000,
        promotion: ['TOP'],
        rating: 5,
        shortInfo: 'Test short information',
        title: 'Test Title'
      },
      quantity: 1
    }
  ],
  amount: 1000,
  customer: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '777 777 77 77',
    email: 'test@test.com'
  },
  recepient: {
    firstName: 'John',
    lastName: 'Doe',
    phone: '777 777 77 77',
    email: 'test@test.com'
  },
  isPaid: false,
  isShipped: false,
  paymentMethod: 'card',
  creditCardNumber: '',
  shippingCity: 'London',
  shippingCompany: 'DHL',
  createdAt: new Date().toDateString(),
};

export const orderToUpdate: IOrderToUpdate = {
  id: 'order_id_1',
  updatedOrder: {
    _id: 'order_id_1',
    products: [
      {
        id: 'order_id_1',
        product: {
          _id: 'product_id_1',
          brand: 'Test Brand',
          category: {
            main: {
              title: 'Main Category Name',
              url: 'main-category-title'
            },
            subCategory: {
              title: 'Sub-category name',
              url: 'sub-category-name'
            }
          },
          color: '#ffffff',
          description: 'Test Descrinption',
          image: 'https://www.storage.com/categories/test_product.png',
          isInStock: true,
          price: 1000,
          promotion: ['TOP'],
          rating: 5,
          shortInfo: 'Test short information',
          title: 'Test Title'
        },
        quantity: 7
      }
    ],
    amount: 7000,
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    recepient: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    isPaid: false,
    isShipped: false,
    paymentMethod: 'card',
    creditCardNumber: '',
    shippingCity: 'London',
    shippingCompany: 'DHL',
    createdAt: new Date().toDateString(),
  }
};

//Order: error case
export const orderStateError = {
  status: 'failed',
  order: null,
  clientSecret: 'client_secret_unique_key',
  orders: {
    data: [],
    pages: 0,
  },
  error: 'Order error'
};

//Order: updating case
export const orderStateUpdating = {
  status: 'succeeded',
  clientSecret: 'client_secret_key',
  order: {
    _id: 'order_id_1',
    products: [
      {
        _id: '',
        product: {
          _id: 'product_id_1',
          brand: 'Test Brand',
          category: {
            main: {
              title: 'Main Category Name',
              url: 'main-category-title'
            },
            subCategory: {
              title: 'Sub-category name',
              url: 'sub-category-name'
            }
          },
          color: '#ffffff',
          description: 'Test Descrinption',
          image: 'https://www.storage.com/categories/test_product.png',
          isInStock: true,
          price: 1000,
          promotion: ['TOP'],
          rating: 5,
          shortInfo: 'Test short information',
          title: 'Test Title'
        },
        quantity: 1
      }
    ],
    amount: 1000,
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    recepient: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '777 777 77 77',
      email: 'test@test.com'
    },
    isPaid: false,
    isShipped: false,
    paymentMethod: 'card',
    creditCardNumber: '',
    shippingCity: 'London',
    shippingCompany: 'DHL',
    createdAt: new Date().toDateString(),
  },
  orders: {
    data: [
      {
        _id: 'order_id_1',
        products: [
          {
            _id: '',
            product: {
              _id: 'product_id_1',
              brand: 'Test Brand',
              category: {
                main: {
                  title: 'Main Category Name',
                  url: 'main-category-title'
                },
                subCategory: {
                  title: 'Sub-category name',
                  url: 'sub-category-name'
                }
              },
              color: '#ffffff',
              description: 'Test Descrinption',
              image: 'https://www.storage.com/categories/test_product.png',
              isInStock: true,
              price: 1000,
              promotion: ['TOP'],
              rating: 5,
              shortInfo: 'Test short information',
              title: 'Test Title'
            },
            quantity: 1
          }
        ],
        amount: 1000,
        customer: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '777 777 77 77',
          email: 'test@test.com'
        },
        recepient: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '777 777 77 77',
          email: 'test@test.com'
        },
        isPaid: false,
        isShipped: false,
        paymentMethod: 'card',
        creditCardNumber: '',
        shippingCity: 'London',
        shippingCompany: 'DHL',
        createdAt: new Date().toDateString(),
      }
    ],
    pages: 1
  },
  error: null
};

//Shipping: success case
export const shippingStateSuccess: IShippingState = {
  status: 'succeeded',
  shipping: null,
  shippings: [
    {
      _id: 'shipping_id_1',
      company: 'Test Company',
      country: 'Test Country',
      cities: ['Test City 1', 'Test City 2', 'Test City 3'],
      price: 100
    },
    {
      _id: 'shipping_id_2',
      company: 'Another Test Company',
      country: 'Another Test Country',
      cities: ['Another Test City 1', 'Another Test City 2', 'Another Test City 3'],
      price: 100
    },
    {
      _id: 'shipping_id_3',
      company: 'Self Pickup',
      country: 'One More Test Country',
      cities: ['One More Test City 1', 'One More Test City 2', 'One More Test City 3'],
      price: 100
    }
  ],
  error: null
};

//Shipping: error case
export const shippingStateError: IShippingState = {
  status: 'failed',
  shipping: null,
  shippings: [],
  error: 'Shipping error'
};

//Shipping: updating case
export const shippingStateUpdating = {
  status: 'succeeded',
  shipping: {
    _id: 'shipping_id_1',
    company: 'Test Company',
    country: 'Test Country',
    cities: ['Test City 1', 'Test City 2', 'Test City 3'],
    price: 100
  },
  shippings: [
    {
      _id: 'shipping_id_1',
      company: 'Test Company',
      country: 'Test Country',
      cities: ['Test City 1', 'Test City 2', 'Test City 3'],
      price: 100
    }
  ],
  error: null
};

export const shippingsMock: IShipping[] = [
  {
    _id: 'shipping_id_1',
    company: 'Test Company',
    country: 'Test Country',
    cities: ['Test City 1', 'Test City 2', 'Test City 3'],
    price: 100
  }
];

export const shippingItemMock: IShipping = {
  _id: 'shipping_id_2',
  company: 'Test Company',
  country: 'Test Country',
  cities: ['Test City 1', 'Test City 2', 'Test City 3'],
  price: 100
};

export const shippingToUpdateMock: IShippingToUpdate = {
  id: 'shipping_id_1',
  updatedShipping: {
    _id: 'shipping_id_1',
    company: 'Updated Test Company',
    country: 'Test Country',
    cities: ['Test City 1', 'Test City 2', 'Test City 3'],
    price: 100
  }
};


//Vacancies: success case
export const vacanciesStateSuccess: IVacanciesState = {
  status: 'succeeded',
  vacancy: null,
  vacancies: {
    data: [
      {
        _id: 'vacancy_id_1',
        title: 'Test Title',
        character: 'remote-office',
        employment: 'full-time',
        experience: 'Test Experience',
        responsibilities: 'Test Responsibilities',
        mustHaves: 'Test Must Haves',
        contactPerson: 'Test Contact Person',
        contactPhone: '7777777777',
        contactEmail: 'test@test.com',
        salary: '1000',
        createdAt: new Date().toDateString(),
      },
    ],
    pages: 1,
  },
  error: null
};

//Vacancies: error case
export const vacanciesStateError = {
  status: 'failed',
  vacancy: null,
  vacancies: {
    data: [],
    pages: 0,
  },
  error: 'Vacancies error'
};

//Vacancies: updating case
export const vacanciesStateUpdating = {
  status: 'succeeded',
  vacancy: {
    _id: 'vacancy_id_1',
    title: 'Test Title',
    character: 'Test Character',
    employment: 'Test Employment',
    experience: 'Test Experience',
    responsibilities: 'Test Responsibilities',
    mustHaves: 'Test Must Haves',
    contactPerson: 'Test Contact Person',
    contactPhone: '777 777 77 77',
    contactEmail: 'test@test.com',
    salary: '1000',
    createdAt: new Date().toDateString(),
  },
  vacancies: {
    data: [
      {
        _id: 'vacancy_id_1',
        title: 'Test Title',
        character: 'Test Character',
        employment: 'Test Employment',
        experience: 'Test Experience',
        responsibilities: 'Test Responsibilities',
        mustHaves: 'Test Must Haves',
        contactPerson: 'Test Contact Person',
        contactPhone: '777 777 77 77',
        contactEmail: 'test@test.com',
        salary: '1000',
        createdAt: new Date().toDateString(),
      }
    ],
    pages: 1
  },
  error: null
};