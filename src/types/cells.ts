export type Cells = {
  buildings: {
    shop: number;
    hatchery: number;
    album: number;
    zoo: number;
    lab: number;
    spaceCenter: number;
  };
  paths: {
    route: number[];
  };
  gold: {
    possibleSpawns: number[];
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
};
