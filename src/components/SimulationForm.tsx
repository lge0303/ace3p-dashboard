"use client";

import { useState } from "react";

interface Job {
  name: string;
  solver: string;
  status: string;
  runtime: string;
}

interface SimulationFormProps {
  onSubmit: (job: Job) => void;
}

export default function SimulationForm({ onSubmit }: SimulationFormProps) {
  const [name, setName] = useState("");
  const [solver, setSolver] = useState("Omega3P");
  const [nodes, setNodes] = useState("4");
  const [mpiRanks, setMpiRanks] = useState("16");
  const [ompThreads, setOmpThreads] = useState("4");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const runtimeMinutes = Math.floor(Math.random() * 120) + 10;
    const newJob: Job = {
      name: name || `sim_${Date.now()}`,
      solver,
      status: "Queued",
      runtime: `${runtimeMinutes} min`,
    };

    onSubmit(newJob);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="sim-name" className="block text-sm font-medium mb-1">
          Simulation Name
        </label>
        <input
          id="sim-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. cavity_eigenmode_001"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="solver" className="block text-sm font-medium mb-1">
          Solver
        </label>
        <select
          id="solver"
          value={solver}
          onChange={(e) => setSolver(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Omega3P">Omega3P</option>
          <option value="Track3P">Track3P</option>
          <option value="S3P">S3P</option>
          <option value="T3P">T3P</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label htmlFor="nodes" className="block text-sm font-medium mb-1">
            Nodes
          </label>
          <input
            id="nodes"
            type="number"
            min="1"
            value={nodes}
            onChange={(e) => setNodes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="mpi-ranks" className="block text-sm font-medium mb-1">
            MPI Ranks
          </label>
          <input
            id="mpi-ranks"
            type="number"
            min="1"
            value={mpiRanks}
            onChange={(e) => setMpiRanks(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="omp-threads"
            className="block text-sm font-medium mb-1"
          >
            OpenMP Threads
          </label>
          <input
            id="omp-threads"
            type="number"
            min="1"
            value={ompThreads}
            onChange={(e) => setOmpThreads(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
      >
        Submit Job
      </button>
    </form>
  );
}
