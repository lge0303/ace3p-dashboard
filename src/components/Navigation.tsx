"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/omega3p", label: "Omega3P" },
  { href: "/omega3p/workflow", label: "Workflow Guide" },
  { href: "/omega3p/input-generator", label: "Input Generator" },
  { href: "/omega3p/slurm-generator", label: "Slurm Generator" },
  { href: "/omega3p/postprocess", label: "Post-process" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          ACE3P Dashboard
        </h2>
      </div>
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 rounded text-sm transition-colors ${
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
    </nav>
  );
}
