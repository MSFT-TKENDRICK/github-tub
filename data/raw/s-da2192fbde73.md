GitHub Copilot CLI is now generally available - GitHub Changelog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
Search 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Back to changelog 
Improvement 
February 25, 2026 •
4 minute read 
GitHub Copilot CLI is now generally available
Table of Contents
Agentic development in your terminal 
Your models, your choice 
Extensible with MCP, plugins, and skills 
Review, diff, and undo 
Infinite sessions and repository memory 
Install everywhere 
Polished terminal experience 
Enterprise ready 
Getting started 
Looking for more information? 
Menu. Currently selected: Agentic development in your terminal 
Agentic development in your terminal 
Your models, your choice 
Extensible with MCP, plugins, and skills 
Review, diff, and undo 
Infinite sessions and repository memory 
Install everywhere 
Polished terminal experience 
Enterprise ready 
Getting started 
Looking for more information? 
GitHub Copilot CLI—the terminal-native coding agent that brings the power of GitHub Copilot directly to your command line—is now generally available for all Copilot subscribers. Editor’s note (February 27, 2026): Updated the text to accurately indicate that Copilot CLI is available to all Copilot subscribers. 
Since launching in public preview in September 2025 , we’ve shipped hundreds of improvements shaped by your feedback. Copilot CLI has grown from a terminal assistant into a full agentic development environment—one that plans, builds, reviews, and remembers across sessions, all without leaving the terminal.
Here are some highlights from our fast-paced updates that make Copilot CLI ready for general availability.
Agentic development in your terminal 
Copilot CLI is more than a chat interface. It’s an autonomous coding agent that can plan complex tasks, execute multistep workflows, edit files, run tests, and iterate until the job is done. You choose how much control to keep, from approving every action to letting Copilot run fully autonomously.
Plan mode: Press Shift + Tab to switch to plan mode. Copilot analyzes your request, asks clarifying questions, and builds a structured implementation plan before writing any code. Review and approve the plan, then watch Copilot execute it.
Autopilot mode: For tasks you trust Copilot to handle end-to-end, autopilot mode lets Copilot work autonomously—executing tools, running commands, and iterating without stopping for approval.
Built-in specialized agents: Copilot automatically delegates to specialized agents when appropriate (e.g., Explore for fast codebase analysis, Task for running builds and tests, Code Review for high-signal change review, and Plan for implementation planning). Multiple agents can run in parallel.
Background delegation: Prefix any prompt with &amp; to delegate work to the Copilot coding agent in the cloud, freeing your terminal for other tasks. Use /resume to switch between local and remote coding agent sessions seamlessly.
To learn more about working effectively with Copilot CLI, head to our best practices guide .
Your models, your choice 
Choose from the latest models from Anthropic, OpenAI, and Google, including Claude Opus 4.6, Claude Sonnet 4.6, GPT-5.3-Codex, and Gemini 3 Pro. Faster models like Claude Haiku 4.5 are available for quick tasks. Switch models in the middle of a session with /model , configure reasoning effort for extended thinking models, and toggle reasoning visibility with Ctrl + T .
GPT-5 mini and GPT-4.1 are included with your Copilot subscription at no additional premium request cost.
Extensible with MCP, plugins, and skills 
Copilot CLI ships with GitHub’s MCP server built in and supports custom MCP servers for connecting to any tool or service.
Plugins: Install community and custom plugins directly from GitHub repositories with /plugin install owner/repo . Plugins can bundle MCP servers, agents, skills, and hooks. To learn more about plugins, head to our documentation about installing plugins .
Agent Skills: Teach Copilot specialized workflows with markdown-based skill files. Skills load automatically when relevant, work across Copilot coding agent, Copilot CLI, and VS Code. To learn more about customizing Copilot CLI with skills, check out our documentation on agent skills .
Custom agents: Create specialized agents through an interactive wizard or by writing .agent.md files. Agents can specify their own tools, MCP servers, and instructions. To learn more about leveraging custom agents, see our documentation on custom CLI agents .
Hooks: Extend behavior at key lifecycle points. preToolUse hooks can deny or modify tool calls, and postToolUse hooks enable custom post-processing. Learn more in our documentation about how to implement hooks .
Review, diff, and undo 
/diff : Review all changes made during your session with syntax-highlighted, inline diffs. Add line-specific comments and submit them as structured feedback. Toggle between session changes and branch diffs.
/review : Analyze staged or unstaged code changes directly in the CLI for a quick sanity check before committing.
Undo/rewind: Press Esc – Esc to rewind file changes to any previous snapshot in the session.
Infinite sessions and repository memory 
Auto-compaction: When your conversation approaches 95% of the context window, Copilot automatically compresses history in the background. Sessions can run as long as you need.
Repository memory: Copilot remembers conventions, patterns, and preferences it learns about your codebase across sessions, making future work more productive.
Cross-session memory: Ask about past work, files, and pull requests across sessions. Learn more in our documentation about agentic memory .
Install everywhere 
Copilot CLI runs on macOS, Linux, and Windows, and is available through npm, Homebrew, WinGet, a shell install script, and standalone executables. Homebrew, WinGet, and install script installations automatically update . Copilot CLI is also included in the default GitHub Codespaces image and available as a Dev Container Feature .
For detailed installation instructions, head to our getting started guide .
Polished terminal experience 
Since public preview, we’ve invested heavily in making the terminal experience feel native and refined:
Alt-screen mode: A full-screen terminal UI with mouse text selection, Page Up/Page Down scrolling, and a dedicated footer status bar. This is currently available as an /experimental feature.
Theme picker: Use /theme to choose from built-in themes including GitHub Dark, GitHub Light, and colorblind variants.
Shell integration: Copilot respects your $SHELL environment variable and supports the ! prefix for direct shell execution.
Keyboard-first navigation: Full UNIX keybinding support ( Ctrl + A/E/W/U/K , Alt + arrows ), suspend/resume with Ctrl + Z , and a quick help overlay with ? .
Ctrl + X , Ctrl + E : Open your preferred terminal editor for composing longer prompts.
Accessibility: Screen reader mode, configurable reasoning visibility, and responsive layout for narrow terminals.
Enterprise ready 
Organization policies: Administrators can control model availability through Copilot policy settings.
Network access management: Per-subscription API endpoints in accordance with GitHub’s network access management guidelines.
Proxy support: HTTPS proxy support.
Authentication: OAuth device flow, GitHub CLI token reuse, and CI/CD-friendly GITHUB_ASKPASS support.
Hooks for policy enforcement: Use preToolUse hooks to enforce file access policies, argument sanitization, and custom approval workflows.
Getting started 
Install Copilot CLI using your preferred method.
Run copilot and authenticate with your GitHub account.
Run /init to generate Copilot instructions tailored to your project.
Start building.
Copilot CLI is available with Copilot Pro, Pro+, Business, and Enterprise plans. For Copilot Business and Enterprise subscribers, an administrator must enable Copilot CLI from the Policies page.
For tips on getting the most out of Copilot CLI, check out our best practices guide .
Looking for more information? 
Read the documentation 
Learn more about Copilot CLI 
Check out our product page 
Join the discussion in our public repository 
Table of Contents
Agentic development in your terminal 
Your models, your choice 
Extensible with MCP, plugins, and skills 
Review, diff, and undo 
Infinite sessions and repository memory 
Install everywhere 
Polished terminal experience 
Enterprise ready 
Getting started 
Looking for more information? 
Menu. Currently selected: Agentic development in your terminal 
Agentic development in your terminal 
Your models, your choice 
Extensible with MCP, plugins, and skills 
Review, diff, and undo 
Infinite sessions and repository memory 
Install everywhere 
Polished terminal experience 
Enterprise ready 
Getting started 
Looking for more information? 
client apps 
copilot 
Share 
Copied 
Shared 
Back to changelog 
Related Posts
Nov.04 Release 
GitHub Copilot is now available in Xcode’s coding assistant 
copilot 
Nov.03 Improvement 
BYOK and enterprise custom models in the Copilot usage API 
account management 
copilot 
enterprise management tools 
... 
+2 
Nov.03 Release 
GitHub Copilot is now available in JetBrains Air 
copilot 
Nov.02 Improvement 
GitHub Desktop adds short-lived authentication tokens 
account management 
application security 
client apps 
... 
+2 
Oct.28 Release 
Route and orchestrate models with GitHub Copilot Fusion 
copilot 
enterprise management tools 
universe26 
... 
+2 
Oct.28 Release 
GitHub Copilot app, Universe releases 
copilot 
universe26 
... 
+1 
Oct.28 Release 
GitHub Enterprise now includes access to GitHub Copilot 
copilot 
universe26 
... 
+1 
Oct.28 Release 
Security extension for the GitHub Copilot app 
application security 
copilot 
universe26 
... 
+2 
Oct.28 Release 
GitHub intelligence puts your code, context, and history to work 
copilot 
universe26 
... 
+1 
Subscribe to our developer newsletter
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs. 
Enter your email * 
Subscribe 
By submitting, I agree to let GitHub and its affiliates use my information for personalized communications, targeted advertising, and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Back to top 
Site-wide Links
Product
Features 
Security 
Enterprise 
Customer Stories 
Pricing 
Resources 
Platform
Developer API 
Partners 
Atom 
Electron 
GitHub Desktop 
Support
Docs 
Community Forum 
Training 
Status 
Contact 
Company
About 
Blog 
Careers 
Press 
Shop 
© 2026 GitHub, Inc.
Terms 
Privacy 
Manage Cookies 
Do not share my personal information 
GitHub on LinkedIn 
GitHub on Instagram 
GitHub on YouTube 
GitHub on X 
GitHub on TikTok 
GitHub on Twitch 
GitHub’s organization on GitHub