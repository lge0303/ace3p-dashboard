export interface Tem3pBoundary {
  id: string;
  conditionType: string;
  neumannValue: string;
  robinConstantFactor: string;
  robinConstantValue: string;
  mixedType: string;
  mixedValue: string;
}

export interface Tem3pConfig {
  runId: number;
  meshFile: string;
  basisOrder: number;
  curvedSurfaces: boolean;
  thermalConductivityId: string;
  thermalConductivityValue: string;
  thermalBoundaries: Tem3pBoundary[];
  rfHeatingBoundaryId: string;
  rfHeatingMode: number;
  rfHeatingSigma: string;
  rfHeatingDir: string;
  targetGradient: string;
  dutyFactor: string;
  gradientStart: string;
  gradientEnd: string;
  elasticMu: string;
  elasticLambda: string;
  elasticAlpha: string;
  elasticMaterialId: string;
  elasticBoundaries: Tem3pBoundary[];
  lfDetuningBoundaryId: string;
  lfDetuningOmega3pId: string;
  writeDeformedMesh: boolean;
}

export const defaultTem3pConfig: Tem3pConfig = {
  runId: 3,
  meshFile: "model.ncdf",
  basisOrder: 2,
  curvedSurfaces: true,
  thermalConductivityId: "1",
  thermalConductivityValue: "391",
  thermalBoundaries: [
    { id: "1", conditionType: "Neumann", neumannValue: "0.0", robinConstantFactor: "", robinConstantValue: "", mixedType: "", mixedValue: "" },
    { id: "5", conditionType: "Robin", neumannValue: "", robinConstantFactor: "20000.0", robinConstantValue: "440000.0", mixedType: "", mixedValue: "" },
  ],
  rfHeatingBoundaryId: "6",
  rfHeatingMode: 0,
  rfHeatingSigma: "5.8e7",
  rfHeatingDir: "omega3p_results",
  targetGradient: "60e6",
  dutyFactor: "0.00036",
  gradientStart: "0.0001, 0.0001, -0.017",
  gradientEnd: "0.0001, 0.0001, 0.017",
  elasticMu: "4.3363e10",
  elasticLambda: "8.1244e10",
  elasticAlpha: "1.7e-5",
  elasticMaterialId: "1",
  elasticBoundaries: [
    { id: "1", conditionType: "Mixed", neumannValue: "", robinConstantFactor: "", robinConstantValue: "", mixedType: "NEUMANN NEUMANN DIRICHLET", mixedValue: "0., 0., 0." },
    { id: "2", conditionType: "Mixed", neumannValue: "", robinConstantFactor: "", robinConstantValue: "", mixedType: "DIRICHLET NEUMANN NEUMANN", mixedValue: "0., 0., 0." },
  ],
  lfDetuningBoundaryId: "6",
  lfDetuningOmega3pId: "6",
  writeDeformedMesh: true,
};

export function generateTem3p(config: Tem3pConfig): string {
  let output = "// =================================\n";
  output += "ThermoElasticProblem: {\n";
  output += `  RunId: ${config.runId}\n`;
  output += "}\n";
  output += "// =================================\n\n";

  output += "// =================================\n";
  output += "ThermostaticProblem: {\n";
  output += `  MeshFile: ${config.meshFile}\n`;
  output += `  BasisOrder: ${config.basisOrder}\n`;
  output += `  CurvedSurfaces: ${config.curvedSurfaces ? "on" : "off"}\n\n`;

  output += "  LinearSolver: {\n";
  output += "    Solver:            CG\n";
  output += "    Preconditioner:    DIAGONAL\n";
  output += "    AbsoluteTolerance: 1.0e-18\n";
  output += "    Tolerance:         1.0e-10\n";
  output += "    MaxIterations:     5000\n";
  output += "  }\n\n";

  output += "  ThermalConductivity: {\n";
  output += `    Id: ${config.thermalConductivityId}\n`;
  output += `    Value: ${config.thermalConductivityValue}\n`;
  output += "  }\n\n";

  for (const b of config.thermalBoundaries) {
    output += "  Boundary: {\n";
    output += `    Id: ${b.id}\n`;
    output += `    ConditionType: ${b.conditionType}\n`;
    if (b.conditionType === "Neumann") {
      output += `    NeumannValue: ${b.neumannValue}\n`;
    } else if (b.conditionType === "Robin") {
      output += `    RobinConstantFactor: ${b.robinConstantFactor}\n`;
      output += `    RobinConstantValue: ${b.robinConstantValue}\n`;
    }
    output += "  }\n\n";
  }

  output += "  Boundary: {\n";
  output += `    Id: ${config.rfHeatingBoundaryId}\n`;
  output += "    ConditionType: RFHeating\n";
  output += `    WhichMode: ${config.rfHeatingMode}\n`;
  output += `    Sigma: ${config.rfHeatingSigma}\n`;
  output += `    Directory: ${config.rfHeatingDir}\n`;
  output += "    Method: Gradient\n";
  output += `    TargetGradient: ${config.targetGradient}\n`;
  output += `    DutyFactor: ${config.dutyFactor}\n`;
  output += `    StartPoint: ${config.gradientStart}\n`;
  output += `    EndPoint:   ${config.gradientEnd}\n`;
  output += "  }\n";
  output += "}\n";
  output += "// =================================\n\n";

  output += "// =================================\n";
  output += "ElasticProblem: {\n";
  output += `  MeshFile: ${config.meshFile}\n`;
  output += `  BasisOrder: ${config.basisOrder}\n`;
  output += `  CurvedSurfaces: ${config.curvedSurfaces ? "on" : "off"}\n`;
  output += "  ReferenceT: 25\n\n";

  if (config.writeDeformedMesh) {
    output += "  MeshDump: {\n";
    output += "    WriteDeformedMesh: on\n";
    output += "    WriteDeformedEMMesh: on\n";
    output += "    EMMeshInputDir: omega3p_results\n";
    output += "    WriteStressStrain: on\n";
    output += "  }\n\n";
  }

  output += "  LinearSolver: {\n";
  output += "    Solver:            CG\n";
  output += "    Preconditioner:    DIAGONAL\n";
  output += "    AbsoluteTolerance: 1.0e-16\n";
  output += "    Tolerance:         1.0e-10\n";
  output += "    MaxIterations:     50000\n";
  output += "  }\n\n";

  output += "  VolumeMaterial: {\n";
  output += `    Id: ${config.elasticMaterialId}\n`;
  output += `    ElasticMu: ${config.elasticMu}\n`;
  output += `    ElasticLambda: ${config.elasticLambda}\n`;
  output += `    ElasticAlpha: ${config.elasticAlpha}\n`;
  output += "  }\n\n";

  for (const b of config.elasticBoundaries) {
    output += "  Boundary: {\n";
    output += `    Id: ${b.id}\n`;
    output += `    ConditionType: ${b.conditionType}\n`;
    if (b.conditionType === "Neumann") {
      output += `    NeumannValue: ${b.neumannValue}\n`;
    } else if (b.conditionType === "Mixed") {
      output += `    MixedType: ${b.mixedType}\n`;
      output += `    MixedValue: ${b.mixedValue}\n`;
    }
    output += "  }\n\n";
  }

  output += "  Boundary: {\n";
  output += `    Id: ${config.lfDetuningBoundaryId}\n`;
  output += "    ConditionType: LFDetuning\n";
  output += `    WhichMode: ${config.rfHeatingMode}\n`;
  output += `    Directory: ${config.rfHeatingDir}\n`;
  output += `    Omega3PId: ${config.lfDetuningOmega3pId}\n`;
  output += "    Method: Gradient\n";
  output += `    TargetGradient: ${config.targetGradient}\n`;
  output += `    StartPoint: ${config.gradientStart}\n`;
  output += `    EndPoint:   ${config.gradientEnd}\n`;
  output += "  }\n";
  output += "}\n";
  output += "// =================================\n";

  return output;
}
