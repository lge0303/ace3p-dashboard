import Omega3pForm from "@/components/Omega3pForm";

export default function InputGeneratorPage() {
  return (
    <div className="p-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          Omega3P Input File Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Configure your Omega3P simulation parameters below. The .omega3p input
          file is generated live as you edit. Download it and place it in your
          working directory on Perlmutter alongside the .ncdf mesh file.
        </p>
      </header>
      <Omega3pForm />
    </div>
  );
}
