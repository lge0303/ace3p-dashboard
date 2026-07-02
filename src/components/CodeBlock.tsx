"use client";

interface CodeBlockProps {
  code: string;
  filename?: string;
}

export default function CodeBlock({ code, filename }: CodeBlockProps) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {filename && (
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <span className="text-xs font-mono text-gray-600">{filename}</span>
        </div>
      )}
      <pre className="p-4 bg-gray-50 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono text-gray-800">{code}</code>
      </pre>
    </div>
  );
}
