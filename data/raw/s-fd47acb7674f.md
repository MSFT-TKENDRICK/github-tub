Run multiple agents at once with /fleet in Copilot CLI - The GitHub Blog 
Skip to content 
Skip to sidebar 
/ 
Blog 
Changelog 
Docs 
Customer stories 
Try GitHub Copilot app 
See what's new 
AI & ML 
AI & ML Learn about artificial intelligence and machine learning across the GitHub ecosystem and the wider industry.
Generative AI Learn how to build with generative AI.
GitHub Copilot Change how you work with GitHub Copilot.
LLMs Everything developers need to know about LLMs.
Machine learning Machine learning tips, tricks, and best practices.
How AI code generation works Explore the capabilities and benefits of AI code generation and how it can improve your developer experience.
Learn more 
Developer skills 
Developer skills Resources for developers to grow in their skills and careers.
Application development Insights and best practices for building apps.
Career growth Tips & tricks to grow as a professional developer.
GitHub Improve how you use GitHub at work.
GitHub Education Learn how to move into your first professional role.
Programming languages & frameworks Stay current on what’s new (or new again).
Get started with GitHub documentation Learn how to start building, shipping, and maintaining software with GitHub.
Learn more 
Engineering 
Engineering Get an inside look at how we’re building the home for all developers.
Architecture & optimization Discover how we deliver a performant and highly available experience across the GitHub platform.
Engineering principles Explore best practices for building software at scale with a majority remote team.
Infrastructure Get a glimpse at the technology underlying the world’s leading AI-powered developer platform.
Platform security Learn how we build security into everything we do across the developer lifecycle.
User experience Find out what goes into making GitHub the home for all developers.
How we use GitHub to be more productive, collaborative, and secure Our engineering and security teams do some incredible work. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.
Learn more 
Enterprise software 
Enterprise software Explore how to write, build, and deploy enterprise software at scale.
Automation Automating your way to faster and more secure ships.
CI/CD Guides on continuous integration and delivery.
Collaboration Tips, tools, and tricks to improve developer collaboration.
DevOps DevOps resources for enterprise engineering teams.
DevSecOps How to integrate security into the SDLC.
Governance & compliance Ensuring your builds stay clean.
GitHub recognized as a Leader in the Gartner® Magic Quadrant™ for AI Code Assistants Learn why Gartner positioned GitHub as a Leader for the second year in a row.
Learn more 
News & insights 
News & insights Keep up with what’s new and notable from inside GitHub.
Company news An inside look at news and product updates from GitHub.
Product The latest on GitHub’s platform, products, and tools.
Octoverse Insights into the state of open source on GitHub.
Policy The latest policy and regulatory changes in software.
Research Data-driven insights around the developer ecosystem.
The library Older news and updates from GitHub.
Unlocking the power of unstructured data with RAG Learn how to use retrieval-augmented generation (RAG) to capture more insights.
Learn more 
Open Source 
Open Source Everything open source on GitHub.
Git The latest Git updates.
Maintainers Spotlighting open source maintainers.
Social impact How open source is driving positive change.
Gaming Explore open source games on GitHub.
An introduction to innersource Organizations worldwide are incorporating open source methodologies into the way they build and ship their own software.
Learn more 
Security 
Security Stay up to date on everything security.
Application security Application security, explained.
Supply chain security Demystifying supply chain security.
Vulnerability research Updates from the GitHub Security Lab.
Web application security Helpful tips on securing web applications.
The enterprise guide to AI-powered DevSecOps Learn about core challenges in DevSecOps, and how you can start addressing them with AI and automation.
Learn more 
Search 
Categories
AI & ML 
Back AI & ML Learn about artificial intelligence and machine learning across the GitHub ecosystem and the wider industry.
Generative AI Learn how to build with generative AI.
GitHub Copilot Change how you work with GitHub Copilot.
LLMs Everything developers need to know about LLMs.
Machine learning Machine learning tips, tricks, and best practices.
How AI code generation works Explore the capabilities and benefits of AI code generation and how it can improve your developer experience.
Learn more 
Developer skills 
Back Developer skills Resources for developers to grow in their skills and careers.
Application development Insights and best practices for building apps.
Career growth Tips & tricks to grow as a professional developer.
GitHub Improve how you use GitHub at work.
GitHub Education Learn how to move into your first professional role.
Programming languages & frameworks Stay current on what’s new (or new again).
Get started with GitHub documentation Learn how to start building, shipping, and maintaining software with GitHub.
Learn more 
Engineering 
Back Engineering Get an inside look at how we’re building the home for all developers.
Architecture & optimization Discover how we deliver a performant and highly available experience across the GitHub platform.
Engineering principles Explore best practices for building software at scale with a majority remote team.
Infrastructure Get a glimpse at the technology underlying the world’s leading AI-powered developer platform.
Platform security Learn how we build security into everything we do across the developer lifecycle.
User experience Find out what goes into making GitHub the home for all developers.
How we use GitHub to be more productive, collaborative, and secure Our engineering and security teams do some incredible work. Let’s take a look at how we use GitHub to be more productive, build collaboratively, and shift security left.
Learn more 
Enterprise software 
Back Enterprise software Explore how to write, build, and deploy enterprise software at scale.
Automation Automating your way to faster and more secure ships.
CI/CD Guides on continuous integration and delivery.
Collaboration Tips, tools, and tricks to improve developer collaboration.
DevOps DevOps resources for enterprise engineering teams.
DevSecOps How to integrate security into the SDLC.
Governance & compliance Ensuring your builds stay clean.
GitHub recognized as a Leader in the Gartner® Magic Quadrant™ for AI Code Assistants Learn why Gartner positioned GitHub as a Leader for the second year in a row.
Learn more 
News & insights 
Back News & insights Keep up with what’s new and notable from inside GitHub.
Company news An inside look at news and product updates from GitHub.
Product The latest on GitHub’s platform, products, and tools.
Octoverse Insights into the state of open source on GitHub.
Policy The latest policy and regulatory changes in software.
Research Data-driven insights around the developer ecosystem.
The library Older news and updates from GitHub.
Unlocking the power of unstructured data with RAG Learn how to use retrieval-augmented generation (RAG) to capture more insights.
Learn more 
Open Source 
Back Open Source Everything open source on GitHub.
Git The latest Git updates.
Maintainers Spotlighting open source maintainers.
Social impact How open source is driving positive change.
Gaming Explore open source games on GitHub.
An introduction to innersource Organizations worldwide are incorporating open source methodologies into the way they build and ship their own software.
Learn more 
Security 
Back Security Stay up to date on everything security.
Application security Application security, explained.
Supply chain security Demystifying supply chain security.
Vulnerability research Updates from the GitHub Security Lab.
Web application security Helpful tips on securing web applications.
The enterprise guide to AI-powered DevSecOps Learn about core challenges in DevSecOps, and how you can start addressing them with AI and automation.
Learn more 
Changelog 
Docs 
Customer stories 
See what's new 
Try GitHub Copilot app 
Home / AI & ML / GitHub Copilot 
Run multiple agents at once with /fleet in Copilot CLI
/fleet lets Copilot CLI dispatch multiple agents in parallel. Learn how to write prompts that split work across files, declare dependencies, and avoid common pitfalls.
Matt Nigh & Brian LaFlamme 
April 1, 2026 
| 
Updated April 14, 2026 
| 
5 minutes 
Share: 
What if GitHub Copilot CLI could work on five files at the same time instead of one? That’s where /fleet comes in.
/fleet is a slash command in Copilot CLI that enables Copilot to simultaneously work with multiple subagents in parallel. Instead of working through tasks sequentially, Copilot now has a behind the scenes orchestrator that plans and breaks your objective into independent work items and dispatches multiple agents to execute them simultaneously. On different files, in different parts of your codebase, all at once.
Want to learn more about how /fleet works, and more importantly, how to use it most effectively? Let’s jump in.
How it works
When you run /fleet with a prompt, the behind-the-scenes orchestrator:
Decomposes your task into discrete work items with dependencies.
Identifies which items can run in parallel versus which must wait.
Dispatches independent items as background sub-agents simultaneously.
Polls for completion, then dispatches the next wave.
Verifies outputs and synthesizes any final artifacts.
Each sub-agent gets its own context window but shares the same filesystem. They can’t talk to each other directly; only the orchestrator coordinates.
Think of it as a project lead who assigns work to a team, checks in on progress, and assembles the final deliverable.
Getting started
Start fleet mode by sending /fleet <YOUR OBJECTIVE PROMPT> . For example:
/fleet Refactor the auth module, update tests, and fix the related docs in the folder docs/auth/ 
That’s it. The orchestrator takes your objective, figures out what can be parallelized, and starts dispatching.
You can also run it non-interactively in your terminal:
copilot -p "/fleet <YOUR TASK>" --no-ask-user 
The --no-ask-user flag is required for non-interactive mode, since there’s no way to respond to prompts. Now let’s look at what makes a good prompt.
Write prompts that parallelize well
The quality of your /fleet prompt determines how effectively work gets distributed. The key is giving the orchestrator enough structure to cleanly break down your task.
A good way to do that is being specific about deliverables. Map every work item to a concrete artifact like a file, a test suite, or a section of documentation. Vague prompts lead to sequential execution because the orchestrator can’t identify independent pieces.
For example, instead of: /fleet Build the documentation , you could try:
/fleet Create docs for the API module: 
- docs/authentication.md covering token flow and examples 
- docs/endpoints.md with request/response schemas for all REST endpoints 
- docs/errors.md with error codes and troubleshooting steps 
- docs/index.md linking to all three pages (depends on the others finishing first) 
The second prompt gives the orchestrator four distinct deliverables, three of which can run in parallel, and one that depends on them.
Set explicit boundaries
Sub-agents work best when they know exactly where their scope starts and ends. When writing your prompt include:
File or module boundaries: Which directories or files each track owns
Constraints: What not to touch (e.g., no test changes, no dependency upgrades)
Validation criteria: Lint, type checks, tests that must pass
Here’s a prompt that showcases these boundaries:
/fleet Implement feature flags in three tracks: 
1. API layer: add flag evaluation to src/api/middleware/ and include unit tests that look for successful flag evaluation and tests API endpoints 
2. UI: wire toggle components in src/components/flags/ and introduce no new dependencies 
3. Config: add flag definitions to config/features.yaml and validate against schema 
Run independent tracks in parallel. No changes outside assigned directories. 
Declare dependencies when they exist
If one piece of work depends on another, say so. The orchestrator will serialize those items and parallelize the rest. For example:
/fleet Migrate the database layer: 
1. Write new schema in migrations/005_users.sql 
2. Update the ORM models in src/models/user.ts (depends on 1) 
3. Update API handlers in src/api/users.ts (depends on 2) 
4. Write integration tests in tests/users.test.ts (depends on 2) 
Items 3 and 4 can run in parallel after item 2 completes. 
Use custom agents for different jobs
You can define specialized agents in .github/agents/ and reference them in your /fleet prompt. Each agent can specify its own model, tools, and instructions. Be aware that if you don’t specify which model to use, agents will use the current default model.
# .github/agents/technical-writer.md 
--- 
name: technical-writer 
description: Documentation specialist 
model: claude-sonnet-4 
tools: ["bash", "create", "edit", "view"] 
--- 
You write clear, concise technical documentation. Follow the project style guide in /docs/styleguide.md. 
Then reference the custom agent in your prompt:
/fleet Use @technical-writer.md as the agent for all docs tasks and the default agent for code changes. 
This is useful when different tracks need different strengths such as using a heavier model for complex logic and a lighter one for boilerplate documentation.
How to verify subagents are deploying
Watch how the orchestrator deploys subagents, it’s the fastest way to learn how to write prompts that parallelize well.
Use this quick checklist:
Decomposition appears: Before it starts working, review the plan Copilot shares with you to see if it breaks work into multiple tracks, instead of one long linear plan.
Background task UI confirms activity: Once it begins working, run /tasks to open the tasks dialog and inspect running background tasks.
Parallel progress appears: Updates reference separate tracks moving at the same time.
If the fleet doesn’t seem to be parallelizing, try stopping Copilot’s work and asking for an explicit decomposition:
Decompose this into independent tracks first, then execute tracks in parallel. Report each track separately with status and blockers. 
Avoiding common pitfalls
Fleet is powerful, but a few gotchas are worth knowing upfront.
Partition your files
Sub-agents share a filesystem with no file locking. If two agents write to the same file, the last one to finish wins—silently. No error, no merge, just an overwrite.
The fix is to assign each agent distinct files in your prompt. If multiple agents need to contribute to a single file, consider having each write to a temporary path and let the orchestrator merge them at the end. Or set an explicit order for the agents to follow.
Keep prompts self-contained
Sub-agents can’t see the orchestrator’s conversation history. When the orchestrator dispatches a sub-agent, it passes along a prompt, but that prompt needs to include everything the sub-agent needs. If you’ve already gathered useful context earlier in the session, make sure your /fleet prompt includes it (or references files the sub-agents can read).
Steering a fleet in progress
After dispatching, you can send follow-up prompts to guide the orchestrator:
Prioritize failing tests first, then complete remaining tasks. 
List active sub-agents and what each is currently doing. 
Mark done only when lint, type check, and all tests pass. 
When to use /fleet (and when not to)
/fleet shines when your task has natural parallelism—multiple files, independent modules, or separable concerns. It’s particularly effective for:
Refactoring across multiple files simultaneously.
Generating documentation for several components at once.
Implementing a feature that spans API, UI, and tests.
Running independent code modifications that don’t share state.
For strictly linear, single-file work, regular Copilot CLI prompts are simpler and just as fast. Fleet adds coordination overhead, so it pays off when there’s real work to distribute.
/fleet is most useful when you treat it like a team, not a magic trick. Start small. Pick a task with clear outputs, clean file boundaries, and obvious parallelism. See how the orchestrator decomposes the work, where it helps, and where it gets in the way. As you get more comfortable, push it further with larger refactors, multi‑track features, or docs and tests in parallel. The fastest way to learn when /fleet pays off is to try it on real work and adjust your prompts based on what you see.
Get started with GitHub Copilot CLI > 
Tags:
GitHub Copilot 
GitHub Copilot CLI 
Written by 
Matt Nigh 
@mattnigh 
Program Manager Director, I lead the AI for Everyone program at GitHub.
Brian LaFlamme 
@briancl2 
Senior Enterprise Account Executive
GitHub Copilot 
GitHub Copilot CLI 
Table of Contents
How it works
Getting started
Write prompts that parallelize well
Set explicit boundaries
Declare dependencies when they exist
Use custom agents for different jobs
How to verify subagents are deploying
Avoiding common pitfalls
When to use /fleet (and when not to)
More on GitHub Copilot 
Arnis turns any place on Earth into a Minecraft world 
Louis Erbkamm built the first prototype in his free time. Now GitHub Copilot helps him maintain it alone.
Alex Perrault 
GitHub Universe 2026: Evolving every layer of the stack 
Today, we laid out our vision for GitHub as the most comprehensive, end-to-end software delivery system in the world.
Jay Parikh 
Related posts 
AI & ML 
How 3 Java Champions are using GitHub Copilot for increased productivity 
Three Java Champions share how they use GitHub Copilot to solve problems, accelerate development, and keep humans responsible for the results.
Julien Dubois 
AI & ML 
How to continue a GitHub Copilot app session in VS Code 
Learn how to move an agent session from the GitHub Copilot app into VS Code without losing the conversation, code changes, or working context.
Kayla Cinnamon 
AI & ML 
GitHub’s model for secret detection: Finding more secrets with less noise 
GitHub’s context-aware secret classifier improves detection quality, raises weighted acceptance by 11.5%, and reduces median scan execution time by 86%.
Batu Ozturkler & Shengyu Fu 
Explore more from GitHub 
Docs 
Everything you need to master GitHub, all in one place.
Go to Docs 
GitHub 
Build what’s next on GitHub, the place for anyone from anywhere to build anything.
Start building 
Customer stories 
Meet the companies and engineering teams that build with GitHub.
Learn more 
GitHub Universe 2026 
Catch up on the key announcements shaping the future of software development.
See what's new 
We do newsletters, too
Discover tips, technical guides, and best practices in our biweekly newsletter just for devs.
Your email address 
* 
Your email address 
Subscribe 
Yes please, I’d like GitHub and affiliates to use my information for personalized communications, targeted advertising and campaign effectiveness. See the GitHub Privacy Statement for more details. 
Subscribe 
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