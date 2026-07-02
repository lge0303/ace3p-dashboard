import RfpostForm from "@/components/RfpostForm";

export default function PostprocessPage() {
  return (
    <div className="p-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          Post-process File Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Generate .rfpost files for extracting RF cavity parameters from
          Omega3P results. Configure R/Q calculation, field-on-line extraction,
          and other post-processing options. Run with:{" "}
          <code className="bg-gray-100 px-1 rounded">
            srun acdtool postprocess rf filename.rfpost
          </code>
        </p>
      </header>
      <RfpostForm />
    </div>
  );
}
