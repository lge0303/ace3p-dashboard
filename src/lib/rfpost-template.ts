export interface RfFieldConfig {
  resultDir: string;
  modeId: number;
  xSymmetry: string;
  ySymmetry: string;
  gradient: string;
  cavityBeta: string;
  x0: string;
  y0: string;
  gz1: string;
  gz2: string;
  npoint: number;
}

export interface RoverQConfig {
  enabled: boolean;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  z1: string;
  z2: string;
}

export interface FieldOnLineConfig {
  enabled: boolean;
  npoint: number;
  filename: string;
  rfphase: string;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  z1: string;
  z2: string;
}

export interface RfpostConfig {
  rfField: RfFieldConfig;
  roverQ: RoverQConfig;
  fieldOnLine: FieldOnLineConfig;
}

export const defaultRfpostConfig: RfpostConfig = {
  rfField: {
    resultDir: "omega3p_results",
    modeId: 0,
    xSymmetry: "magnetic",
    ySymmetry: "magnetic",
    gradient: "2.0e7",
    cavityBeta: "1.0",
    x0: "0.0",
    y0: "0.0",
    gz1: "-0.035",
    gz2: "0.035",
    npoint: 300,
  },
  roverQ: {
    enabled: true,
    x1: "0.0",
    x2: "0.0",
    y1: "0.001",
    y2: "0.001",
    z1: "-0.15",
    z2: "0.15",
  },
  fieldOnLine: {
    enabled: false,
    npoint: 300,
    filename: "field_on_axis",
    rfphase: "0.0",
    x1: "0.0",
    x2: "0.0",
    y1: "0.0",
    y2: "0.0",
    z1: "-0.15",
    z2: "0.15",
  },
};

export function generateRfpost(config: RfpostConfig): string {
  const { rfField, roverQ, fieldOnLine } = config;

  let output = "RFField\n{\n";
  output += `   ResultDir   = ${rfField.resultDir}\n`;
  output += `   FreqScanID  =      0\n`;
  output += `   ModeID      =      ${rfField.modeId}\n`;
  output += `   xsymmetry   =      ${rfField.xSymmetry}\n`;
  output += `   ysymmetry   =      ${rfField.ySymmetry}\n`;
  output += `   gradient    =  ${rfField.gradient}\n`;
  output += `   cavityBeta  =      ${rfField.cavityBeta}\n`;
  output += `   reversePowerFlow=      0\n`;
  output += `   x0          =      ${rfField.x0}\n`;
  output += `   y0          =      ${rfField.y0}\n`;
  output += `   gz1         =     ${rfField.gz1}\n`;
  output += `   gz2         =      ${rfField.gz2}\n`;
  output += `   npoint      =    ${rfField.npoint}\n`;
  output += "}\n";

  output += "\nRoverQ\n{\n";
  output += `   ionoff      =      ${roverQ.enabled ? 1 : 0}\n`;
  output += `   modeID1     =     -1\n`;
  output += `   modeID2     =     -1\n`;
  output += `   x1          =      ${roverQ.x1}\n`;
  output += `   x2          =      ${roverQ.x2}\n`;
  output += `   y1          =      ${roverQ.y1}\n`;
  output += `   y2          =      ${roverQ.y2}\n`;
  output += `   z1          =      ${roverQ.z1}\n`;
  output += `   z2          =      ${roverQ.z2}\n`;
  output += "}\n";

  output += "\nFieldOnLine\n{\n";
  output += `   ionoff      =      ${fieldOnLine.enabled ? 1 : 0}\n`;
  output += `   npoint      =    ${fieldOnLine.npoint}\n`;
  output += `   filename    = ${fieldOnLine.filename}\n`;
  output += `   rfphase     =      ${fieldOnLine.rfphase}\n`;
  output += `   x1          =      ${fieldOnLine.x1}\n`;
  output += `   x2          =      ${fieldOnLine.x2}\n`;
  output += `   y1          =      ${fieldOnLine.y1}\n`;
  output += `   y2          =      ${fieldOnLine.y2}\n`;
  output += `   z1          =      ${fieldOnLine.z1}\n`;
  output += `   z2          =      ${fieldOnLine.z2}\n`;
  output += "}\n";

  return output;
}
