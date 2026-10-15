export type SpaceCells = {
  buildings: {
    hatchery: number;
    cave: number;
    door: number;
    alien: {
      position: number;
      icon: string;
    };
    guardian: {
      position: number;
      icon: string;
    };
    relic: {
      position: number;
      icon: string;
    };
    rebirth: number;
  };
  paths: {
    route: number[];
    cave: number[];
  };
  legend: {
    colors: {
      cellsIndex: number[];
      cellsColor: string[];
    };
    texts: {
      textsIndex: number[];
      textsContent: string[];
    };
  };
  triggers: {
    alienTalking: number;
    guardianTalking: number;
  };
  teleports: {
    exitCave: number[];
    enterCave: number[];
  };
};
