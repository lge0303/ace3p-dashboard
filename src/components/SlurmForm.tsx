"use client";

import { useState } from "react";
import {
  SlurmConfig,
  defaultSlurmConfig,
  generateSlurm,
} from "@/lib/slurm-template";
import CodeBlock from "./CodeBlock";
import DownloadButton from "./DownloadButton";

export default function SlurmForm() {
  const [config, setConfig] = useState<SlurmConfig>(defaultSlurmConfig);

  const generated = generateSlurm(config);

  function updateField<K extends keyof SlurmConfig>(
    key: K,
    value: SlurmConfig[K]
  ) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <section>
          <h3 className="text-sm font-semibold mb-3">Job Configuration</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Job Name
              </label>
              <input
                type="text"
                value={config.jobName}
                onChange={(e) => updateField("jobName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Account (NERSC project)
              </label>
              <input
                type="text"
                value={config.account}
                onChange={(e) => updateField("account", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">QOS</label>
                <select
                  value={config.qos}
                  onChange={(e) => updateField("qos", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="debug">debug</option>
                  <option value="regular">regular</option>
                  <option value="premium">premium</option>
                  <option value="shared">shared</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Constraint
                </label>
                <select
                  value={config.constraint}
                  onChange={(e) => updateField("constraint", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="cpu">cpu</option>
                  <option value="gpu">gpu</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold mb-3">Resources</h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nodes</label>
              <input
                type="number"
                min="1"
                value={config.nodes}
                onChange={(e) => updateField("nodes", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Tasks/Node
              </label>
              <input
                type="number"
                min="1"
                value={config.tasksPerNode}
                onChange={(e) =>
                  updateField("tasksPerNode", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Time Limit
              </label>
              <input
                type="text"
                value={config.timeLimit}
                onChange={(e) => updateField("timeLimit", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                placeholder="HH:MM:SS"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Total MPI tasks: {config.nodes * config.tasksPerNode}
          </p>
        </section>

        <section>
          <h3 className="text-sm font-semibold mb-3">Command</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                ACE3P Command
              </label>
              <select
                value={config.command}
                onChange={(e) => updateField("command", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="omega3p">omega3p</option>
                <option value="s3p">s3p</option>
                <option value="track3p">track3p</option>
                <option value="t3p">t3p</option>
                <option value="tem3p">tem3p</option>
                <option value="acdtool meshconvert">
                  acdtool meshconvert
                </option>
                <option value="acdtool postprocess rf">
                  acdtool postprocess rf
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Input File
              </label>
              <input
                type="text"
                value={config.inputFile}
                onChange={(e) => updateField("inputFile", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Live Preview */}
      <div>
        <div className="sticky top-4 space-y-4">
          <h3 className="text-sm font-semibold mb-2">Generated Slurm Script</h3>
          <CodeBlock code={generated} filename={`${config.jobName}.sl`} />
          <DownloadButton
            content={generated}
            filename={`${config.jobName}.sl`}
          />
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-800">
              <strong>To submit on Perlmutter:</strong>
            </p>
            <code className="text-xs text-blue-700 font-mono">
              sbatch {config.jobName}.sl
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
