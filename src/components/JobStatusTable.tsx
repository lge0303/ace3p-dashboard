"use client";

interface Job {
  name: string;
  solver: string;
  status: string;
  runtime: string;
}

interface JobStatusTableProps {
  jobs: Job[];
}

export default function JobStatusTable({ jobs }: JobStatusTableProps) {
  function statusColor(status: string): string {
    switch (status) {
      case "Running":
        return "text-green-700 bg-green-100";
      case "Completed":
        return "text-blue-700 bg-blue-100";
      case "Queued":
        return "text-yellow-700 bg-yellow-100";
      case "Failed":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-2 font-semibold">Job Name</th>
            <th className="text-left py-3 px-2 font-semibold">Solver</th>
            <th className="text-left py-3 px-2 font-semibold">Status</th>
            <th className="text-left py-3 px-2 font-semibold">Runtime</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-2 font-mono text-xs">{job.name}</td>
              <td className="py-3 px-2">{job.solver}</td>
              <td className="py-3 px-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(job.status)}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="py-3 px-2">{job.runtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {jobs.length === 0 && (
        <p className="text-center text-gray-400 py-6 text-sm">
          No jobs submitted yet. Use the form to submit a simulation.
        </p>
      )}
    </div>
  );
}
