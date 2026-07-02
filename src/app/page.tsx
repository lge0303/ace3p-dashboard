import WorkflowDiagram from "@/components/WorkflowDiagram";
import Link from "next/link";

const modules = [
  {
    href: "/omega3p",
    title: "Omega3P",
    desc: "Eigenmode solver for RF cavities. Computes resonant frequencies, quality factors, and field distributions.",
    color: "text-blue-700",
  },
  {
    href: "/s3p",
    title: "S3P",
    desc: "S-parameter solver for waveguide structures. Computes scattering matrices over a frequency range.",
    color: "text-emerald-700",
  },
  {
    href: "/track3p",
    title: "Track3P",
    desc: "Particle tracking for multipacting and dark current. Simulates secondary emission and field scanning.",
    color: "text-purple-700",
  },
  {
    href: "/t3p",
    title: "T3P",
    desc: "Time-domain solver for wakefield computation. Simulates bunch-excited fields and impedance.",
    color: "text-orange-700",
  },
  {
    href: "/tem3p",
    title: "TEM3P",
    desc: "Coupled thermal-structural analysis. RF heating, Lorentz force detuning, and mesh deformation.",
    color: "text-rose-700",
  },
];

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
        <h2 className="text-xl font-semibold mb-4">Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="block p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
            >
              <h3 className={`text-lg font-semibold ${mod.color}`}>
                {mod.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{mod.desc}</p>
            </Link>
          ))}
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
              <strong>3.</strong> Use the Input Generator for your chosen module
              to create the solver input file
            </li>
            <li>
              <strong>4.</strong> Submit jobs to Perlmutter with{" "}
              <code className="bg-gray-100 px-1 rounded">sbatch</code>
            </li>
            <li>
              <strong>5.</strong> Post-process results with{" "}
              <code className="bg-gray-100 px-1 rounded">
                acdtool postprocess
              </code>{" "}
              or ParaView
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
