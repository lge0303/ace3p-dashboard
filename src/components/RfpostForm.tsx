"use client";

import { useState } from "react";
import {
  RfpostConfig,
  defaultRfpostConfig,
  generateRfpost,
} from "@/lib/rfpost-template";
import CodeBlock from "./CodeBlock";
import DownloadButton from "./DownloadButton";

export default function RfpostForm() {
  const [config, setConfig] = useState<RfpostConfig>(defaultRfpostConfig);

  const generated = generateRfpost(config);

  function updateRfField(field: string, value: string | number) {
    setConfig((prev) => ({
      ...prev,
      rfField: { ...prev.rfField, [field]: value },
    }));
  }

  function updateRoverQ(field: string, value: string | boolean) {
    setConfig((prev) => ({
      ...prev,
      roverQ: { ...prev.roverQ, [field]: value },
    }));
  }

  function updateFieldOnLine(field: string, value: string | number | boolean) {
    setConfig((prev) => ({
      ...prev,
      fieldOnLine: { ...prev.fieldOnLine, [field]: value },
    }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        {/* RFField */}
        <section>
          <h3 className="text-sm font-semibold mb-3">RFField Parameters</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Result Directory
                </label>
                <input
                  type="text"
                  value={config.rfField.resultDir}
                  onChange={(e) => updateRfField("resultDir", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Mode ID
                </label>
                <input
                  type="number"
                  min="0"
                  value={config.rfField.modeId}
                  onChange={(e) =>
                    updateRfField("modeId", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  X Symmetry
                </label>
                <select
                  value={config.rfField.xSymmetry}
                  onChange={(e) => updateRfField("xSymmetry", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="none">none</option>
                  <option value="electric">electric</option>
                  <option value="magnetic">magnetic</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Y Symmetry
                </label>
                <select
                  value={config.rfField.ySymmetry}
                  onChange={(e) => updateRfField("ySymmetry", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="none">none</option>
                  <option value="electric">electric</option>
                  <option value="magnetic">magnetic</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Gradient (V/m)
                </label>
                <input
                  type="text"
                  value={config.rfField.gradient}
                  onChange={(e) => updateRfField("gradient", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Cavity Beta
                </label>
                <input
                  type="text"
                  value={config.rfField.cavityBeta}
                  onChange={(e) => updateRfField("cavityBeta", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  gz1 (m)
                </label>
                <input
                  type="text"
                  value={config.rfField.gz1}
                  onChange={(e) => updateRfField("gz1", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  gz2 (m)
                </label>
                <input
                  type="text"
                  value={config.rfField.gz2}
                  onChange={(e) => updateRfField("gz2", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </section>

        {/* R/Q */}
        <section>
          <h3 className="text-sm font-semibold mb-3">
            <label>
              <input
                type="checkbox"
                checked={config.roverQ.enabled}
                onChange={(e) => updateRoverQ("enabled", e.target.checked)}
                className="mr-2"
              />
              R/Q Calculation
            </label>
          </h3>
          {config.roverQ.enabled && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">x1</label>
                <input
                  type="text"
                  value={config.roverQ.x1}
                  onChange={(e) => updateRoverQ("x1", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y1</label>
                <input
                  type="text"
                  value={config.roverQ.y1}
                  onChange={(e) => updateRoverQ("y1", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">z1</label>
                <input
                  type="text"
                  value={config.roverQ.z1}
                  onChange={(e) => updateRoverQ("z1", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">x2</label>
                <input
                  type="text"
                  value={config.roverQ.x2}
                  onChange={(e) => updateRoverQ("x2", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">y2</label>
                <input
                  type="text"
                  value={config.roverQ.y2}
                  onChange={(e) => updateRoverQ("y2", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">z2</label>
                <input
                  type="text"
                  value={config.roverQ.z2}
                  onChange={(e) => updateRoverQ("z2", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                />
              </div>
            </div>
          )}
        </section>

        {/* Field On Line */}
        <section>
          <h3 className="text-sm font-semibold mb-3">
            <label>
              <input
                type="checkbox"
                checked={config.fieldOnLine.enabled}
                onChange={(e) =>
                  updateFieldOnLine("enabled", e.target.checked)
                }
                className="mr-2"
              />
              Field On Line
            </label>
          </h3>
          {config.fieldOnLine.enabled && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    npoint
                  </label>
                  <input
                    type="number"
                    value={config.fieldOnLine.npoint}
                    onChange={(e) =>
                      updateFieldOnLine("npoint", Number(e.target.value))
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    filename
                  </label>
                  <input
                    type="text"
                    value={config.fieldOnLine.filename}
                    onChange={(e) =>
                      updateFieldOnLine("filename", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    rfphase
                  </label>
                  <input
                    type="text"
                    value={config.fieldOnLine.rfphase}
                    onChange={(e) =>
                      updateFieldOnLine("rfphase", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">x1</label>
                  <input
                    type="text"
                    value={config.fieldOnLine.x1}
                    onChange={(e) => updateFieldOnLine("x1", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">y1</label>
                  <input
                    type="text"
                    value={config.fieldOnLine.y1}
                    onChange={(e) => updateFieldOnLine("y1", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">z1</label>
                  <input
                    type="text"
                    value={config.fieldOnLine.z1}
                    onChange={(e) => updateFieldOnLine("z1", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">x2</label>
                  <input
                    type="text"
                    value={config.fieldOnLine.x2}
                    onChange={(e) => updateFieldOnLine("x2", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">y2</label>
                  <input
                    type="text"
                    value={config.fieldOnLine.y2}
                    onChange={(e) => updateFieldOnLine("y2", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">z2</label>
                  <input
                    type="text"
                    value={config.fieldOnLine.z2}
                    onChange={(e) => updateFieldOnLine("z2", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Live Preview */}
      <div>
        <div className="sticky top-4 space-y-4">
          <h3 className="text-sm font-semibold mb-2">
            Generated Post-process File
          </h3>
          <CodeBlock code={generated} filename="simulation.rfpost" />
          <DownloadButton content={generated} filename="simulation.rfpost" />
        </div>
      </div>
    </div>
  );
}
