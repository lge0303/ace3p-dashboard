import Tem3pForm from "@/components/Tem3pForm";

export default function InputGeneratorPage() {
  return (
    <div className="p-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          TEM3P Input File Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Configure your TEM3P simulation parameters below. The .tem3p input
          file is generated live as you edit. Download it and place it in your
          working directory alongside the .ncdf mesh file and Omega3P results
          directory.
        </p>
      </header>
      <Tem3pForm />
    </div>
  );
}
