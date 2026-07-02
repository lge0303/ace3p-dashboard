"use client";

interface DownloadButtonProps {
  content: string;
  filename: string;
  label?: string;
}

export default function DownloadButton({
  content,
  filename,
  label,
}: DownloadButtonProps) {
  function handleDownload() {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
    >
      {label || `Download ${filename}`}
    </button>
  );
}
