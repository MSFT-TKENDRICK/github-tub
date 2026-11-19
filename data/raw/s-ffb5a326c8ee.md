HydraFusion updates and new Max option - GitHub Changelog 
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
Release 
October 14, 2026 •
2 minute read 
HydraFusion updates and new Max option
Table of Contents
What’s new in HydraFusion 
Introducing HydraFusion Max 
Menu. Currently selected: What’s new in HydraFusion 
What’s new in HydraFusion 
Introducing HydraFusion Max 
HydraFusion has an updated model pool, improved orchestration workflows, and introduces HydraFusion Max. Both HydraFusion and HydraFusion Max are available across VS Code, the GitHub Copilot app, and GitHub Copilot CLI and remain in research preview.
HydraFusion orchestrates multiple models to produce a single response, bringing together their strengths so you don’t have to choose an individual model for each task.
What’s new in HydraFusion 
Latest frontier models: HydraFusion and HydraFusion Max draw from a pool that now includes Claude Opus 5.5, GPT-6 Astra, GPT-6.1 Sol, and GPT-6 Luna. The models used for each task vary based on the orchestration workflow.
Reasoning effort tailored to each step: Previously, HydraFusion only used each model’s default reasoning effort. With this update, it explicitly tailors effort to each stage, using medium effort for initial drafts and high effort for review. This keeps drafting efficient while dedicating deeper reasoning to checking and improving the work.
Optimized Cascade and Critique workflows: 
Cascade: Previously used an initial model to solve the task, with escalation to a stronger model when needed. It can now include a judging step that inspects the initial work and requests a repair only when needed.
Critique: Previously relied heavily on text summaries. It now relies more on tools to inspect the actual workspace directly. Critique now also uses parallel critic models to inspect work.
Introducing HydraFusion Max 
HydraFusion Max is built on the same architecture and uses the same workflow techniques as HydraFusion, but is tuned for frontier capability on more demanding tasks. It applies higher reasoning efforts where depth and thoroughness matter most, while still using orchestration to consider token efficiency.
Option 
Description 
Typical use case 
HydraFusion 
Balanced approach with moderate token savings. 
Agentic tasks that require a balance of speed, cost, and performance. 
HydraFusion Max 
Frontier capability for more demanding tasks, with token efficiency considered through orchestration. 
Tasks requiring the deepest possible reasoning and most thorough analysis. 
Both options are supported across all three clients, so you can access the latest HydraFusion experience whether you work in VS Code, the GitHub Copilot app, or the terminal.
HydraFusion and HydraFusion Max are available on Copilot Pro, Pro+, Business, and Enterprise plans with experimental or preview features enabled, subject to your organization’s model policies.
Learn more in the HydraFusion documentation .
Share your feedback in the HydraFusion discussion .
Table of Contents
What’s new in HydraFusion 
Introducing HydraFusion Max 
Menu. Currently selected: What’s new in HydraFusion 
What’s new in HydraFusion 
Introducing HydraFusion Max 
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
Oct.28 Improvement 
Build shared workflows for your team with Copilot Automations 
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