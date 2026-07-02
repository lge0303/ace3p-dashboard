import Link from "next/link";

export default function Track3pPage() {
  const sections = [
    {
      href: "/track3p/input-generator",
      title: "Input File Generator",
      desc: "Interactive form to build a valid .track3p input file. Configure field scales, emitter geometry, material surfaces, and postprocessing options.",
    },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Track3P</h1>
        <p className="text-gray-500 mt-2">
          Parallel particle tracking solver for multipacting and dark current
          simulation in RF accelerator structures. Track3P tracks electrons
          under the influence of electromagnetic fields computed by Omega3P,
          modeling secondary emission and impact patterns on cavity surfaces.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Capabilities</h2>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>
            Multipacting analysis: identify field levels and surface regions
            prone to electron resonance
          </li>
          <li>
            Dark current tracking: simulate field-emitted electrons and their
            trajectories through cavity structures
          </li>
          <li>
            Secondary electron emission: model SEY-based electron multiplication
            using material-specific data files
          </li>
          <li>
            Field scanning: sweep over a range of field amplitudes to compute
            enhancement factors vs. field level
          </li>
          <li>
            Enhancement counter: compute multipacting enhancement factor with
            configurable SEY models per surface
          </li>
          <li>
            Resonant particle detection: identify and output particles
            undergoing resonant multipacting trajectories
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
