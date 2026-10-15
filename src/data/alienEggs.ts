import { Eggs } from "../types/eggs";
import { alienPetSpecies } from "./alienPets";

export const alienEggs: Eggs = {
  common: {
    rarity: "common",
    price: 25,
    pets: alienPetSpecies.common,
  },
  uncommon: {
    rarity: "uncommon",
    price: 50,
    pets: alienPetSpecies.uncommon,
  },
  rare: {
    rarity: "rare",
    price: 100,
    pets: alienPetSpecies.rare,
  },
  epic: {
    rarity: "epic",
    price: 250,
    pets: alienPetSpecies.epic,
  },
  legendary: {
    rarity: "legendary",
    price: 500,
    pets: alienPetSpecies.legendary,
  },
  mythic: {
    rarity: "mythic",
    price: 1000,
    pets: alienPetSpecies.mythic,
  },
  astral: {
    rarity: "astral",
    price: 2500,
    pets: alienPetSpecies.astral,
  },
};
