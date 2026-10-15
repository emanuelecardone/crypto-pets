export type UserUpgrade = {
  baseValue: number;
  increasePercentage: number;
  currentBonus: number;
};

export type UserUpgrades = {
  extraGold: UserUpgrade;
  extraGems: UserUpgrade;
  rebirths: UserUpgrade & { currentRebirth: number };
};
