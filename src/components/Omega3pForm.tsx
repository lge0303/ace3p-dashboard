"use client";

import { useState } from "react";
import {
  Omega3pConfig,
  defaultOmega3pConfig,
  generateOmega3p,
  BoundaryCondition,
  SurfaceMaterial,
  PortConfig,
} from "@/lib/omega3p-template";
import CodeBlock from "./CodeBlock";
import DownloadButton from "./DownloadButton";

const bcTypes = [
  "Electric",
  "Magnetic",
  "Exterior",
  "Waveguide",
  "Impedance",
  "Absorbing",
  "Periodic_M",
  "Periodic_S",
];

export default function Omega3pForm() {
  const [config, setConfig] = useState<Omega3pConfig>(defaultOmega3pConfig);

  const generated = generateOmega3p(config);

  function updateField<K extends keyof Omega3pConfig>(
    key: K,
    value: Omega3pConfig[K]
  ) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function updateBC(index: number, field: keyof BoundaryCondition, value: string) {
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

  function updateSM(index: number, field: keyof SurfaceMaterial, value: string) {
    const updated = [...config.surfaceMaterials];
    updated[index] = { ...updated[index], [field]: value };
    updateField("surfaceMaterials", updated);
  }

  function addSM() {
    updateField("surfaceMaterials", [
      ...config.surfaceMaterials,
      { referenceNumber: "", sigma: "5.8e7" },
    ]);
  }

  function removeSM(index: number) {
    updateField(
      "surfaceMaterials",
      config.surfaceMaterials.filter((_, i) => i !== index)
    );
  }

  function updatePort(index: number, field: keyof PortConfig, value: string) {
    const updated = [...config.ports];
    updated[index] = { ...updated[index], [field]: value };
    updateField("ports", updated);
  }

  function addPort() {
    updateField("ports", [
      ...config.ports,
      { referenceNumber: "", numberOfModes: "1" },
    ]);
  }

  function removePort(index: number) {
    updateField(
      "ports",
      config.ports.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* Mesh File */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Mesh File</h3>
          <input
            type="text"
            value={config.meshFile}
            onChange={(e) => updateField("meshFile", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
            placeholder="./model.ncdf"
          />
        </section>

        {/* Boundary Conditions */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Boundary Conditions</h3>
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
                placeholder="1, 2"
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
        </section>

        {/* Surface Material */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Surface Material</h3>
          {config.surfaceMaterials.map((sm, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={sm.referenceNumber}
                onChange={(e) => updateSM(i, "referenceNumber", e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="ID"
              />
              <input
                type="text"
                value={sm.sigma}
                onChange={(e) => updateSM(i, "sigma", e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="5.8e7"
              />
              <button
                onClick={() => removeSM(i)}
                className="px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={addSM}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add surface material
          </button>
        </section>

        {/* Finite Element */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Finite Element</h3>
          <div className="flex gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Order</label>
              <select
                value={config.feOrder}
                onChange={(e) => updateField("feOrder", Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-2">
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

        {/* EigenSolver */}
        <section>
          <h3 className="text-sm font-semibold mb-2">EigenSolver</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                NumEigenvalues
              </label>
              <input
                type="number"
                min="1"
                value={config.numEigenvalues}
                onChange={(e) =>
                  updateField("numEigenvalues", Number(e.target.value))
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                FrequencyShift (Hz)
              </label>
              <input
                type="text"
                value={config.frequencyShift}
                onChange={(e) => updateField("frequencyShift", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Tolerance
              </label>
              <input
                type="text"
                value={config.tolerance}
                onChange={(e) => updateField("tolerance", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                MaxIterations
              </label>
              <input
                type="number"
                min="1"
                value={config.maxIterations}
                onChange={(e) =>
                  updateField("maxIterations", Number(e.target.value))
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </section>

        {/* Ports */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Ports (optional)</h3>
          {config.ports.map((port, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                value={port.referenceNumber}
                onChange={(e) =>
                  updatePort(i, "referenceNumber", e.target.value)
                }
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Ref #"
              />
              <input
                type="text"
                value={port.numberOfModes}
                onChange={(e) =>
                  updatePort(i, "numberOfModes", e.target.value)
                }
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Modes"
              />
              <button
                onClick={() => removePort(i)}
                className="px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={addPort}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add port
          </button>
        </section>

        {/* PostProcess */}
        <section>
          <h3 className="text-sm font-semibold mb-2">PostProcess</h3>
          <div className="flex gap-4 items-center">
            <label className="text-xs text-gray-500">
              <input
                type="checkbox"
                checked={config.postProcess}
                onChange={(e) => updateField("postProcess", e.target.checked)}
                className="mr-1"
              />
              Enable
            </label>
            {config.postProcess && (
              <input
                type="text"
                value={config.modeFilePrefix}
                onChange={(e) => updateField("modeFilePrefix", e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="mode"
              />
            )}
          </div>
        </section>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold mb-2">Generated File Preview</h3>
          <CodeBlock code={generated} filename="simulation.omega3p" />
          <div className="mt-4">
            <DownloadButton content={generated} filename="simulation.omega3p" />
          </div>
        </div>
      </div>
    </div>
  );
}
