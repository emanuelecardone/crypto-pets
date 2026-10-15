export type ShopProduct = {
  baseValue: number;
  increasePercentage: number;
  products: number[];
};

export type Shop = {
  extraGold: ShopProduct;
};
