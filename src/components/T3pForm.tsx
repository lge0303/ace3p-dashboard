"use client";

import { useState } from "react";
import {
  T3pConfig,
  T3pMonitor,
  defaultT3pConfig,
  generateT3p,
} from "@/lib/t3p-template";
import CodeBlock from "@/components/CodeBlock";
import DownloadButton from "@/components/DownloadButton";

const bcTypes = [
  "Electric",
  "Magnetic",
  "Exterior",
  "Absorbing",
  "Impedance",
  "Waveguide",
];

const monitorTypes = ["Volume", "WakeField"];

export default function T3pForm() {
  const [config, setConfig] = useState<T3pConfig>(defaultT3pConfig);

  const generated = generateT3p(config);

  function updateField<K extends keyof T3pConfig>(
    key: K,
    value: T3pConfig[K]
  ) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  // Boundary conditions helpers
  function updateBC(index: number, field: "type" | "surfaceIds", value: string) {
    const updated = [...config.boundaryConditions];
    updated[index] = { ...updated[index], [field]: value };
    updateField("boundaryConditions", updated);
  }

  function addBC() {
    updateField("boundaryConditions", [
      ...config.boundaryConditions,
      { type: "Electric", surfaceIds: "" },
    ]);
  }

  function removeBC(index: number) {
    updateField(
      "boundaryConditions",
      config.boundaryConditions.filter((_, i) => i !== index)
    );
  }

  // Bunch helpers
  function updateBunch(field: keyof T3pConfig["bunch"], value: string | number) {
    setConfig((prev) => ({
      ...prev,
      bunch: { ...prev.bunch, [field]: value },
    }));
  }

  // Monitor helpers
  function updateMonitor(index: number, field: keyof T3pMonitor, value: string) {
    const updated = [...config.monitors];
    updated[index] = { ...updated[index], [field]: value };
    updateField("monitors", updated);
  }

  function addMonitor() {
    updateField("monitors", [
      ...config.monitors,
      {
        type: "Volume",
        name: "",
        timeStart: "0e-9",
        timeEnd: "5e-9",
        timeStep: "0.2e-9",
        startContour: "",
        endContour: "",
        smax: "",
      },
    ]);
  }

  function removeMonitor(index: number) {
    updateField(
      "monitors",
      config.monitors.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Form */}
      <div className="space-y-6">
        {/* ModelInfo */}
        <section>
          <h3 className="text-sm font-semibold mb-2">ModelInfo</h3>
          <div className="mb-3">
            <label className="block text-xs text-gray-500 mb-1">Mesh File</label>
            <input
              type="text"
              value={config.meshFile}
              onChange={(e) => updateField("meshFile", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
              placeholder="./model.ncdf"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Boundary Conditions
            </label>
            {config.boundaryConditions.map((bc, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <select
                  value={bc.type}
                  onChange={(e) => updateBC(i, "type", e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {bcTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={bc.surfaceIds}
                  onChange={(e) => updateBC(i, "surfaceIds", e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="1 2"
                />
                <button
                  onClick={() => removeBC(i)}
                  className="px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
                >
                  x
                </button>
              </div>
            ))}
            <button
              onClick={addBC}
              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              + Add boundary condition
            </button>
          </div>
        </section>

        {/* FiniteElement */}
        <section>
          <h3 className="text-sm font-semibold mb-2">FiniteElement</h3>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Order</label>
              <select
                value={config.feOrder}
                onChange={(e) =>
                  updateField("feOrder", Number(e.target.value))
                }
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
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
        </section>

        {/* LoadingInfo */}
        <section>
          <h3 className="text-sm font-semibold mb-2">LoadingInfo</h3>

          {/* Bunch sub-section */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2 font-medium">Bunch</p>
            <div className="grid grid-cols-2 gap-3 pl-3 border-l-2 border-gray-200">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Type</label>
                <select
                  value={config.bunch.type}
                  onChange={(e) => updateBunch("type", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="Gaussian">Gaussian</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Sigma (m)
                </label>
                <input
                  type="text"
                  value={config.bunch.sigma}
                  onChange={(e) => updateBunch("sigma", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="0.01"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Num Sigmas
                </label>
                <input
                  type="number"
                  min="1"
                  value={config.bunch.numSigmas}
                  onChange={(e) =>
                    updateBunch("numSigmas", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Charge (C)
                </label>
                <input
                  type="text"
                  value={config.bunch.charge}
                  onChange={(e) => updateBunch("charge", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="1.e-12"
                />
              </div>
            </div>
          </div>

          {/* Remaining LoadingInfo fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Symmetry Factor
              </label>
              <input
                type="number"
                min="1"
                value={config.symmetryFactor}
                onChange={(e) =>
                  updateField("symmetryFactor", Number(e.target.value))
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Boundary ID
              </label>
              <input
                type="text"
                value={config.boundaryId}
                onChange={(e) => updateField("boundaryId", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="3"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">
                Start Point (x, y, z)
              </label>
              <input
                type="text"
                value={config.startPoint}
                onChange={(e) => updateField("startPoint", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.0, 0.0, -0.075"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-500 mb-1">
                Direction (x, y, z)
              </label>
              <input
                type="text"
                value={config.direction}
                onChange={(e) => updateField("direction", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.0, 0.0, 1.0"
              />
            </div>
          </div>
        </section>

        {/* TimeStepping */}
        <section>
          <h3 className="text-sm font-semibold mb-2">TimeStepping</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Maximum Time (s)
              </label>
              <input
                type="text"
                value={config.maximumTime}
                onChange={(e) => updateField("maximumTime", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="5e-9"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                DT (s)
              </label>
              <input
                type="text"
                value={config.dt}
                onChange={(e) => updateField("dt", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="2e-12"
              />
            </div>
          </div>
        </section>

        {/* Monitors */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Monitors</h3>
          {config.monitors.map((mon, i) => (
            <div
              key={i}
              className="mb-4 p-3 border border-gray-200 rounded-md bg-gray-50"
            >
              <div className="flex gap-2 mb-2">
                <select
                  value={mon.type}
                  onChange={(e) => updateMonitor(i, "type", e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                >
                  {monitorTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={mon.name}
                  onChange={(e) => updateMonitor(i, "name", e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-mono bg-white"
                  placeholder="Name"
                />
                <button
                  onClick={() => removeMonitor(i)}
                  className="px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
                >
                  x
                </button>
              </div>

              {mon.type === "Volume" && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Time Start
                    </label>
                    <input
                      type="text"
                      value={mon.timeStart}
                      onChange={(e) =>
                        updateMonitor(i, "timeStart", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono bg-white"
                      placeholder="0e-9"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Time End
                    </label>
                    <input
                      type="text"
                      value={mon.timeEnd}
                      onChange={(e) =>
                        updateMonitor(i, "timeEnd", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono bg-white"
                      placeholder="5e-9"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Time Step
                    </label>
                    <input
                      type="text"
                      value={mon.timeStep}
                      onChange={(e) =>
                        updateMonitor(i, "timeStep", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono bg-white"
                      placeholder="0.2e-9"
                    />
                  </div>
                </div>
              )}

              {mon.type === "WakeField" && (
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Start Contour
                    </label>
                    <input
                      type="text"
                      value={mon.startContour}
                      onChange={(e) =>
                        updateMonitor(i, "startContour", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono bg-white"
                      placeholder="-0.075"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      End Contour
                    </label>
                    <input
                      type="text"
                      value={mon.endContour}
                      onChange={(e) =>
                        updateMonitor(i, "endContour", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono bg-white"
                      placeholder="0.075"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Smax (m)
                    </label>
                    <input
                      type="text"
                      value={mon.smax}
                      onChange={(e) =>
                        updateMonitor(i, "smax", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-xs font-mono bg-white"
                      placeholder="1.4"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addMonitor}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add monitor
          </button>
        </section>

        {/* LinearSolver */}
        <section>
          <h3 className="text-sm font-semibold mb-2">LinearSolver</h3>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Solver</label>
            <select
              value={config.solver}
              onChange={(e) => updateField("solver", e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="MUMPS">MUMPS</option>
              <option value="CG">CG</option>
            </select>
          </div>
        </section>
      </div>

      {/* Right: Live Preview */}
      <div className="space-y-4">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold mb-2">Generated File Preview</h3>
          <CodeBlock code={generated} filename="simulation.t3p" />
          <div className="mt-4">
            <DownloadButton content={generated} filename="simulation.t3p" />
          </div>
        </div>
      </div>
    </div>
  );
}
