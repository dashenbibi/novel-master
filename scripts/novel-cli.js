#!/usr/bin/env node

/**
 * Novel Master CLI
 * 长篇小说创作技能命令行接口
 */

const fs = require('fs');
const path = require('path');

const WORKSPACE = process.env.HOME + '/.openclaw/workspace';
const ASSETS = path.join(__dirname, '..', 'assets', 'templates');

// 命令处理
const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
📖 Novel Master - 长篇小说创作大师

用法:
  novel create <书名> <类型> <核心创意>   创建新项目
  novel chapter <项目> <章号> <标题>      生成章节
  novel polish <项目> <章号>              输出润色报告框架（不改正文）
  novel check <项目> <起始章>-<结束章>    检查章节文件是否存在
  novel outline <项目> <卷号>             生成卷大纲
  novel status                            显示帮助
`);
}

function getProjectDir(name) {
  return path.join(WORKSPACE, `novel-${name}`);
}

function ensureProjectDir(name) {
  const projectDir = getProjectDir(name);
  if (!fs.existsSync(projectDir)) {
    console.error(`❌ 项目不存在：${projectDir}`);
    process.exit(1);
  }
  return projectDir;
}

function loadTemplate(relativePath) {
  const templatePath = path.join(ASSETS, relativePath);
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ 模板不存在：${templatePath}`);
    process.exit(1);
  }
  return fs.readFileSync(templatePath, 'utf8');
}

function ensureWrite(filePath, content) {
  if (fs.existsSync(filePath)) {
    console.error(`❌ 文件已存在：${filePath}`);
    process.exit(1);
  }
  fs.writeFileSync(filePath, content, { flag: 'wx' });
}

function writeTemplate(filePath, relativePath, replacements = []) {
  let content = loadTemplate(relativePath);
  replacements.forEach(([pattern, value]) => {
    content = content.replace(pattern, value);
  });
  fs.writeFileSync(filePath, content, { flag: 'wx' });
}

function createProject(name, type, concept) {
  const projectDir = path.join(WORKSPACE, `novel-${name}`);

  // 原子创建项目目录，拒绝复用已有项目，避免覆盖用户文件。
  fs.mkdirSync(WORKSPACE, { recursive: true });
  try {
    fs.mkdirSync(projectDir);
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`❌ 项目路径已存在，未修改任何文件：${projectDir}`);
      process.exit(1);
    }
    throw error;
  }

  const dirs = ['01-characters', '02-world', '03-volumes', '04-chapters', '05-tracker'];

  dirs.forEach((dir) => {
    const fullPath = path.join(projectDir, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });

  writeTemplate(path.join(projectDir, '00-overview.md'), '00-overview.md', [
    [/^# .*$/m, `# ${name}`],
    [/- \*\*类型\*\*:/, `- **类型**: ${type}`],
    [/- \*\*一句话概括\*\*:/, `- **一句话概括**: ${concept}`],
  ]);
  writeTemplate(path.join(projectDir, 'rules.md'), 'rules.md');
  writeTemplate(path.join(projectDir, '01-characters', 'protagonist.md'), path.join('01-characters', 'protagonist.md'));
  writeTemplate(path.join(projectDir, '02-world', 'world.md'), path.join('02-world', 'world.md'));
  writeTemplate(path.join(projectDir, '05-tracker', 'context.md'), path.join('05-tracker', 'context.md'));
  writeTemplate(path.join(projectDir, '05-tracker', 'capabilities.md'), path.join('05-tracker', 'capabilities.md'));
  writeTemplate(path.join(projectDir, '05-tracker', 'foreshadowing.md'), path.join('05-tracker', 'foreshadowing.md'));

  console.log(`✅ 项目创建成功：${projectDir}`);
  console.log(`📁 目录结构已生成`);
  console.log(`📝 已生成 overview、rules、主角档案、世界观与三维独立追踪看板（context, capabilities, foreshadowing）`);
}

function createOutline(projectName, volumeNo) {
  const projectDir = ensureProjectDir(projectName);
  const template = loadTemplate(path.join('03-volumes', 'volume-01.md'));
  const updated = template.replace(/^# .*/m, `# 第${volumeNo}卷：[卷名]`);
  const fileName = `volume-${String(volumeNo).padStart(2, '0')}.md`;
  const outputPath = path.join(projectDir, '03-volumes', fileName);
  ensureWrite(outputPath, updated);
  console.log(`✅ 卷大纲模板已生成：${outputPath}`);
}

function createChapter(projectName, chapterNo, title) {
  const projectDir = ensureProjectDir(projectName);
  const template = loadTemplate(path.join('04-chapters', 'chapter-template.md'));
  const updated = template.replace(/^# .*/m, `# 第 ${chapterNo} 章：${title}`);
  const fileName = `ch${String(chapterNo).padStart(3, '0')}.md`;
  const outputPath = path.join(projectDir, '04-chapters', fileName);
  ensureWrite(outputPath, updated);
  console.log(`✅ 章节模板已生成：${outputPath}`);
}

function polishChapter(projectName, chapterNo) {
  const projectDir = ensureProjectDir(projectName);
  const fileName = `ch${String(chapterNo).padStart(3, '0')}.md`;
  const chapterPath = path.join(projectDir, '04-chapters', fileName);
  if (!fs.existsSync(chapterPath)) {
    console.error(`❌ 章节不存在：${chapterPath}`);
    process.exit(1);
  }
  const output = ['说明：这里只输出空白报告框架，不会检查或修改正文。请在 AI 会话中使用 novel-master 完成润色。', `润色目标：${fileName}`, '', '问题点：', '- ', '', '证据段落：', '- ', '', '修改建议：', '- '].join('\n');
  console.log(output);
}

function checkChapters(projectName, range) {
  const projectDir = ensureProjectDir(projectName);
  const parts = range.split('-');
  if (parts.length !== 2) {
    console.error('❌ 用法：novel check <项目> <起始章>-<结束章>');
    process.exit(1);
  }
  const start = Number(parts[0]);
  const end = Number(parts[1]);
  if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
    console.error('❌ 章节范围无效');
    process.exit(1);
  }
  const missing = [];
  for (let i = start; i <= end; i += 1) {
    const fileName = `ch${String(i).padStart(3, '0')}.md`;
    const chapterPath = path.join(projectDir, '04-chapters', fileName);
    if (!fs.existsSync(chapterPath)) {
      missing.push(fileName);
    }
  }
  if (missing.length > 0) {
    console.log('❌ 缺失章节文件：');
    missing.forEach((name) => console.log(`- ${name}`));
  } else {
    console.log('✅ 章节文件齐全');
  }
  console.log('说明：只检查文件是否存在，未检查内容或一致性。请在 AI 会话中使用 novel-master 进行审查。');
}

function showStatus() {
  printHelp();
}

// 主逻辑
switch (command) {
  case 'create':
    if (args.length < 4) {
      console.error('❌ 用法：novel create <书名> <类型> <核心创意>');
      process.exit(1);
    }
    createProject(args[1], args[2], args.slice(3).join(' '));
    break;
  case 'outline':
    if (args.length < 3) {
      console.error('❌ 用法：novel outline <项目> <卷号>');
      process.exit(1);
    }
    createOutline(args[1], args[2]);
    break;
  case 'chapter':
    if (args.length < 4) {
      console.error('❌ 用法：novel chapter <项目> <章号> <标题>');
      process.exit(1);
    }
    createChapter(args[1], args[2], args.slice(3).join(' '));
    break;
  case 'polish':
    if (args.length < 3) {
      console.error('❌ 用法：novel polish <项目> <章号>');
      process.exit(1);
    }
    polishChapter(args[1], args[2]);
    break;
  case 'check':
    if (args.length < 3) {
      console.error('❌ 用法：novel check <项目> <起始章>-<结束章>');
      process.exit(1);
    }
    checkChapters(args[1], args[2]);
    break;

  case 'status':
  case 'help':
  case undefined:
    showStatus();
    break;

  default:
    console.error(`❌ 未知命令：${command}`);
    showStatus();
    process.exit(1);
}
