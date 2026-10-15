import { Pet } from "./pets";

export type Egg = {
  rarity: string;
  price: number;
  pets: Pet[];
};

export type Eggs = {
  common: Egg;
  uncommon: Egg;
  rare: Egg;
  epic: Egg;
  legendary: Egg;
  mythic: Egg;
  astral: Egg;
};
