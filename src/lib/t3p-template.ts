export interface T3pBunch {
  type: string;
  sigma: string;
  numSigmas: number;
  charge: string;
}

export interface T3pMonitor {
  type: string;
  name: string;
  timeStart: string;
  timeEnd: string;
  timeStep: string;
  startContour: string;
  endContour: string;
  smax: string;
}

export interface T3pConfig {
  meshFile: string;
  boundaryConditions: { type: string; surfaceIds: string }[];
  feOrder: number;
  curvedSurfaces: boolean;
  bunch: T3pBunch;
  symmetryFactor: number;
  startPoint: string;
  direction: string;
  boundaryId: string;
  maximumTime: string;
  dt: string;
  monitors: T3pMonitor[];
  solver: string;
}

export const defaultT3pConfig: T3pConfig = {
  meshFile: "./model.ncdf",
  boundaryConditions: [
    { type: "Exterior", surfaceIds: "6 5" },
    { type: "Absorbing", surfaceIds: "3 4" },
    { type: "Magnetic", surfaceIds: "1 2" },
  ],
  feOrder: 2,
  curvedSurfaces: true,
  bunch: {
    type: "Gaussian",
    sigma: "0.01",
    numSigmas: 5,
    charge: "1.e-12",
  },
  symmetryFactor: 4,
  startPoint: "0.0, 0.0, -0.075",
  direction: "0.0, 0.0, 1.0",
  boundaryId: "3",
  maximumTime: "5e-9",
  dt: "2e-12",
  monitors: [
    {
      type: "Volume",
      name: "mymon",
      timeStart: "0e-9",
      timeEnd: "5e-9",
      timeStep: "0.2e-9",
      startContour: "",
      endContour: "",
      smax: "",
    },
    {
      type: "WakeField",
      name: "wakefield",
      timeStart: "",
      timeEnd: "",
      timeStep: "",
      startContour: "-0.075",
      endContour: "0.075",
      smax: "1.4",
    },
  ],
  solver: "MUMPS",
};

export function generateT3p(config: T3pConfig): string {
  let output = "ModelInfo:\n{\n";
  output += `  File: ${config.meshFile}\n`;
  output += "  BoundaryCondition:\n  {\n";
  for (const bc of config.boundaryConditions) {
    output += `    ${bc.type}: ${bc.surfaceIds}\n`;
  }
  output += "  }\n";
  output += "}\n\n";

  output += "FiniteElement:\n{\n";
  output += `  Order: ${config.feOrder}\n`;
  output += `  CurvedSurfaces: ${config.curvedSurfaces ? "on" : "off"}\n`;
  output += "}\n\n";

  output += "LoadingInfo:\n{\n";
  output += "  Bunch:\n  {\n";
  output += `    Type: ${config.bunch.type}\n`;
  output += `    Sigma: ${config.bunch.sigma}\n`;
  output += `    Number of sigmas: ${config.bunch.numSigmas}\n`;
  output += `    Charge: ${config.bunch.charge}\n`;
  output += "  }\n";
  output += `  SymmetryFactor: ${config.symmetryFactor}\n`;
  output += `  StartPoint: ${config.startPoint}\n`;
  output += `  Direction: ${config.direction}\n`;
  output += `  BoundaryID: ${config.boundaryId}\n`;
  output += "}\n\n";

  output += "TimeStepping:\n{\n";
  output += `  MaximumTime: ${config.maximumTime}\n`;
  output += `  DT: ${config.dt}\n`;
  output += "}\n\n";

  for (const mon of config.monitors) {
    output += "Monitor:\n{\n";
    output += `  Type: ${mon.type}\n`;
    output += `  Name: ${mon.name}\n`;
    if (mon.type === "Volume") {
      output += `  TimeStart: ${mon.timeStart}\n`;
      output += `  TimeEnd:   ${mon.timeEnd}\n`;
      output += `  TimeStep:  ${mon.timeStep}\n`;
    } else if (mon.type === "WakeField") {
      output += `  StartContour: ${mon.startContour}\n`;
      output += `  EndContour:  ${mon.endContour}\n`;
      output += `  Smax: ${mon.smax}\n`;
    }
    output += "}\n\n";
  }

  output += "LinearSolver:\n{\n";
  output += `  Solver: ${config.solver}\n`;
  output += "}\n";

  return output;
}
