HydraFusion in VS Code and the GitHub Copilot app - GitHub Changelog 
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
September 30, 2026 •
2 minute read 
HydraFusion in VS Code and the GitHub Copilot app
Table of Contents
Get started 
What's improved 
How HydraFusion differs from Auto 
Menu. Currently selected: Get started 
Get started 
What's improved 
How HydraFusion differs from Auto 
The HydraFusion research preview is now available in Visual Studio Code and the GitHub Copilot app, expanding beyond Copilot CLI.
HydraFusion appears in the model picker, but rather than being a single model, it orchestrates multiple models. HydraFusion treats workflow selection as an optimization problem. It uses capability signals for reasoning, code generation, debugging, and tool use to select the most efficient execution pattern to meet the quality bar. HydraFusion uses one of three workflows:
Single: One selected model directly solves the task.
Cascade: An efficient model drafts a solution and a quality gate decides whether to accept it or escalate to a stronger model.
Critique: One model drafts a result, an independent read-only critic from a different model family reviews it—following the same review pattern as Rubber Duck —and the drafting model revises once.
Get started 
In VS Code (version 1.140 or later, or VS Code Insiders):
Select HydraFusion from the Copilot Chat model picker.
If it does not appear, enable chat.copilot.hydraFusion.enabled . If you get Copilot through an organization or enterprise, an administrator may need to allow preview features in organization or enterprise settings.
In the GitHub Copilot app:
Update to the latest version.
Open Settings , search for “HydraFusion”, and turn it on.
Select HydraFusion from the model picker.
What’s improved 
Bringing HydraFusion to more surfaces was the top request from early feedback. This release also improves the overall experience:
Greater transparency: See more clearly what HydraFusion is doing at each step of a workflow.
Real-time progress: HydraFusion now sends more frequent progress updates while it works.
Clearer status during long tasks: Progress updates make it easier to tell that HydraFusion is still working, even when a task takes longer.
How HydraFusion differs from Auto 
Auto selects a model for each request. HydraFusion explores how Copilot can both select a workflow and coordinate multiple models within a turn.
HydraFusion is available to Copilot Pro, Pro+, Business, and Enterprise users. For Copilot Business and Enterprise, an administrator must enable preview features. HydraFusion remains a research preview and is subject to change.
Learn more in the HydraFusion documentation , read about the research and benchmark results in Project HydraFusion: Frontier quality via multi-model orchestration , or share feedback in the GitHub Community .
Table of Contents
Get started 
What's improved 
How HydraFusion differs from Auto 
Menu. Currently selected: Get started 
Get started 
What's improved 
How HydraFusion differs from Auto 
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