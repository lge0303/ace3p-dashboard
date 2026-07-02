import CodeBlock from "@/components/CodeBlock";

export default function WorkflowPage() {
  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Omega3P Workflow Guide
        </h1>
        <p className="text-gray-500 mt-2">
          Complete workflow for eigenmode simulation of an RF cavity, from
          geometry creation to post-processing. Based on the pillbox cavity
          tutorial.
        </p>
      </header>

      {/* Step 1 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
            1
          </span>
          Build Geometry in Cubit
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Use Cubit to create the cavity geometry. The journal file (.jou)
          automates geometry creation. For a simple pillbox cavity with rounded
          irises:
        </p>
        <CodeBlock
          filename="step1-Make-pillbox.jou"
          code={`reset

#{cav_length = 90}
#{cav_radius = 100}
#{bp_length  = 300}
#{bp_radius  = 35 }
#{iris_rounding = 12}

create Cylinder height {cav_length} radius {cav_radius}
create Cylinder height {bp_length} radius {bp_radius}
unite volume all
compress ids

modify curve 6 5  blend radius {iris_rounding}

export acis "pillbox0.sat" overwrite

# Apply symmetry cuts (quarter model)
webcut volume 1 with plane xplane offset 0
delete volume 2
compress ids
webcut volume 1 with plane yplane offset 0
delete volume 1
compress ids
export acis "pillbox4.sat" overwrite`}
        />
        <p className="text-xs text-gray-500 mt-2">
          Dimensions are in mm. The symmetry cuts reduce the model to 1/4,
          reducing computation time by 4x. The exported .sat file is the ACIS
          geometry format.
        </p>
      </section>

      {/* Step 2 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
            2
          </span>
          Mesh the Model
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Generate a tetrahedral mesh and assign boundary condition IDs (sideset
          numbers). These IDs are referenced in the .omega3p input file.
        </p>
        <CodeBlock
          filename="step2-Mesh-pillbox.jou"
          code={`reset
import acis "pillbox4.sat"

volume all scheme Tetmesh
volume all sizing function type skeleton scale 5 \\
  time_accuracy_level 2 min_size auto max_size 12 \\
  max_gradient 1.2

mesh volume all

# Assign boundary condition sidesets
Sideset 1 surface 3    # Magnetic symmetry plane (x=0)
Sideset 2 surface 1    # Magnetic symmetry plane (y=0)
Sideset 6 surface all except 3 1  # Exterior (cavity wall)

block 1 volume all
block 1 element type tetra10
volume all scale 0.001    # Convert mm to meters

export Genesis "pillbox4.gen" block all overwrite`}
        />
        <p className="text-xs text-gray-500 mt-2">
          <strong>Key points:</strong> Sideset numbers become boundary IDs in
          the solver. The mesh uses 10-node tetrahedra (tetra10) for
          second-order geometry representation. Scale converts mm to SI meters.
        </p>
      </section>

      {/* Step 3 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
            3
          </span>
          Convert Mesh Format
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Convert the Cubit Genesis (.gen) mesh to ACE3P&apos;s native NetCDF
          (.ncdf) format. This runs on Perlmutter:
        </p>
        <CodeBlock
          filename="meshconvert.sl"
          code={`#!/bin/bash -l

#SBATCH -A m349
#SBATCH -C cpu
#SBATCH -q regular
#SBATCH -N 1
#SBATCH -t 00:10:00
#SBATCH -J meshconvert
#SBATCH -e %x.%j.err
#SBATCH -o %x.%j.out

srun -n 1 /global/cfs/cdirs/ace3p/perlmutter/acdtool meshconvert pillbox4.gen`}
        />
        <p className="text-xs text-gray-500 mt-2">
          Only 1 MPI rank is needed for mesh conversion. Output:{" "}
          <code>pillbox4.ncdf</code>
        </p>
      </section>

      {/* Step 4 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
            4
          </span>
          Run Omega3P
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          The .omega3p input file defines the physics: mesh, boundary
          conditions, finite element order, and eigensolver parameters.
        </p>
        <CodeBlock
          filename="pillbox.omega3p"
          code={`ModelInfo : {
  File: ./pillbox4.ncdf

  BoundaryCondition : {
    Magnetic: 1, 2
    Exterior: 6
  }

  SurfaceMaterial : {
    ReferenceNumber: 6
    Sigma: 5.8e7
  }
}

FiniteElement: {
  Order:           2
  CurvedSurfaces: on
}

EigenSolver : {
  NumEigenvalues: 2
  FrequencyShift:  1.0e9
}

PostProcess : {
  Toggle: on
  ModeFile: mode
}`}
        />
        <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs text-gray-600 mb-2">
            <strong>Parameter meanings:</strong>
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>
              <code>Magnetic: 1, 2</code> — symmetry planes (H tangential = 0)
            </li>
            <li>
              <code>Exterior: 6</code> — perfect conductor walls
            </li>
            <li>
              <code>Sigma: 5.8e7</code> — copper conductivity for Q calculation
            </li>
            <li>
              <code>Order: 2</code> — 2nd-order vector finite elements
            </li>
            <li>
              <code>NumEigenvalues: 2</code> — find 2 modes above the shift
            </li>
            <li>
              <code>FrequencyShift: 1.0e9</code> — search above 1 GHz
            </li>
          </ul>
        </div>
        <CodeBlock
          filename="omega3p_run.sl"
          code={`#!/bin/bash -l

#SBATCH -A m349
#SBATCH -C cpu
#SBATCH -q regular
#SBATCH -N 1
#SBATCH -t 00:30:00
#SBATCH -J omega3p_pillbox
#SBATCH -e %x.%j.err
#SBATCH -o %x.%j.out

srun -n 128 /global/cfs/cdirs/ace3p/perlmutter/omega3p pillbox.omega3p`}
        />
        <p className="text-xs text-gray-500 mt-2">
          Results are saved in <code>omega3p_results/</code> directory.
          Eigenvalues are printed in the .out file.
        </p>
      </section>

      {/* Step 5 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
            5
          </span>
          Post-processing
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Extract RF parameters from the computed mode fields. The .rfpost file
          controls what quantities are calculated:
        </p>
        <CodeBlock
          filename="pillbox.rfpost (excerpt)"
          code={`RFField
{
   ResultDir   = omega3p_results
   ModeID      =      0
   xsymmetry   =      magnetic
   ysymmetry   =      magnetic
   gradient    =  2.00000e+07
   cavityBeta  =      1.00000
   gz1         =     -0.03500
   gz2         =      0.03500
   npoint      =    300
}

RoverQ
{
   ionoff      =      1
   modeID1     =     -1
   modeID2     =     -1
   x1          =      0.00000
   x2          =      0.00000
   y1          =      0.00100
   y2          =      0.00100
   z1          =     -0.15000
   z2          =      0.15000
}`}
        />
        <CodeBlock
          filename="postprocess.sl"
          code={`#!/bin/bash -l

#SBATCH -A m349
#SBATCH -C cpu
#SBATCH -q regular
#SBATCH -N 1
#SBATCH -t 00:10:00
#SBATCH -J rfpost
#SBATCH -e %x.%j.err
#SBATCH -o %x.%j.out

srun -n 1 /global/cfs/cdirs/ace3p/perlmutter/acdtool postprocess rf pillbox.rfpost`}
        />
      </section>

      {/* Step 6 */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-sm">
            6
          </span>
          Visualization with ParaView
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          Copy mode field files from <code>omega3p_results/</code> to your local
          machine and open in ParaView:
        </p>
        <CodeBlock
          filename="terminal"
          code={`# Copy mode files from Perlmutter to local machine
scp username@perlmutter.nersc.gov:path/omega3p_results/*mod .

# Open in ParaView
paraview mode_0.mod`}
        />
        <p className="text-xs text-gray-500 mt-2">
          Mode files contain electric and magnetic field vectors on the mesh.
          ParaView can render field magnitudes, vector plots, and surface
          currents.
        </p>
      </section>

      {/* Example Output */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Example Output</h2>
        <p className="text-sm text-gray-700 mb-3">
          Typical Omega3P output for the pillbox cavity (from the solver .out
          file):
        </p>
        <CodeBlock
          filename="omega3p output (excerpt)"
          code={`Total Number of Elements used: 11480
Total Number of DOFs: 71194

Eigenvalue: 6.2329212324684977e+02
    Frequency: 1.1912054010084953e+09
    Residual: 6.9503038747509348e-12

Eigenvalue: 1.8721502793013792e+03
    Frequency: 2.0644824156041033e+09
    Residual: 5.7769025937222531e-09`}
        />
        <p className="text-xs text-gray-500 mt-2">
          The two eigenmode frequencies are 1.191 GHz and 2.064 GHz. Residuals
          below 1e-7 indicate converged solutions.
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">
            Post-processing R/Q output:
          </p>
          <CodeBlock
            filename="rfpost output (excerpt)"
            code={`ModeID   Frequency       Qext          |V|        RoQ(ohm/cavity)
  0   1.1912054e+09  0.00000e+00    4.25086e+00   1.36335e+02
  1   2.0644824e+09  0.00000e+00    2.51742e+00   2.75894e+01`}
          />
        </div>
      </section>
    </div>
  );
}
