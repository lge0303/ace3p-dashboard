"use client";

import { useState } from "react";

export default function WorkflowGeneratePage() {
  const [description, setDescription] = useState("");
  const [tool, setTool] = useState<"maestro" | "merlin">("maestro");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!description.trim()) return;
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch("/api/workflow/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, tool }),
      });
      const data = await response.json();
      setOutput(data.yaml || data.error || "No response");
    } catch (err) {
      setOutput(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        AI Workflow Generator
      </h1>
      <p className="text-gray-500 mb-6">
        Describe your simulation campaign in natural language and get a valid
        Maestro or Merlin YAML spec.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Tool
          </label>
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value as "maestro" | "merlin")}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="maestro">Maestro (DAG orchestration)</option>
            <option value="merlin">Merlin (distributed + fault tolerance)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe your workflow
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Run Omega3P sweep over 5 frequencies with FE orders 1, 2, 3 and aggregate convergence results"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Workflow"}
        </button>

        {output && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-700">
                Generated YAML
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Copy to clipboard
              </button>
            </div>
            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
