import T3pForm from "@/components/T3pForm";

export default function InputGeneratorPage() {
  return (
    <div className="p-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          T3P Input File Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Configure your T3P wakefield simulation parameters below. The .t3p
          input file is generated live as you edit. Download it and place it in
          your working directory alongside the .ncdf mesh file.
        </p>
      </header>
      <T3pForm />
    </div>
  );
}
