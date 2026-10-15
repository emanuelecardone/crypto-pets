export type Pet = {
  name: string;
  emoji: string;
  rarity: string;
  baseValue: number;
  earnings: number;
  mutation?: {
    type: "obsidian" | "toxic" | "cosmic" | "holographic" | "primordial";
    name: string;
    bonusMultiplier: number;
  };
};

export type Pets = {
  common: Pet[];
  uncommon: Pet[];
  rare: Pet[];
  epic: Pet[];
  legendary: Pet[];
  mythic: Pet[];
  astral: Pet[];
};
