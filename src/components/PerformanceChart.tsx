"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { nodes: 1, Omega3P: 480, Track3P: 520, S3P: 340 },
  { nodes: 2, Omega3P: 260, Track3P: 290, S3P: 185 },
  { nodes: 4, Omega3P: 142, Track3P: 158, S3P: 98 },
  { nodes: 8, Omega3P: 78, Track3P: 89, S3P: 55 },
  { nodes: 16, Omega3P: 45, Track3P: 52, S3P: 32 },
  { nodes: 32, Omega3P: 28, Track3P: 34, S3P: 21 },
  { nodes: 64, Omega3P: 18, Track3P: 22, S3P: 15 },
];

export default function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={performanceData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="nodes"
          label={{ value: "Nodes", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          label={{
            value: "Runtime (min)",
            angle: -90,
            position: "insideLeft",
            offset: 10,
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
          }}
        />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="Omega3P"
          stroke="#1d4ed8"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="Track3P"
          stroke="#059669"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="S3P"
          stroke="#d97706"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
