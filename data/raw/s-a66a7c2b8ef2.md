How we made GitHub Copilot CLI more selective about delegation - The GitHub Blog 
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
Home / AI & ML 
How we made GitHub Copilot CLI more selective about delegation
Better orchestration, fewer handoffs, faster progress, without a single new knob.
Pingping Lin & Yu Hu 
June 12, 2026 
| 
8 minutes 
Share: 
In agentic systems, more delegation isn’t always better. Imagine asking Copilot CLI to make a simple change. Instead of handling it directly, it spins up a helper agent that searches the repository, waits on a result, and stalls. Work that should have taken one step now takes three. While some tasks genuinely benefit from a specialist subagent—like exploring an unfamiliar repository, checking an independent area of the code, or running a long command while the main agent keeps moving—delegation isn’t free. Every handoff adds coordination overhead, tool calls, and wait time. If an agent delegates too eagerly, the “help” can become friction. 
We recently released an improvement to our agentic harness called smarter subagent delegation. This makes Copilot CLI more selective by helping the main agent: 
Stay focused when it can move faster on its own.
Delegate when a specialist creates real leverage.
Parallelize work when tasks are truly independent.
Smarter subagent delegation has now rolled out to 100% of Copilot CLI production traffic. If you want to get started today, simply update GitHub Copilot CLI by running the /update command in your terminal to version 1.0.42 or later. 
In a production A/B test, this improvement reduced tool failures per session by 23% , including a 27% reduction in search tool failures and an 18% reduction in edit tool failures. It also improved total user wait time by 5% at P95 and 3% at P75, with no quality regression . Here, P95 captures wait time near the slowest 5% of sessions, while P75 reflects wait time toward the slower end of typical sessions. This means fewer unnecessary handoffs, fewer repeated searches, fewer failure-prone tool paths, and less waiting during long-running coding tasks. 
In this post, we’ll walk through how we identified unnecessary delegation in Copilot CLI, what we changed to make delegation more selective, and how we validated those changes through offline evaluation and production A/B testing. We’ll also show why those changes led to fewer failures and less waiting—and what that looks like for developers using Copilot CLI day to day. 
The problem: Delegation is powerful, but not free
Subagents are one of the most important capabilities in an agentic CLI. They let Copilot break down complex work, run investigations in parallel, and keep the main agent focused on coordinating the final answer. For large codebases and multi-step engineering tasks, that can be the difference between a slow linear workflow and an efficient parallel one. 
But delegation introduces its own failure modes: 
Unnecessary handoffs for simple tasks that the main agent could complete faster on its own. 
Overuse of exploration subagents when the handoff already contains enough context.
Repeated or overlapping searches across the main agent and subagents. 
Sequential delegation, where the main agent waits for a subagent instead of treating delegation as an opportunity for parallel work. 
Failure-prone subagent paths, including stale file paths, moved files, incorrect relative paths, and workspace mismatches. 
Figure 1. Example: tool call failure by subagents while main agent is idling. 
Our goal: help developers use subagents when they create leverage, avoid them when they add overhead, and parallelize work when the task genuinely benefits from independent execution. 
From problem signals to shipped improvement
The way we identified the problem became the way we solved it. Instead of treating agent trajectory analysis, product changes, evaluation, and rollout as separate activities, we used them as one feedback loop: observe the agent behavior, isolate the orchestration bottleneck, make a targeted change, validate it offline, measure it online, and ship only once the end-to-end workflow improved. 
Figure 2. The end-to-end improvement loop: analyze, change, validate, and ship. 
1. Analyze: Let LLMs identify the delegation bottleneck
Instead of manually reviewing agent sessions, we used LLMs to analyze full trajectories and identify where orchestration was helping versus where it was adding overhead. That analysis surfaced a consistent pattern: subagents were sometimes being invoked for tasks that were already narrow, obvious, or fully described in the handoff. 
In those cases, the subagent could spend time re-searching the repository even though the main agent already had enough context to act directly. That clarified the improvement target: keep simple discovery-and-edit tasks in the main agent, and reserve subagents for work that is broader, cross-cutting, or naturally parallelizable. 
2. Change: Refine the orchestration policy
After identifying the bottleneck, we used LLMs to help translate that diagnosis into a more selective orchestration policy.
Copilot CLI should handle focused work directly: find a file, read it, make a targeted change, and verify it. Delegation is more useful when the work requires independent context, broad exploration, or parallel execution.
In practice, that means starting with the narrowest effective path, escalating when complexity or uncertainty creates value, and stepping back down when the task becomes focused again. Subagents should be treated as a parallelism tool, not a pause button. When Copilot launches a subagent, the main agent should continue making progress on independent work rather than simply waiting for the result.
When a subagent is used, the handoff should also be specific: what the user asked, what is already known, what the subagent owns, and what kind of result the main agent needs back. 
3. Validate: Test offline, confirm online, then ship
Before broad rollout, we validated the change with automatically generated regression cases and existing benchmarks. This helped confirm that the new delegation guidance reduced avoidable overhead without breaking cases where subagents genuinely add value. 
Finally, we moved through staff and public A/B testing, then analyzed production metrics across reliability, responsiveness, subagent workload, and quality. The gains did not come primarily from making individual LLM calls faster. Instead, it reduced orchestration overhead by avoiding unnecessary subagent paths and lowering subagent workload per user. 
That end-to-end process let us move from problem signal to shipped improvement while keeping the user experience stable: fewer avoidable handoffs, fewer failure-prone tool paths, and no quality regression. 
Outcomes
After rolling smarter subagent delegation to production traffic, we saw measurable percentage improvements across reliability and responsiveness (Table 1): 
Dimension Metric Delta 
Reliability Tool failures per session 23% reduction 
Reliability Search tool failures 27% reduction 
Reliability Edit tool failures 18% reduction 
Responsiveness Total user wait time at P95 5% lower 
Responsiveness Total user wait time at P75 3% lower 
Quality Quality metrics No regression 
Table 1. Production A/B test outcomes 
Metric Delta vs. control Interpretation 
Failed raw subagent search calls 15% reduction Reliability – fewer failure-prone subagent search paths. 
Average subagent LLM duration per user 12% lower Responsiveness – reduced orchestration overhead per user. 
P95 subagent LLM duration per user 18% lower Responsiveness – better worst-case subagent overhead. 
Table 2. Directional agent trajectory analysis behind the A/B test outcome 
These results show that better orchestration can improve the developer experience even when the visible feature surface doesn’t change. By teaching Copilot CLI when to delegate, when not to delegate, and how to parallelize the right work, we reduced friction in the agent loop itself. 
That is the power of GitHub Copilot as a system: the experience gets better not because developers are given more switches to manage, but because Copilot becomes better at allocating models, tools, and subagents behind the scenes. 
How this benefits developers today
For developers using Copilot CLI, this should feel like a smoother day-to-day experience. Straightforward tasks are more likely to be handled directly, complex tasks still get specialist help when it adds value, and long-running sessions keep moving with less unnecessary waiting. In practice, Copilot CLI becomes more efficient and less noisy without asking developers to work differently. 
The change is intentionally behind the scenes. Your workflow stays the same, but Copilot CLI is better at coordinating the work: fewer unnecessary handoffs, less repeated search work, fewer failed tool paths, and faster progress on long-running or multi-step tasks. 
What’s next
This work is one step toward our larger goal of improving how Copilot CLI chooses the right model, agent, and tools across your workflow. While having more agents and models available expands what Copilot can do, the value to developers depends on how well Copilot applies them across the work they are already doing, like reading files, running commands, and moving from an issue toward a pull request. 
As tasks become more complex, the quality of that orchestration matters more. The best system is not the one that delegates the most, but the one that knows when to act directly, when to delegate, and how to keep work moving without adding friction. 
The next step is making Copilot CLI more adaptive across models, agents, skills, and tools, so developers don’t have to decide whether a task needs a larger model, a specialist subagent, or a procedural skill. Copilot should make that decision based on the task, repository context, policy, and expected outcome. 
We will continue improving how Copilot CLI plans work, coordinates subagents, and measures end-to-end outcomes. That includes better visibility into main-agent and subagent behavior, deeper analysis of failure reasons, and stronger proxy metrics for orchestration quality. The goal is simple: less waiting, fewer avoidable failures, and more useful progress from every agent session. 
Get started today and share feedback
Update GitHub Copilot CLI by running the /update command in your terminal to version 1.0.42 or later. 
Already tried it? We’d love to hear what you think. Share feedback with the  /feedback  command in a CLI session or open an issue in  our public repository . 
Acknowledgements
Smarter subagent delegation was made possible by collaboration across Code|AI, Copilot CLI, experimentation, human evaluation, and product teams. Thanks to everyone who helped identify the problem, design the process, validate the outcome, and ship the improvement to production. 
Tags:
AI agents 
coding agent 
GitHub Copilot CLI 
Written by 
Pingping Lin 
@rindesu 
Principal applied scientist, Microsoft Code | AI. I am a tech lead driving product-focused AI research to enhance the GitHub Copilot CLI experience through data-driven analysis.
Yu Hu 
@nkhuyu-msft 
Principal applied science manager, Microsoft Code | AI. I lead an applied research team focused on improving developer productivity with AI through intelligent code models and code agents. Our team also optimizes the Copilot experience by taking innovations from research into product.
AI agents 
coding agent 
GitHub Copilot CLI 
More on AI agents 
Migrating the GitHub Copilot runtime to Rust, using Copilot 
A rewrite this size wasn’t affordable before agents. Here’s what porting the Copilot agent runtime to 800,000 lines of production Rust actually took.
Stephen Toub 
Your contributors are AI-first now. Is your project? 
AI contributors are already in your queue. AutoGPT maintainer Nicholas Tindle shares the repo instructions, gates, and boundaries that keep maintainers in control.
Andrea Griffiths 
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