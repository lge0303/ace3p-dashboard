import Link from "next/link";

export default function Omega3pPage() {
  const sections = [
    {
      href: "/omega3p/workflow",
      title: "Workflow Guide",
      desc: "Step-by-step explanation of the Omega3P simulation workflow with annotated examples from the pillbox cavity tutorial.",
    },
    {
      href: "/omega3p/input-generator",
      title: "Input File Generator",
      desc: "Interactive form to build a valid .omega3p input file. Configure boundary conditions, finite element order, eigensolver parameters, and ports.",
    },
    {
      href: "/omega3p/slurm-generator",
      title: "Slurm Script Generator",
      desc: "Generate NERSC Perlmutter job submission scripts for mesh conversion, Omega3P solver, and post-processing.",
    },
    {
      href: "/omega3p/postprocess",
      title: "Post-process File Generator",
      desc: "Create .rfpost files for extracting RF cavity parameters: R/Q, field on line, gradients, and more.",
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Omega3P</h1>
        <p className="text-gray-500 mt-2">
          Parallel eigenmode solver for RF cavities. Omega3P computes resonant
          frequencies, external Q-factors, and electromagnetic field
          distributions using higher-order Nedelec finite elements on
          unstructured tetrahedral meshes.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Capabilities</h2>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>
            Real eigenvalue problems for lossless cavities (PEC/PMC boundaries)
          </li>
          <li>
            Complex eigenvalue problems for cavities with waveguide ports or
            lossy materials
          </li>
          <li>Periodic boundary conditions for dispersion curve calculation</li>
          <li>Surface impedance for finite-conductivity walls</li>
          <li>
            Nonlinear eigenvalue solver (CORK) for multi-mode port loading
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Tools</h2>
        <div className="space-y-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <h3 className="font-medium text-blue-700">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
