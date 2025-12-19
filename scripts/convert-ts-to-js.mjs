#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import ts from 'typescript';

const root = path.resolve(process.cwd(), 'src');
const IGNORES = ['node_modules', '.git', 'dist', 'build', 'public', 'supabase/migrations'];

function shouldIgnore(filePath) {
  return IGNORES.some((p) => filePath.includes(p));
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (shouldIgnore(full)) continue;
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function mapExt(ext) {
  if (ext === '.ts') return '.js';
  if (ext === '.tsx') return '.jsx';
  return ext;
}

function replaceImportExts(code) {
  // replace explicit .ts/.tsx extensions in import/require statements
  return code.replace(/(["'])([^"']+?)\.(ts|tsx)(["'])/g, (m, q1, p, ext, q2) => {
    return `${q1}${p}${mapExt('.' + ext)}${q2}`;
  });
}

async function convertFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx'].includes(ext)) return null;
  if (filePath.endsWith('.d.ts')) return null;

  const src = await fs.readFile(filePath, 'utf8');

  const transpiled = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      jsx: ext === '.tsx' ? ts.JsxEmit.Preserve : undefined,
      esModuleInterop: true,
      allowJs: true,
    },
    fileName: filePath,
  });

  let out = transpiled.outputText;
  out = replaceImportExts(out);

  const outPath = filePath.replace(/\.(ts|tsx)$/, (m) => mapExt(m));
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, out, 'utf8');
  return outPath;
}

async function main() {
  console.log('Scanning src for .ts/.tsx files...');
  const files = await walk(root);
  const candidates = files.filter((f) => /\.tsx?$/.test(f) && !f.endsWith('.d.ts'));
  console.log(`Found ${candidates.length} TypeScript files.`);

  const results = [];
  for (const f of candidates) {
    try {
      const out = await convertFile(f);
      if (out) {
        results.push(out);
        console.log('Converted:', path.relative(process.cwd(), f), '→', path.relative(process.cwd(), out));
      }
    } catch (err) {
      console.error('Failed to convert', f, err);
    }
  }

  console.log('\nConversion complete. Generated files:');
  for (const r of results) console.log('-', path.relative(process.cwd(), r));
  console.log('\nNotes:');
  console.log('- Original .ts/.tsx files are left intact as backups.');
  console.log('- The script replaces explicit import extensions (.ts/.tsx → .js/.jsx).');
  console.log('- You may need to review imports that rely on extensionless resolution.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
