export interface BoundaryCondition {
  type: string;
  surfaceIds: string;
}

export interface SurfaceMaterial {
  referenceNumber: string;
  sigma: string;
}

export interface PortConfig {
  referenceNumber: string;
  numberOfModes: string;
}

export interface Omega3pConfig {
  meshFile: string;
  boundaryConditions: BoundaryCondition[];
  surfaceMaterials: SurfaceMaterial[];
  feOrder: number;
  curvedSurfaces: boolean;
  numEigenvalues: number;
  frequencyShift: string;
  tolerance: string;
  maxIterations: number;
  ports: PortConfig[];
  postProcess: boolean;
  modeFilePrefix: string;
}

export const defaultOmega3pConfig: Omega3pConfig = {
  meshFile: "./pillbox4.ncdf",
  boundaryConditions: [
    { type: "Magnetic", surfaceIds: "1, 2" },
    { type: "Exterior", surfaceIds: "6" },
  ],
  surfaceMaterials: [{ referenceNumber: "6", sigma: "5.8e7" }],
  feOrder: 2,
  curvedSurfaces: true,
  numEigenvalues: 2,
  frequencyShift: "1.0e9",
  tolerance: "1e-7",
  maxIterations: 200,
  ports: [],
  postProcess: true,
  modeFilePrefix: "mode",
};

export function generateOmega3p(config: Omega3pConfig): string {
  let output = "ModelInfo : {\n";
  output += `  File: ${config.meshFile}\n\n`;

  output += "  BoundaryCondition : {\n";
  for (const bc of config.boundaryConditions) {
    output += `    ${bc.type}: ${bc.surfaceIds}\n`;
  }
  output += "  }\n";

  if (config.surfaceMaterials.length > 0) {
    for (const sm of config.surfaceMaterials) {
      output += "\n  SurfaceMaterial : {\n";
      output += `    ReferenceNumber: ${sm.referenceNumber}\n`;
      output += `    Sigma: ${sm.sigma}\n`;
      output += "  }\n";
    }
  }

  output += "}\n\n";

  output += "FiniteElement: {\n";
  output += `  Order:           ${config.feOrder}\n`;
  output += `  CurvedSurfaces: ${config.curvedSurfaces ? "on" : "off"}\n`;
  output += "}\n\n";

  output += "EigenSolver : {\n";
  output += `  NumEigenvalues: ${config.numEigenvalues}\n`;
  output += `  FrequencyShift:  ${config.frequencyShift}\n`;
  if (config.tolerance !== "1e-7") {
    output += `  Tolerance: ${config.tolerance}\n`;
  }
  if (config.maxIterations !== 200) {
    output += `  MaxIterations: ${config.maxIterations}\n`;
  }
  output += "}\n";

  for (const port of config.ports) {
    output += `\nPort : {\n`;
    output += `  ReferenceNumber : ${port.referenceNumber}\n`;
    output += `  NumberOfModes : ${port.numberOfModes}\n`;
    output += "}\n";
  }

  if (config.postProcess) {
    output += "\nPostProcess : {\n";
    output += "  Toggle: on\n";
    output += `  ModeFile: ${config.modeFilePrefix}\n`;
    output += "}\n";
  }

  return output;
}
