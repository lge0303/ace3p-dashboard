export interface Track3pEmitter {
  boundaryId: string;
  x0: string;
  x1: string;
  y0: string;
  y1: string;
  z0: string;
  z1: string;
}

export interface Track3pMaterial {
  type: string;
  boundarySurfaceId: string;
}

export interface Track3pConfig {
  totalTime: number;
  fieldScaleType: string;
  scanToken: boolean;
  scaleValue: string;
  scanMin: string;
  scanMax: string;
  scanInterval: string;
  normalizedFieldStart: string;
  normalizedFieldEnd: string;
  fieldDir: string;
  emitter: Track3pEmitter;
  materials: Track3pMaterial[];
  seyFileName: string;
  outputImpacts: boolean;
  resonantParticles: boolean;
  enhancementCounter: boolean;
}

export const defaultTrack3pConfig: Track3pConfig = {
  totalTime: 50,
  fieldScaleType: "FieldGradient",
  scanToken: false,
  scaleValue: "23.0e6",
  scanMin: "23.0e6",
  scanMax: "25.0e6",
  scanInterval: "1.0e6",
  normalizedFieldStart: "0.0 0.0 -0.057",
  normalizedFieldEnd: "0.0 0.0 0.057",
  fieldDir: "./omega3p_results",
  emitter: {
    boundaryId: "6",
    x0: "0.03",
    x1: "0.035",
    y0: "0.04",
    y1: "0.1",
    z0: "-0.045",
    z1: "0.0",
  },
  materials: [
    { type: "Primary", boundarySurfaceId: "6" },
    { type: "Secondary", boundarySurfaceId: "6" },
    { type: "Absorber", boundarySurfaceId: "1 2" },
  ],
  seyFileName: "copper.dat",
  outputImpacts: true,
  resonantParticles: true,
  enhancementCounter: true,
};

export function generateTrack3p(config: Track3pConfig): string {
  let output = "";

  output += `TotalTime: ${config.totalTime}\n\n`;

  output += "FieldScales:{\n";
  output += `  Type: ${config.fieldScaleType}\n`;
  output += `  ScanToken: ${config.scanToken ? 1 : 0}\n`;
  if (config.scanToken) {
    output += `  Minimum: ${config.scanMin}\n`;
    output += `  Maximum: ${config.scanMax}\n`;
    output += `  Interval: ${config.scanInterval}\n`;
  } else {
    output += `  Scale: ${config.scaleValue}\n`;
    output += "  EmissionOutput: 1\n";
  }
  output += "}\n\n";

  output += "NormalizedField:{\n";
  output += `  StartPoint: ${config.normalizedFieldStart}\n`;
  output += `  EndPoint: ${config.normalizedFieldEnd}\n`;
  output += "}\n\n";

  output += "Domain:{\n";
  output += `  FieldDir: ${config.fieldDir}\n`;
  output += "}\n\n";

  output += "Emitter:{\n";
  output += `  BoundaryID: ${config.emitter.boundaryId}\n`;
  output += `  x0: ${config.emitter.x0}\n`;
  output += `  x1: ${config.emitter.x1}\n`;
  output += `  y0: ${config.emitter.y0}\n`;
  output += `  y1: ${config.emitter.y1}\n`;
  output += `  z0: ${config.emitter.z0}\n`;
  output += `  z1: ${config.emitter.z1}\n`;
  output += "}\n\n";

  if (config.outputImpacts) {
    output += "OutputImpacts: on\n\n";
  }

  for (const mat of config.materials) {
    output += "Material:{\n";
    output += `  Type: ${mat.type}\n`;
    output += `  BoundarySurfaceID: ${mat.boundarySurfaceId}\n`;
    output += "}\n\n";
  }

  output += "Postprocess:{\n";
  output += "  Toggle: on\n";
  if (config.resonantParticles) {
    output += "  ResonantParticles:{\n";
    output += "    Token: on\n";
    output += "  }\n";
  }
  if (config.enhancementCounter) {
    output += "  EnhancementCounter:{\n";
    output += "    Token: on\n";
    output += "    MinimumEC: 0.01\n";
    output += `    SEYFileName1: ${config.seyFileName}\n`;
    output += `    BoundarySurfaceID1: ${config.emitter.boundaryId}\n`;
    output += "  }\n";
  }
  output += "}\n";

  return output;
}
