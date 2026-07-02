import Link from "next/link";

export default function S3pPage() {
  const sections = [
    {
      href: "/s3p/input-generator",
      title: "Input File Generator",
      desc: "Interactive form to build a valid .s3p input file. Configure boundary conditions, ports, frequency scan range, and material properties.",
    },
    {
      href: "/s3p/slurm-generator",
      title: "Slurm Script Generator",
      desc: "Generate NERSC Perlmutter job submission scripts for running S3P S-parameter simulations.",
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">S3P</h1>
        <p className="text-gray-500 mt-2">
          Frequency-domain S-parameter solver for waveguide and microwave
          structures. S3P computes scattering parameters across a frequency
          sweep using higher-order finite elements on unstructured tetrahedral
          meshes, supporting multi-port configurations and lossy materials.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Capabilities</h2>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>
            Frequency-domain S-parameter calculation over a configurable sweep
          </li>
          <li>
            Multi-port structures with independent mode counts per port
          </li>
          <li>
            Lossy materials via complex permittivity (EpsilonImag) and surface
            conductivity (Sigma)
          </li>
          <li>
            Higher-order Nedelec finite elements with curved surface support
          </li>
          <li>
            Waveguide, impedance, and absorbing boundary conditions
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
