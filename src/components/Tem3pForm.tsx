"use client";

import { useState } from "react";
import {
  Tem3pConfig,
  Tem3pBoundary,
  defaultTem3pConfig,
  generateTem3p,
} from "@/lib/tem3p-template";
import CodeBlock from "@/components/CodeBlock";
import DownloadButton from "@/components/DownloadButton";

const thermalConditionTypes = ["Neumann", "Robin", "Dirichlet"];
const elasticConditionTypes = ["Neumann", "Mixed", "Dirichlet"];

export default function Tem3pForm() {
  const [config, setConfig] = useState<Tem3pConfig>(defaultTem3pConfig);

  const generated = generateTem3p(config);

  function updateField<K extends keyof Tem3pConfig>(
    key: K,
    value: Tem3pConfig[K]
  ) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  // Thermal boundaries
  function updateThermalBoundary(
    index: number,
    field: keyof Tem3pBoundary,
    value: string
  ) {
    const updated = [...config.thermalBoundaries];
    updated[index] = { ...updated[index], [field]: value };
    updateField("thermalBoundaries", updated);
  }

  function addThermalBoundary() {
    updateField("thermalBoundaries", [
      ...config.thermalBoundaries,
      {
        id: "",
        conditionType: "Neumann",
        neumannValue: "0.0",
        robinConstantFactor: "",
        robinConstantValue: "",
        mixedType: "",
        mixedValue: "",
      },
    ]);
  }

  function removeThermalBoundary(index: number) {
    updateField(
      "thermalBoundaries",
      config.thermalBoundaries.filter((_, i) => i !== index)
    );
  }

  // Elastic boundaries
  function updateElasticBoundary(
    index: number,
    field: keyof Tem3pBoundary,
    value: string
  ) {
    const updated = [...config.elasticBoundaries];
    updated[index] = { ...updated[index], [field]: value };
    updateField("elasticBoundaries", updated);
  }

  function addElasticBoundary() {
    updateField("elasticBoundaries", [
      ...config.elasticBoundaries,
      {
        id: "",
        conditionType: "Mixed",
        neumannValue: "",
        robinConstantFactor: "",
        robinConstantValue: "",
        mixedType: "NEUMANN NEUMANN DIRICHLET",
        mixedValue: "0., 0., 0.",
      },
    ]);
  }

  function removeElasticBoundary(index: number) {
    updateField(
      "elasticBoundaries",
      config.elasticBoundaries.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left column: form */}
      <div className="space-y-6">

        {/* General */}
        <section>
          <h3 className="text-sm font-semibold mb-3">General</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Run ID
              </label>
              <select
                value={config.runId}
                onChange={(e) => updateField("runId", Number(e.target.value))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={1}>1 — Thermal only</option>
                <option value={2}>2 — Elastic only</option>
                <option value={3}>3 — Coupled (thermal + elastic)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Mesh File
              </label>
              <input
                type="text"
                value={config.meshFile}
                onChange={(e) => updateField("meshFile", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                placeholder="model.ncdf"
              />
            </div>
            <div className="flex gap-4 items-end">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Basis Order
                </label>
                <select
                  value={config.basisOrder}
                  onChange={(e) =>
                    updateField("basisOrder", Number(e.target.value))
                  }
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 pb-1">
                <label className="text-xs text-gray-500">
                  <input
                    type="checkbox"
                    checked={config.curvedSurfaces}
                    onChange={(e) =>
                      updateField("curvedSurfaces", e.target.checked)
                    }
                    className="mr-1"
                  />
                  Curved Surfaces
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Thermal Properties */}
        <section>
          <h3 className="text-sm font-semibold mb-3">Thermal Properties</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Material ID
              </label>
              <input
                type="text"
                value={config.thermalConductivityId}
                onChange={(e) =>
                  updateField("thermalConductivityId", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Thermal Conductivity (W/m·K)
              </label>
              <input
                type="text"
                value={config.thermalConductivityValue}
                onChange={(e) =>
                  updateField("thermalConductivityValue", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="391"
              />
            </div>
          </div>
        </section>

        {/* Thermal Boundaries */}
        <section>
          <h3 className="text-sm font-semibold mb-3">Thermal Boundaries</h3>
          {config.thermalBoundaries.map((b, i) => (
            <div
              key={i}
              className="mb-3 p-3 border border-gray-200 rounded-md bg-gray-50 space-y-2"
            >
              <div className="flex gap-2 items-center">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    value={b.id}
                    onChange={(e) =>
                      updateThermalBoundary(i, "id", e.target.value)
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Condition Type
                  </label>
                  <select
                    value={b.conditionType}
                    onChange={(e) =>
                      updateThermalBoundary(i, "conditionType", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    {thermalConditionTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeThermalBoundary(i)}
                  className="mt-4 px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
                >
                  x
                </button>
              </div>
              {b.conditionType === "Neumann" && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Neumann Value
                  </label>
                  <input
                    type="text"
                    value={b.neumannValue}
                    onChange={(e) =>
                      updateThermalBoundary(i, "neumannValue", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="0.0"
                  />
                </div>
              )}
              {b.conditionType === "Robin" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Robin Constant Factor
                    </label>
                    <input
                      type="text"
                      value={b.robinConstantFactor}
                      onChange={(e) =>
                        updateThermalBoundary(
                          i,
                          "robinConstantFactor",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                      placeholder="20000.0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Robin Constant Value
                    </label>
                    <input
                      type="text"
                      value={b.robinConstantValue}
                      onChange={(e) =>
                        updateThermalBoundary(
                          i,
                          "robinConstantValue",
                          e.target.value
                        )
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                      placeholder="440000.0"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addThermalBoundary}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add thermal boundary
          </button>
        </section>

        {/* RF Heating */}
        <section>
          <h3 className="text-sm font-semibold mb-3">RF Heating</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Boundary ID
                </label>
                <input
                  type="text"
                  value={config.rfHeatingBoundaryId}
                  onChange={(e) =>
                    updateField("rfHeatingBoundaryId", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="6"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Which Mode
                </label>
                <input
                  type="number"
                  min="0"
                  value={config.rfHeatingMode}
                  onChange={(e) =>
                    updateField("rfHeatingMode", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Sigma (S/m)
                </label>
                <input
                  type="text"
                  value={config.rfHeatingSigma}
                  onChange={(e) =>
                    updateField("rfHeatingSigma", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="5.8e7"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Omega3P Results Directory
                </label>
                <input
                  type="text"
                  value={config.rfHeatingDir}
                  onChange={(e) =>
                    updateField("rfHeatingDir", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="omega3p_results"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Target Gradient (V/m)
                </label>
                <input
                  type="text"
                  value={config.targetGradient}
                  onChange={(e) =>
                    updateField("targetGradient", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="60e6"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Duty Factor
                </label>
                <input
                  type="text"
                  value={config.dutyFactor}
                  onChange={(e) => updateField("dutyFactor", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="0.00036"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Gradient Start (x, y, z)
              </label>
              <input
                type="text"
                value={config.gradientStart}
                onChange={(e) => updateField("gradientStart", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.0001, 0.0001, -0.017"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Gradient End (x, y, z)
              </label>
              <input
                type="text"
                value={config.gradientEnd}
                onChange={(e) => updateField("gradientEnd", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.0001, 0.0001, 0.017"
              />
            </div>
          </div>
        </section>

        {/* Elastic Material */}
        <section>
          <h3 className="text-sm font-semibold mb-3">Elastic Material</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Material ID
              </label>
              <input
                type="text"
                value={config.elasticMaterialId}
                onChange={(e) =>
                  updateField("elasticMaterialId", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Elastic Mu (Pa)
              </label>
              <input
                type="text"
                value={config.elasticMu}
                onChange={(e) => updateField("elasticMu", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="4.3363e10"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Elastic Lambda (Pa)
              </label>
              <input
                type="text"
                value={config.elasticLambda}
                onChange={(e) => updateField("elasticLambda", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="8.1244e10"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Elastic Alpha (1/K)
              </label>
              <input
                type="text"
                value={config.elasticAlpha}
                onChange={(e) => updateField("elasticAlpha", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="1.7e-5"
              />
            </div>
          </div>
        </section>

        {/* Elastic Boundaries */}
        <section>
          <h3 className="text-sm font-semibold mb-3">Elastic Boundaries</h3>
          {config.elasticBoundaries.map((b, i) => (
            <div
              key={i}
              className="mb-3 p-3 border border-gray-200 rounded-md bg-gray-50 space-y-2"
            >
              <div className="flex gap-2 items-center">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    value={b.id}
                    onChange={(e) =>
                      updateElasticBoundary(i, "id", e.target.value)
                    }
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Condition Type
                  </label>
                  <select
                    value={b.conditionType}
                    onChange={(e) =>
                      updateElasticBoundary(i, "conditionType", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    {elasticConditionTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeElasticBoundary(i)}
                  className="mt-4 px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
                >
                  x
                </button>
              </div>
              {b.conditionType === "Neumann" && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Neumann Value
                  </label>
                  <input
                    type="text"
                    value={b.neumannValue}
                    onChange={(e) =>
                      updateElasticBoundary(i, "neumannValue", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="0.0"
                  />
                </div>
              )}
              {b.conditionType === "Mixed" && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Mixed Type (x y z constraints)
                    </label>
                    <input
                      type="text"
                      value={b.mixedType}
                      onChange={(e) =>
                        updateElasticBoundary(i, "mixedType", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                      placeholder="NEUMANN NEUMANN DIRICHLET"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Mixed Value
                    </label>
                    <input
                      type="text"
                      value={b.mixedValue}
                      onChange={(e) =>
                        updateElasticBoundary(i, "mixedValue", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                      placeholder="0., 0., 0."
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addElasticBoundary}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add elastic boundary
          </button>
        </section>

        {/* LF Detuning */}
        <section>
          <h3 className="text-sm font-semibold mb-3">LF Detuning</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Boundary ID
              </label>
              <input
                type="text"
                value={config.lfDetuningBoundaryId}
                onChange={(e) =>
                  updateField("lfDetuningBoundaryId", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="6"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Omega3P ID
              </label>
              <input
                type="text"
                value={config.lfDetuningOmega3pId}
                onChange={(e) =>
                  updateField("lfDetuningOmega3pId", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="6"
              />
            </div>
          </div>
        </section>

        {/* Output */}
        <section>
          <h3 className="text-sm font-semibold mb-3">Output</h3>
          <label className="text-sm text-gray-700">
            <input
              type="checkbox"
              checked={config.writeDeformedMesh}
              onChange={(e) =>
                updateField("writeDeformedMesh", e.target.checked)
              }
              className="mr-2"
            />
            Write deformed mesh (MeshDump)
          </label>
        </section>
      </div>

      {/* Right column: live preview */}
      <div className="space-y-4">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold mb-2">Generated File Preview</h3>
          <CodeBlock code={generated} filename="simulation.tem3p" />
          <div className="mt-4">
            <DownloadButton content={generated} filename="simulation.tem3p" />
          </div>
        </div>
      </div>
    </div>
  );
}
