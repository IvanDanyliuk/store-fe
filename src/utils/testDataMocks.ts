import { IProductCategory } from "../app/features/category/types";
import { IProduct } from "../app/features/product/types";
import { IShipping } from "../app/features/shipping/types";
import { IVacancy } from "../app/features/vacancies/types";


//User



//Categories
export const categoriesListMock: IProductCategory[] = [
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
];


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
export const categoryStateSuccess = {
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


//Gallery: error case
export const galleryStateError = {
  status: 'failed',
  imageUrls: [],
  error: 'Gallery error'
};


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
    createdAt: new Date().toDateString()
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


//Shipping: error case
export const shippingStateError = {
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
}


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