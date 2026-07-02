import Link from "next/link";

export default function Tem3pPage() {
  const sections = [
    {
      href: "/tem3p/input-generator",
      title: "Input File Generator",
      desc: "Interactive form to build a valid .tem3p input file. Configure thermal and elastic boundary conditions, RF heating from Omega3P fields, Lorentz force detuning, and mesh output options.",
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">TEM3P</h1>
        <p className="text-gray-500 mt-2">
          Coupled thermal-structural analysis solver for RF cavities. TEM3P
          solves steady-state heat conduction driven by RF surface heating from
          Omega3P fields, then feeds the resulting temperature distribution into
          a linear elasticity solver to compute mechanical deformations and
          Lorentz force detuning.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Capabilities</h2>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>
            Steady-state thermal analysis with Neumann, Robin, and Dirichlet
            boundary conditions
          </li>
          <li>
            Linear elasticity with mixed, Neumann, and Dirichlet mechanical
            constraints
          </li>
          <li>
            RF surface heating computed from Omega3P electromagnetic field
            results
          </li>
          <li>
            Lorentz force detuning calculation using deformed cavity geometry
          </li>
          <li>
            Deformed mesh output for follow-on Omega3P re-analysis
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
