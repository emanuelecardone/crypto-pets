import { Pets } from "../types/pets";

export const alienPetSpecies: Pets = {
  common: [
    {
      name: "Cosmic Microbe",
      emoji: "\u{1FAE5}",
      rarity: "common",
      baseValue: 5,
      earnings: 1,
    },
  ],
  uncommon: [
    {
      name: "Nebula Jelly",
      emoji: "\u{1F419}",
      rarity: "uncommon",
      baseValue: 10,
      earnings: 5,
    },
  ],
  rare: [
    {
      name: "Cyber Droid",
      emoji: "\u{1F916}",
      rarity: "rare",
      baseValue: 15,
      earnings: 25,
    },
  ],
  epic: [
    {
      name: "Void Invader",
      emoji: "\u{1F47E}",
      rarity: "epic",
      baseValue: 20,
      earnings: 120,
    },
  ],
  legendary: [
    {
      name: "Star Larson",
      emoji: "\u{1F47D}",
      rarity: "legendary",
      baseValue: 25,
      earnings: 600,
    },
  ],
  mythic: [
    {
      name: "Quantum Probe",
      emoji: "\u{1F6F0}\u{FE0F}",
      rarity: "mythic",
      baseValue: 30,
      earnings: 3000,
    },
  ],
  astral: [
    {
      name: "Galactic Overlord",
      emoji: "\u{1F6F8}",
      rarity: "astral",
      baseValue: 35,
      earnings: 15000,
    },
  ],
};
