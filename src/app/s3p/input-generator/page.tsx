import S3pForm from "@/components/S3pForm";

export default function S3pInputGeneratorPage() {
  return (
    <div className="p-8">
      <header className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">
          S3P Input File Generator
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Configure your S3P simulation parameters below. The .s3p input file
          defines the mesh, boundary conditions, port configuration, frequency
          sweep range, and material properties. The file is generated live as
          you edit. Download it and place it in your working directory alongside
          the .ncdf mesh file.
        </p>
      </header>
      <S3pForm />
    </div>
  );
}
