<h1 align="center">📖 novel-master</h1>

<p align="center">
  <strong>为中文长篇小说准备的 AI 创作 skill</strong><br>
  从设定、卷纲到章节续写，帮你管理人物、伏笔和故事进度。
</p>

<p align="center">
  <a href="https://github.com/dashenbibi/novel-master/stargazers"><img src="https://img.shields.io/github/stars/dashenbibi/novel-master?style=flat-square&logo=github" alt="GitHub stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/dashenbibi/novel-master?style=flat-square" alt="License"></a>
  <a href="https://github.com/dashenbibi/novel-master/issues"><img src="https://img.shields.io/github/issues/dashenbibi/novel-master?style=flat-square" alt="GitHub issues"></a>
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#能做什么">功能</a> ·
  <a href="#使用示例">使用示例</a> ·
  <a href="#示范作品九品仙奴">示范作品</a> ·
  <a href="#项目结构">项目结构</a>
</p>

---

写长篇时，人物状态、世界规则和伏笔会随着章节不断变化。novel-master 将这些资料组织在本地 Markdown 文件中，帮助 AI 在写作前查阅相关前文，在写作后整理实际发生的变化。

**你决定故事怎么走，skill 协助规划、续写、润色与检查。** 适合正在写长篇网文、需要管理复杂设定，或希望 AI 延续既有文风的创作者。

## 一本小说，怎样继续写下去？

以示范作品《九品仙奴》为例，药奴许良在暴雨夜发现了一本断魂账。第一章结尾，巡山执事找到了他：

> 带血的长刀瞬间逼近，冰冷的刀锋直接压在了许良的喉咙上。
>
> “刚才……你都听见什么了？”

接下来可以让 novel-master 先查阅项目里的章节、角色档案和伏笔，再续写下一章：

- **接住前文**：许良左臂受伤，藏着账册中写有自己名字的一页，正被崔道成逼问。
- **沿用线索**：断魂账和包德全身上的黑煞爪印已在第一章出现，后续如何发展仍由作者决定。
- **写后同步**：根据新正文更新人物状态和伏笔记录，让下一次续写有据可查。

这是根据[示范工作区](examples/minimal-workspace/)说明的使用方式，实际生成结果取决于你提供的要求和项目资料。想先看看作品？[阅读第一章 →](examples/minimal-workspace/04-chapters/ch001.md)

## 能做什么

| 功能 | 适用场景 |
| --- | --- |
| 🧭 **故事规划** | 明确题材、核心矛盾、分卷目标和章节大纲 |
| 🎭 **人物与世界观** | 建立角色档案、关系、声线以及世界规则 |
| ✍️ **章节写作** | 基于大纲和相关前文写指定章节，沿用已有项目格式 |
| 🧠 **续写与同步** | 梳理当前人物状态、已知信息和未解问题，并按正文更新相关记录 |
| 🎣 **伏笔追踪** | 区分计划中的线索和正文已埋下的伏笔，记录呼应与回收 |
| 🔍 **审查与润色** | 检查一致性、叙事节奏和 AI 味，保留人物声音与既定剧情 |

> 项目文件和你的明确要求优先。检查结果与生成内容仍需要作者结合上下文审阅。

## 快速开始

### 1. 安装 skill

本项目是一个包含 `SKILL.md`、参考资料和模板的 skill 目录。选择你使用的工具，把**整个仓库**克隆到它会搜索的 skills 目录。

**通用目录：Codex、OpenCode，以及使用默认状态目录的 OpenClaw**

```bash
git clone https://github.com/dashenbibi/novel-master.git ~/.agents/skills/novel-master
```

**Claude Code**

```bash
git clone https://github.com/dashenbibi/novel-master.git ~/.claude/skills/novel-master
```

其他支持 skill 目录的工具，可将仓库克隆到该工具文档指定的目录：

```bash
git clone https://github.com/dashenbibi/novel-master.git <你的 skills 目录>/novel-master
```

将 `<你的 skills 目录>` 替换为实际路径；无需输入尖括号。如果通过下载 ZIP 安装，解压后也要保留整个目录，确保 `novel-master/SKILL.md` 和 `references/`、`assets/` 在同一目录下。

**安装后**：开启新会话并在对话中输入“使用 novel-master”。Claude Code 可输入 `/novel-master`；Codex CLI 或 IDE 可通过 `/skills` 或 `$novel-master` 选择；OpenCode 可在提示中提及 `@novel-master`。如果没有显示，检查路径和工具的 skill 设置，必要时重启工具。

**更新已有 Git 安装**：先进入安装目录并检查是否有本地修改，再拉取更新。例如通用目录：

```bash
cd ~/.agents/skills/novel-master
git status
git pull --ff-only
```

如果安装在其他目录，请将 `cd` 路径替换为实际位置；有本地修改时先处理修改，避免覆盖。不要在同一个工具的多个搜索目录中重复安装，以免加载到旧副本。

> 上述目录是常见默认路径。不同版本、平台或自定义配置可能有所不同；以工具的 skill 设置为准。当前已按 [Codex](https://developers.openai.com/codex/skills/)、[Claude Code](https://code.claude.com/docs/en/skills)、[OpenCode](https://opencode.ai/docs/skills/) 和 [OpenClaw](https://docs.openclaw.ai/tools/skills) 的文档列出路径，其他工具请查阅其文档。

### 2. 开始一个项目

在 AI 对话中输入：

```text
请用 novel-master 帮我规划一部长篇仙侠小说《九品仙奴》：
- 题材：边陲宗门、底层求生
- 预计规模：5 卷，共 100 章
- 核心矛盾：药奴发现自己被列入取髓名单，必须想办法活下来

先整理故事方向和主线，并创建项目总览、规则和目录结构。
```

### 3. 继续完善和写作

```text
# 人物和设定
请为主角许良和巡山执事崔道成建立角色档案，区分他们的动机和说话方式。

# 规划
请规划第一卷，列出主要事件、人物关系变化和待埋伏笔。

# 写作
请先读取相关设定与前文，再写第 1 章，约 2500 字。
```

已有作品也可以直接指定项目目录，请 AI 读取已有文件后续写或审查；不需要为了使用 skill 重建项目。

## 使用示例

### 续写下一章

```text
请读取项目中最近的章节、当前卷纲和相关角色状态，续写下一章。
写完后，根据正文更新相关角色状态和伏笔记录。
```

### 检查一致性

```text
请检查第 21～28 章的人物状态、时间线和伏笔是否一致。
只列出问题、相关位置和修改建议，不修改正文。
```

### 润色与去 AI 味

```text
请润色第 8 章：检查重复解释、人物对话和场景详略。
保留已有剧情、人物关系和伏笔，完成后说明主要修改。
```

只想看诊断时，可以说“只检查，不修改”。检查会结合表达、场景详略和故事因果判断；需要改变既定剧情时，会指出问题及可能影响。

## 示范作品：《九品仙奴》

仓库内置了一套 [示范工作区](examples/minimal-workspace/)：药奴许良在暴雨夜拾得断魂账，发现自己被列入取髓名单。示例展示了如何将角色档案、世界规则、卷纲、正文和伏笔记录放在一起维护。

- 📖 [阅读第一章](examples/minimal-workspace/04-chapters/ch001.md)
- 🎭 [查看许良的角色档案](examples/minimal-workspace/01-characters/xu-liang.md)
- 🎣 [查看伏笔追踪](examples/minimal-workspace/05-tracker/foreshadowing.md)

示例中的正文、角色档案和追踪表可以直接阅读，也可以作为搭建自己项目的参考。题材、文风和篇幅都由你决定。

## 项目结构

一个小说工作区可以按需使用以下结构：

```text
我的小说/
├── rules.md                 # 本书文风、称谓与写作规则
├── 00-overview.md           # 核心设定、主线与当前进度
├── 01-characters/           # 角色档案与关系
├── 02-world/                # 世界观与规则
├── 03-volumes/              # 分卷和章节规划
├── 04-chapters/             # 章节正文
└── 05-tracker/              # 伏笔和其他追踪记录
```

仓库中的 [`SKILL.md`](SKILL.md) 是 skill 入口；[`assets/templates/`](assets/templates/) 提供项目模板，[`references/`](references/) 提供按需查阅的写作与检查指南。

## 工作方式

```mermaid
flowchart LR
    A[项目设定] --> B[人物与世界观]
    B --> C[卷纲与章节规划]
    C --> D[章节写作]
    D --> E[润色与一致性检查]
    E --> F[更新人物与伏笔]
    F --> D
```

续写前读取相关正文、设定和追踪记录；写完后按项目现有方式同步变化。卷纲中的计划和正文中已经发生的事实分别记录。

仓库附带的 CLI 主要用于生成项目和章节模板。`polish` 输出空白报告框架，`check` 检查章节文件是否存在；实际润色和故事一致性检查由 AI 根据 skill 执行。更多说明见 [兼容性说明](COMPATIBILITY.md)。

## 参与项目

欢迎通过 [Issues](https://github.com/dashenbibi/novel-master/issues) 分享问题和建议，或参考 [贡献指南](CONTRIBUTING.md) 提交改进。

本项目采用 [MIT License](LICENSE)。
