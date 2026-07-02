"use client";

import { useState } from "react";
import {
  Track3pConfig,
  Track3pMaterial,
  defaultTrack3pConfig,
  generateTrack3p,
} from "@/lib/track3p-template";
import CodeBlock from "@/components/CodeBlock";
import DownloadButton from "@/components/DownloadButton";

const fieldScaleTypes = ["FieldGradient", "InputPortPower", "StorEnergy"];
const materialTypes = ["Primary", "Secondary", "Absorber", "SymmetryPlane"];

export default function Track3pForm() {
  const [config, setConfig] = useState<Track3pConfig>(defaultTrack3pConfig);

  const generated = generateTrack3p(config);

  function updateField<K extends keyof Track3pConfig>(
    key: K,
    value: Track3pConfig[K]
  ) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function updateEmitter(field: keyof Track3pConfig["emitter"], value: string) {
    setConfig((prev) => ({
      ...prev,
      emitter: { ...prev.emitter, [field]: value },
    }));
  }

  function updateMaterial(
    index: number,
    field: keyof Track3pMaterial,
    value: string
  ) {
    const updated = [...config.materials];
    updated[index] = { ...updated[index], [field]: value };
    updateField("materials", updated);
  }

  function addMaterial() {
    updateField("materials", [
      ...config.materials,
      { type: "Primary", boundarySurfaceId: "" },
    ]);
  }

  function removeMaterial(index: number) {
    updateField(
      "materials",
      config.materials.filter((_, i) => i !== index)
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form column */}
      <div className="space-y-6">
        {/* TotalTime */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Total Time</h3>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              TotalTime (RF periods)
            </label>
            <input
              type="number"
              min="1"
              value={config.totalTime}
              onChange={(e) => updateField("totalTime", Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </section>

        {/* FieldScales */}
        <section>
          <h3 className="text-sm font-semibold mb-2">FieldScales</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Type</label>
              <select
                value={config.fieldScaleType}
                onChange={(e) => updateField("fieldScaleType", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {fieldScaleTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.scanToken}
                  onChange={(e) => updateField("scanToken", e.target.checked)}
                  className="rounded"
                />
                ScanToken (scan over a range)
              </label>
            </div>
            {config.scanToken ? (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Minimum
                  </label>
                  <input
                    type="text"
                    value={config.scanMin}
                    onChange={(e) => updateField("scanMin", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="23.0e6"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Maximum
                  </label>
                  <input
                    type="text"
                    value={config.scanMax}
                    onChange={(e) => updateField("scanMax", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="25.0e6"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Interval
                  </label>
                  <input
                    type="text"
                    value={config.scanInterval}
                    onChange={(e) => updateField("scanInterval", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                    placeholder="1.0e6"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Scale value
                </label>
                <input
                  type="text"
                  value={config.scaleValue}
                  onChange={(e) => updateField("scaleValue", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="23.0e6"
                />
              </div>
            )}
          </div>
        </section>

        {/* NormalizedField */}
        <section>
          <h3 className="text-sm font-semibold mb-2">NormalizedField</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                StartPoint
              </label>
              <input
                type="text"
                value={config.normalizedFieldStart}
                onChange={(e) =>
                  updateField("normalizedFieldStart", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.0 0.0 -0.057"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                EndPoint
              </label>
              <input
                type="text"
                value={config.normalizedFieldEnd}
                onChange={(e) =>
                  updateField("normalizedFieldEnd", e.target.value)
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="0.0 0.0 0.057"
              />
            </div>
          </div>
        </section>

        {/* Domain */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Domain</h3>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              FieldDir (path to Omega3P results)
            </label>
            <input
              type="text"
              value={config.fieldDir}
              onChange={(e) => updateField("fieldDir", e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
              placeholder="./omega3p_results"
            />
          </div>
        </section>

        {/* Emitter */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Emitter</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                BoundaryID
              </label>
              <input
                type="text"
                value={config.emitter.boundaryId}
                onChange={(e) => updateEmitter("boundaryId", e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="6"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["x0", "x1", "y0", "y1", "z0", "z1"] as const).map((coord) => (
                <div key={coord}>
                  <label className="block text-xs text-gray-500 mb-1">
                    {coord}
                  </label>
                  <input
                    type="text"
                    value={config.emitter[coord]}
                    onChange={(e) => updateEmitter(coord, e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Materials</h3>
          {config.materials.map((mat, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={mat.type}
                onChange={(e) => updateMaterial(i, "type", e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                {materialTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={mat.boundarySurfaceId}
                onChange={(e) =>
                  updateMaterial(i, "boundarySurfaceId", e.target.value)
                }
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                placeholder="Surface ID(s)"
              />
              <button
                onClick={() => removeMaterial(i)}
                className="px-2 text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={addMaterial}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            + Add material
          </button>
        </section>

        {/* Postprocess */}
        <section>
          <h3 className="text-sm font-semibold mb-2">Postprocess</h3>
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.outputImpacts}
                  onChange={(e) =>
                    updateField("outputImpacts", e.target.checked)
                  }
                  className="rounded"
                />
                OutputImpacts
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.resonantParticles}
                  onChange={(e) =>
                    updateField("resonantParticles", e.target.checked)
                  }
                  className="rounded"
                />
                ResonantParticles
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.enhancementCounter}
                  onChange={(e) =>
                    updateField("enhancementCounter", e.target.checked)
                  }
                  className="rounded"
                />
                EnhancementCounter
              </label>
            </div>
            {config.enhancementCounter && (
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  SEYFileName
                </label>
                <input
                  type="text"
                  value={config.seyFileName}
                  onChange={(e) => updateField("seyFileName", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  placeholder="copper.dat"
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Live Preview column */}
      <div className="space-y-4">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold mb-2">Generated File Preview</h3>
          <CodeBlock code={generated} filename="simulation.track3p" />
          <div className="mt-4">
            <DownloadButton content={generated} filename="simulation.track3p" />
          </div>
        </div>
      </div>
    </div>
  );
}
