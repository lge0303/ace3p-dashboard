"use client";

import { useState } from "react";
import {
  S3pConfig,
  defaultS3pConfig,
  generateS3p,
  S3pMaterial,
  S3pPortConfig,
} from "@/lib/s3p-template";
import CodeBlock from "@/components/CodeBlock";
import DownloadButton from "@/components/DownloadButton";

const bcTypes = [
  "Electric",
  "Magnetic",
  "Exterior",
  "Waveguide",
  "Impedance",
  "Absorbing",
];

export default function S3pForm() {
  const [config, setConfig] = useState<S3pConfig>(defaultS3pConfig);

  const generated = generateS3p(config);

  function updateField<K extends keyof S3pConfig>(key: K, value: S3pConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  // Boundary conditions
  function updateBC(
    index: number,
    field: keyof S3pConfig["boundaryConditions"][number],
    value: string
  ) {
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

  // Surface materials
  function updateSM(
    index: number,
    field: keyof S3pConfig["surfaceMaterials"][number],
    value: string
  ) {
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

  // Materials
  function updateMaterial(index: number, field: keyof S3pMaterial, value: string) {
    const updated = [...config.materials];
    updated[index] = { ...updated[index], [field]: value };
    updateField("materials", updated);
  }

  function addMaterial() {
    updateField("materials", [
      ...config.materials,
      { attribute: "", epsilon: "1", mu: "1", epsilonImag: "0" },
    ]);
  }

  function removeMaterial(index: number) {
    updateField(
      "materials",
      config.materials.filter((_, i) => i !== index)
    );
  }

  // Ports
  function updatePort(index: number, field: keyof S3pPortConfig, value: string) {
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

        {/* Surface Materials */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Surface Materials</h3>
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

        {/* Materials */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Materials</h3>
          {config.materials.map((mat, i) => (
            <div
              key={i}
              className="mb-3 p-3 border border-gray-200 rounded-md space-y-2"
            >
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Attribute
                  </label>
                  <input
                    type="text"
                    value={mat.attribute}
                    onChange={(e) => updateMaterial(i, "attribute", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Epsilon
                  </label>
                  <input
                    type="text"
                    value={mat.epsilon}
                    onChange={(e) => updateMaterial(i, "epsilon", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Mu</label>
                  <input
                    type="text"
                    value={mat.mu}
                    onChange={(e) => updateMaterial(i, "mu", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    EpsilonImag
                  </label>
                  <input
                    type="text"
                    value={mat.epsilonImag}
                    onChange={(e) =>
                      updateMaterial(i, "epsilonImag", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="0"
                  />
                </div>
                <button
                  onClick={() => removeMaterial(i)}
                  className="px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer self-end pb-1"
                >
                  x
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addMaterial}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add material
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

        {/* FrequencyScan */}
        <section>
          <h3 className="text-sm font-semibold mb-2">FrequencyScan</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Start (Hz)
              </label>
              <input
                type="text"
                value={config.freqStart}
                onChange={(e) => updateField("freqStart", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="9.0e9"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                End (Hz)
              </label>
              <input
                type="text"
                value={config.freqEnd}
                onChange={(e) => updateField("freqEnd", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="12.0e9"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Interval (Hz)
              </label>
              <input
                type="text"
                value={config.freqInterval}
                onChange={(e) => updateField("freqInterval", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.25e9"
              />
            </div>
          </div>
        </section>

        {/* Ports */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Ports</h3>
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
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Port Number
                </label>
                <input
                  type="text"
                  value={config.postProcessPort}
                  onChange={(e) =>
                    updateField("postProcessPort", e.target.value)
                  }
                  className="px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="7"
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold mb-2">Generated File Preview</h3>
          <CodeBlock code={generated} filename="simulation.s3p" />
          <div className="mt-4">
            <DownloadButton content={generated} filename="simulation.s3p" />
          </div>
        </div>
      </div>
    </div>
  );
}
