export interface S3pPortConfig {
  referenceNumber: string;
  numberOfModes: string;
}

export interface S3pMaterial {
  attribute: string;
  epsilon: string;
  mu: string;
  epsilonImag: string;
}

export interface S3pConfig {
  meshFile: string;
  boundaryConditions: { type: string; surfaceIds: string }[];
  surfaceMaterials: { referenceNumber: string; sigma: string }[];
  materials: S3pMaterial[];
  feOrder: number;
  curvedSurfaces: boolean;
  freqStart: string;
  freqEnd: string;
  freqInterval: string;
  ports: S3pPortConfig[];
  postProcess: boolean;
  postProcessPort: string;
}

export const defaultS3pConfig: S3pConfig = {
  meshFile: "./model.ncdf",
  boundaryConditions: [
    { type: "Exterior", surfaceIds: "6" },
    { type: "Waveguide", surfaceIds: "7, 8" },
  ],
  surfaceMaterials: [{ referenceNumber: "6", sigma: "5.8e7" }],
  materials: [],
  feOrder: 2,
  curvedSurfaces: true,
  freqStart: "9.0e9",
  freqEnd: "12.0e9",
  freqInterval: "0.25e9",
  ports: [
    { referenceNumber: "7", numberOfModes: "2" },
    { referenceNumber: "8", numberOfModes: "2" },
  ],
  postProcess: true,
  postProcessPort: "7",
};

export function generateS3p(config: S3pConfig): string {
  let output = "ModelInfo: {\n";
  output += `  File: ${config.meshFile}\n\n`;

  output += "  BoundaryCondition: {\n";
  for (const bc of config.boundaryConditions) {
    output += `    ${bc.type}: ${bc.surfaceIds}\n`;
  }
  output += "  }\n";

  for (const sm of config.surfaceMaterials) {
    output += "\n  SurfaceMaterial: {\n";
    output += `    ReferenceNumber: ${sm.referenceNumber}\n`;
    output += `    Sigma: ${sm.sigma}\n`;
    output += "  }\n";
  }

  for (const mat of config.materials) {
    output += "\n  Material : {\n";
    output += `    Attribute: ${mat.attribute}\n`;
    output += `    Epsilon: ${mat.epsilon}\n`;
    output += `    Mu: ${mat.mu}\n`;
    if (mat.epsilonImag && mat.epsilonImag !== "0") {
      output += `    EpsilonImag: ${mat.epsilonImag}\n`;
    }
    output += "  }\n";
  }

  output += "}\n\n";

  output += "FiniteElement: {\n";
  output += `  Order: ${config.feOrder}\n`;
  output += `  CurvedSurfaces: ${config.curvedSurfaces ? "on" : "off"}\n`;
  output += "}\n\n";

  output += "FrequencyScan: {\n";
  output += `  Start: ${config.freqStart}\n`;
  output += `  End:   ${config.freqEnd}\n`;
  output += `  Interval: ${config.freqInterval}\n`;
  output += "}\n";

  if (config.postProcess) {
    output += "\nPostProcess: {\n";
    output += "  Toggle: on\n";
    output += `  PortNumber: ${config.postProcessPort}\n`;
    output += "}\n";
  }

  for (const port of config.ports) {
    output += `\nPort: {\n`;
    output += `  ReferenceNumber: ${port.referenceNumber}\n`;
    output += `  NumberOfModes: ${port.numberOfModes}\n`;
    output += "}\n";
  }

  return output;
}
