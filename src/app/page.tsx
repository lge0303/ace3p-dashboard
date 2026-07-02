import WorkflowDiagram from "@/components/WorkflowDiagram";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ACE3P Workflow Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Parallel electromagnetic simulation suite for accelerator cavity
          design. Generate input files, Slurm scripts, and post-processing
          configurations for NERSC Perlmutter.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Simulation Workflow</h2>
        <WorkflowDiagram />
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Available Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/omega3p"
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-blue-700">Omega3P</h3>
            <p className="text-sm text-gray-600 mt-2">
              Eigenmode solver for RF cavities. Computes resonant frequencies,
              quality factors, and field distributions using higher-order finite
              elements.
            </p>
            <ul className="text-xs text-gray-500 mt-3 space-y-1">
              <li>- Real eigenvalues (lossless cavities)</li>
              <li>- Complex eigenvalues (open ports, lossy materials)</li>
              <li>- Periodic structures (dispersion curves)</li>
            </ul>
          </Link>

          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
            <h3 className="text-lg font-semibold text-gray-500">
              Track3P, S3P, T3P, TEM3P
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Additional modules coming soon: particle tracking, S-parameter,
              transient, and thermal analysis.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <ol className="space-y-3 text-sm text-gray-700">
            <li>
              <strong>1.</strong> Build geometry and mesh in{" "}
              <span className="font-mono text-blue-700">Cubit</span> (export as
              .gen file)
            </li>
            <li>
              <strong>2.</strong> Use the{" "}
              <Link
                href="/omega3p/slurm-generator"
                className="text-blue-600 underline"
              >
                Slurm Generator
              </Link>{" "}
              to create a mesh conversion job script
            </li>
            <li>
              <strong>3.</strong> Use the{" "}
              <Link
                href="/omega3p/input-generator"
                className="text-blue-600 underline"
              >
                Input Generator
              </Link>{" "}
              to create your .omega3p input file
            </li>
            <li>
              <strong>4.</strong> Submit jobs to Perlmutter with{" "}
              <code className="bg-gray-100 px-1 rounded">sbatch</code>
            </li>
            <li>
              <strong>5.</strong> Use the{" "}
              <Link
                href="/omega3p/postprocess"
                className="text-blue-600 underline"
              >
                Post-process Generator
              </Link>{" "}
              to extract RF parameters (R/Q, fields, etc.)
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
