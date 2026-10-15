import { Eggs } from "../types/eggs";
import { petSpecies } from "./pets";

export const eggs: Eggs = {
  common: {
    rarity: "common",
    price: 500,
    pets: petSpecies.common,
  },
  uncommon: {
    rarity: "uncommon",
    price: 2000,
    pets: petSpecies.uncommon,
  },
  rare: {
    rarity: "rare",
    price: 8000,
    pets: petSpecies.rare,
  },
  epic: {
    rarity: "epic",
    price: 32000,
    pets: petSpecies.epic,
  },
  legendary: {
    rarity: "legendary",
    price: 128000,
    pets: petSpecies.legendary,
  },
  mythic: {
    rarity: "mythic",
    price: 512000,
    pets: petSpecies.mythic,
  },
  astral: {
    rarity: "astral",
    price: 2048000,
    pets: petSpecies.astral,
  },
};
