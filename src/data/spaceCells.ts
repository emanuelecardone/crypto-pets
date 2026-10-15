import { SpaceCells } from "../types/spaceCells";

export const spaceCells: SpaceCells = {
  buildings: {
    hatchery: 153,
    cave: 231,
    door: 132,
    alien: {
      position: 114,
      icon: "\u{1F419}",
    },
    guardian: {
      position: 357,
      icon: "\u{1F479}",
    },
    relic: {
      position: 330,
      icon: "\u{269B}\u{FE0F}",
    },
    rebirth: 193,
  },
  paths: {
    route: [
      94, 101, 102, 103, 104, 105, 107, 106, 108, 109, 110, 111, 112, 113, 114,
      115, 131, 135, 144, 146, 151, 155, 164, 165, 166, 171, 173, 174, 175, 185,
      188, 189, 190, 191, 208, 228,
    ],
    cave: [
      26, 32, 33, 44, 45, 46, 52, 241, 242, 243, 244, 245, 246, 247, 248, 250,
      251, 252, 253, 254, 255, 256, 257, 258, 261, 270, 278, 281, 283, 284, 285,
      286, 287, 288, 289, 290, 292, 293, 294, 295, 296, 298, 303, 312, 316, 318,
      323, 324, 325, 326, 327, 328, 329, 330, 332, 333, 334, 336, 338, 354, 356,
      357, 358, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373,
      374, 377,
    ],
  },
  legend: {
    colors: {
      cellsIndex: [77, 97, 117, 137],
      cellsColor: ["gold", "darkslategray", "lime", "fuchsia"],
    },
    texts: {
      textsIndex: [78, 98, 118, 138],
      textsContent: ["Hatchery", "Cave", "Teleport", "Rebirth"],
    },
  },
  triggers: {
    alienTalking: 113,
    guardianTalking: 356,
  },
  teleports: {
    exitCave: [301, 51],
    enterCave: [34, 341],
  },
};
