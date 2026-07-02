# ACE3P Workflow Dashboard

A Next.js web application that documents and generates input files for the ACE3P parallel electromagnetic simulation suite, targeting NERSC Perlmutter.

## What We Built

An interactive dashboard that helps users:
- Learn the ACE3P simulation workflow (geometry, meshing, solving, post-processing)
- Generate valid input files for each solver module via interactive forms
- Download Perlmutter Slurm job scripts ready for submission

## Architecture

- **Framework:** Next.js 15 (App Router) + React 18 + TypeScript + Tailwind CSS
- **Hosting:** Runs on SDF (`sdfiana005`), accessed via SSH tunnel
- **No backend needed** — all form logic runs client-side in the browser

## Features

| Module | What it generates |
|--------|-------------------|
| **Omega3P** | `.omega3p` eigenmode input, `.rfpost` post-process, Slurm scripts |
| **S3P** | `.s3p` S-parameter input (frequency scan, multi-port) |
| **Track3P** | `.track3p` multipacting/dark current input |
| **T3P** | `.t3p` time-domain wakefield input |
| **TEM3P** | `.tem3p` coupled thermal-structural input |

Each module has:
- **Overview page** — capabilities and description
- **Input Generator** — interactive form with live preview + download button
- **Omega3P also has:** workflow guide (step-by-step tutorial), Slurm script generator, post-process file generator

## File Structure

```
src/
├── app/              Pages (14 routes total)
│   ├── page.tsx      Home with workflow diagram
│   ├── omega3p/      5 pages (overview, workflow, input, slurm, postprocess)
│   ├── s3p/          2 pages (overview, input generator)
│   ├── track3p/      2 pages
│   ├── t3p/          2 pages
│   └── tem3p/        2 pages
├── components/       11 React components (forms, nav, code viewer, download)
└── lib/              7 template generators (pure functions: config → text)
```

## How Users Use It

1. Open `http://localhost:3000` via SSH tunnel from laptop
2. Navigate to the desired solver module
3. Fill out the form (boundary conditions, solver parameters, etc.)
4. Download the generated file
5. Transfer to Perlmutter and submit with `sbatch`

## Key Decisions

- **No Vercel/StackBlitz** — kept internal on SDF for security (no SLAC data exposed to third parties)
- **Client-side only** — no server API needed, forms generate text files in-browser
- **Real ACE3P syntax** — all templates derived from actual example files in `/sdf/data/rfar/nfs/acd/u01/userspace/cho/cw23/`
- **Perlmutter format** — Slurm scripts use current NERSC conventions (not legacy Edison)

## Running It

```bash
# On SDF:
cd /sdf/group/rfar/lge/sdf/webdev/ace3p-dashboard
npm run dev -- -p 3000

# From laptop:
ssh -L 3000:sdfiana005:3000 lge@sdflogin.slac.stanford.edu
# Then open http://localhost:3000
```

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Production build
npm run build
npm start
```
