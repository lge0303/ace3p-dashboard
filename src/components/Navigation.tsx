"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavSection {
  title: string;
  items: { href: string; label: string }[];
}

const navSections: NavSection[] = [
  {
    title: "General",
    items: [{ href: "/", label: "Overview" }],
  },
  {
    title: "Workflows",
    items: [
      { href: "/workflow/status", label: "Monitor" },
      { href: "/workflow/generate", label: "AI Generator" },
    ],
  },
  {
    title: "Omega3P",
    items: [
      { href: "/omega3p", label: "Overview" },
      { href: "/omega3p/workflow", label: "Workflow Guide" },
      { href: "/omega3p/input-generator", label: "Input Generator" },
      { href: "/omega3p/slurm-generator", label: "Slurm Generator" },
      { href: "/omega3p/postprocess", label: "Post-process" },
    ],
  },
  {
    title: "S3P",
    items: [
      { href: "/s3p", label: "Overview" },
      { href: "/s3p/input-generator", label: "Input Generator" },
    ],
  },
  {
    title: "Track3P",
    items: [
      { href: "/track3p", label: "Overview" },
      { href: "/track3p/input-generator", label: "Input Generator" },
    ],
  },
  {
    title: "T3P",
    items: [
      { href: "/t3p", label: "Overview" },
      { href: "/t3p/input-generator", label: "Input Generator" },
    ],
  },
  {
    title: "TEM3P",
    items: [
      { href: "/tem3p", label: "Overview" },
      { href: "/tem3p/input-generator", label: "Input Generator" },
    ],
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 border-r border-gray-200 bg-white p-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          ACE3P Dashboard
        </h2>
      </div>
      {navSections.map((section) => (
        <div key={section.title} className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">
            {section.title}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
