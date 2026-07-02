import SlurmForm from "@/components/SlurmForm";

export default function SlurmGeneratorPage() {
  return (
    <div className="p-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          Perlmutter Slurm Script Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Generate job submission scripts for NERSC Perlmutter. Supports all
          three ACE3P workflow steps: mesh conversion, Omega3P solver, and
          post-processing. Download the script and submit with{" "}
          <code className="bg-gray-100 px-1 rounded">sbatch</code>.
        </p>
      </header>
      <SlurmForm />
    </div>
  );
}
