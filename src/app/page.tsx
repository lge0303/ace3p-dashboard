"use client";

import { useState } from "react";
import SimulationForm from "@/components/SimulationForm";
import JobStatusTable from "@/components/JobStatusTable";
import PerformanceChart from "@/components/PerformanceChart";

interface Job {
  name: string;
  solver: string;
  status: string;
  runtime: string;
}

const initialJobs: Job[] = [
  { name: "cavity_eigen_001", solver: "Omega3P", status: "Completed", runtime: "45 min" },
  { name: "wakefield_sim_014", solver: "Track3P", status: "Running", runtime: "23 min" },
  { name: "sband_coupler_007", solver: "S3P", status: "Completed", runtime: "67 min" },
  { name: "thermal_analysis_003", solver: "T3P", status: "Queued", runtime: "—" },
  { name: "rf_cavity_opt_022", solver: "Omega3P", status: "Failed", runtime: "12 min" },
];

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  function handleJobSubmit(newJob: Job) {
    setJobs((prev) => [newJob, ...prev]);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ACE3P Workflow Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage and monitor parallel electromagnetic simulations
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Simulation Input Form */}
        <section className="lg:col-span-1 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Submit Simulation</h2>
          <SimulationForm onSubmit={handleJobSubmit} />
        </section>

        {/* Right column: Job Status Table */}
        <section className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Job Status</h2>
          <JobStatusTable jobs={jobs} />
        </section>
      </div>

      {/* Full-width: Performance Chart */}
      <section className="mt-6 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Performance: Runtime vs. Node Count
        </h2>
        <PerformanceChart />
      </section>
    </main>
  );
}
