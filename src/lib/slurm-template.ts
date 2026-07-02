export interface SlurmConfig {
  jobName: string;
  account: string;
  qos: string;
  constraint: string;
  nodes: number;
  timeLimit: string;
  tasksPerNode: number;
  command: string;
  inputFile: string;
}

export const defaultSlurmConfig: SlurmConfig = {
  jobName: "omega3p_run",
  account: "m349",
  qos: "regular",
  constraint: "cpu",
  nodes: 1,
  timeLimit: "01:00:00",
  tasksPerNode: 128,
  command: "omega3p",
  inputFile: "pillbox.omega3p",
};

const commandPaths: Record<string, string> = {
  omega3p: "/global/cfs/cdirs/ace3p/perlmutter/omega3p",
  "acdtool meshconvert": "/global/cfs/cdirs/ace3p/perlmutter/acdtool meshconvert",
  "acdtool postprocess rf": "/global/cfs/cdirs/ace3p/perlmutter/acdtool postprocess rf",
};

export function generateSlurm(config: SlurmConfig): string {
  const totalTasks = config.nodes * config.tasksPerNode;
  const cmdPath = commandPaths[config.command] || config.command;

  let output = "#!/bin/bash -l\n\n";
  output += `#SBATCH -A ${config.account}\n`;
  output += `#SBATCH -C ${config.constraint}\n`;
  output += `#SBATCH -q ${config.qos}\n`;
  output += `#SBATCH -N ${config.nodes}\n`;
  output += `#SBATCH -t ${config.timeLimit}\n`;
  output += `#SBATCH -J ${config.jobName}\n`;
  output += "#SBATCH -e %x.%j.err\n";
  output += "#SBATCH -o %x.%j.out\n";
  output += "\n";
  output += `srun -n ${totalTasks} ${cmdPath} ${config.inputFile}\n`;

  return output;
}
