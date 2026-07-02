export default function WorkflowDiagram() {
  const steps = [
    {
      num: 1,
      title: "Geometry",
      desc: "Build CAD model in Cubit",
      tool: "Cubit .jou",
    },
    {
      num: 2,
      title: "Meshing",
      desc: "Generate tetrahedral mesh",
      tool: "Cubit .jou",
    },
    {
      num: 3,
      title: "Mesh Convert",
      desc: "Convert .gen to .ncdf",
      tool: "acdtool meshconvert",
    },
    {
      num: 4,
      title: "Omega3P Solve",
      desc: "Eigenmode computation",
      tool: ".omega3p input",
    },
    {
      num: 5,
      title: "Post-process",
      desc: "Extract RF parameters",
      tool: "acdtool postprocess rf",
    },
    {
      num: 6,
      title: "Visualize",
      desc: "View fields & modes",
      tool: "ParaView",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {steps.map((step) => (
        <div
          key={step.num}
          className="relative bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm"
        >
          <div className="w-8 h-8 mx-auto mb-2 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {step.num}
          </div>
          <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
          <p className="text-xs text-blue-600 mt-1 font-mono">{step.tool}</p>
        </div>
      ))}
    </div>
  );
}
