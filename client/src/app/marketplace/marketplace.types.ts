export interface Product {
  isDeleted: boolean,
  name: string,
  user: {name: string},
  category: { name: string },
  subCategory: { subCategoryName: string },
  rewards: number,
  address: string,
  deposit: number,
  durationInDays: string,
  description: string,
  image: string,
  _id: string
}
