interface ProductBase {
  name: string,
  category: { name: string },
  subCategory: { name: string },
  rewards: number,
  address: string,
  deposit: number,
  description: string,
}

interface BaseCategory {
  name: string,
  _id: string,
}

export type SubCategory = BaseCategory;

export interface Category extends BaseCategory {
  subCategories: SubCategory[]
}

export type Categories = Category[];

export interface Product extends ProductBase {
  isRented: boolean,
  isDeleted: boolean,
  image: string,
  user: {name: string},
  _id: string
}

export interface NewProduct extends ProductBase {
  image: File
}
