# 小说项目模板

## 快速开始

1. 复制整个 `templates` 文件夹到你的项目目录
2. 重命名项目文件夹为你的小说名称
3. 从 `00-overview.md` 开始填写
4. 按照工作流程逐步完成

## 目录结构

```
your-novel/
├── rules.md                # 本书专属写作军规与文风约定（从 templates/rules.md 开始）
├── 00-overview.md          # 整体设定和核心概念（从 templates/00-overview.md 开始）
├── 01-characters/          # 角色档案库（复制 templates/01-characters/）
│   └── protagonist.md
├── 02-world/               # 世界观设定与代价体系
│   └── world.md
├── 03-volumes/             # 分卷大纲（复制 templates/03-volumes/）
│   └── volume-01.md
├── 04-chapters/            # 纯净正文库（即拷即发，复制 templates/04-chapters/）
│   └── chapter-template.md
└── 05-tracker/             # 独立解耦追踪看板（复制 templates/05-tracker/）
    ├── context.md          # 即时状态机与上下文
    ├── capabilities.md     # 能力边界与战力追踪
    └── foreshadowing.md    # 全书伏笔矩阵
```

## 工作流程

1. **规划阶段** → 填写 `00-overview.md`
2. **角色设计** → 创建 `01-characters/` 下的角色档案
3. **世界观构建** → 创建 `02-world/` 下的设定文档
4. **分卷规划** → 创建 `03-volumes/` 下的卷大纲
5. **章节写作** → 在 `04-chapters/` 下逐章创作
6. **追踪维护** → 在 `05-tracker/` 下记录伏笔和一致性

## 写作建议

- 每章写作前先完成章节大纲
- 每章完成后进行自评复写
- 每 10 章做一次一致性检查
- 每卷完成后进行大修订
- 定期备份项目文件

祝你创作顺利！📝
