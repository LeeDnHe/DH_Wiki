// scripts/build-llms-full.js
// 모든 .md 파일을 순회해서 llms-full.txt 한 개로 합칩니다.
// 사용법: node scripts/build-llms-full.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'llms-full.txt');

// 포함할 폴더 (순서가 곧 llms-full.txt 내 순서)
const INCLUDE_DIRS = ['', 'career', 'projects', 'knowledge'];
// 제외할 파일 (템플릿, 메타 등)
const EXCLUDE_FILES = ['README.md', 'index.md', 'llms-full.txt'];
const EXCLUDE_PATTERNS = [/^_/];  // _template.md, _meta/ 등

function collectMarkdownFiles() {
    const files = [];
    for (const dir of INCLUDE_DIRS) {
        const absDir = path.join(ROOT, dir);
        if (!fs.existsSync(absDir)) continue;
        const entries = fs.readdirSync(absDir);
        for (const name of entries) {
            if (EXCLUDE_FILES.includes(name)) continue;
            if (EXCLUDE_PATTERNS.some(p => p.test(name))) continue;
            const full = path.join(absDir, name);
            if (fs.statSync(full).isFile() && name.endsWith('.md')) {
                files.push({
                    relPath: path.relative(ROOT, full).replace(/\\/g, '/'),
                    content: fs.readFileSync(full, 'utf8')
                });
            }
        }
    }
    return files;
}

function main() {
    const files = collectMarkdownFiles();
    const header = [
        '# Donghee Lee — Full Wiki Dump',
        '',
        `> Auto-generated on ${new Date().toISOString().slice(0, 10)}.`,
        '> This file concatenates all public wiki pages for LLM context injection.',
        '',
        '---',
        ''
    ].join('\n');

    const body = files.map(f => {
        return `\n\n<!-- FILE: ${f.relPath} -->\n\n${f.content}\n\n---\n`;
    }).join('');

    fs.writeFileSync(OUTPUT, header + body, 'utf8');
    console.log(`✓ Generated ${OUTPUT}`);
    console.log(`  ${files.length} files, ${(header + body).length} chars`);
}

main();