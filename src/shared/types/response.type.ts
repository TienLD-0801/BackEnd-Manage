export type LoginResponse = {
  userInfo: {
    name: string;
    email: string;
    role: number;
  };
  token: string;
  refreshToken: string;
};

export type CreateUserResponse = {
  userInfo: {
    name: string;
    email: string;
    age: number;
    card_id: string;
    phone: string;
    role: number;
  };
  message: string;
};

export type UserResponse = {
  result: {
    id: number;
    name: string;
    email: string;
    age: number;
    card_id: string;
    phone: string;
    role: number;
  }[];
};

export type LogoutResponse = {
  message: string;
};

export type UpdateUser = {
  result: {
    name: string;
    email: string;
    role: number;
  };
  message: string;
};

export type DeleteUser = LogoutResponse;

export type ProductResponse = {
  result: {
    productName?: string;
    categoriesName?: number;
    urlImg?: string;
    descriptions?: string;
    price?: number;
  }[];
};

export type CategoryResponse = {
  result: {
    productCategory: string;
  }[];
};

export type CreateProductResponse = {
  message: string;
};

export type CreateCategoryResponse = CreateProductResponse;
